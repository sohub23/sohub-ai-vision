<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

function loadEnv($path) {
    if (!file_exists($path)) return false;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
    return true;
}

$envPath = __DIR__ . '/../.env';
if (!loadEnv($envPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Configuration not found']);
    exit;
}

$smtp_host = $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com';
$smtp_port = (int)($_ENV['SMTP_PORT'] ?? 587);
$smtp_user = $_ENV['SMTP_USER'] ?? '';
$smtp_pass = $_ENV['SMTP_PASS'] ?? '';
$admin_email = $_ENV['ADMIN_EMAIL'] ?? '';

if (empty($smtp_user) || empty($smtp_pass) || empty($admin_email)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'SMTP not configured']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'] ?? '';
$phone = $data['phone'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';
$productType = $data['productType'] ?? 'SOHUB AI Vision';

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name and phone are required']);
    exit;
}

$adminEmailBody = "
<html>
<head><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333;padding:20px}.header{background:#f97316;color:white;padding:20px;text-align:center;border-radius:8px}table{width:100%;margin:20px 0}td{padding:8px 0}.label{font-weight:600;color:#666;width:150px}</style></head>
<body>
<div class='header'><h2 style='margin:0'>🔔 New AI Vision Inquiry from $name</h2></div>
<p>Hello Admin,</p>
<p>A new inquiry has been submitted for <strong>$productType</strong>.</p>
<table>
<tr><td class='label'>Name:</td><td><strong>$name</strong></td></tr>
<tr><td class='label'>Phone:</td><td><strong>$phone</strong></td></tr>
<tr><td class='label'>Email:</td><td>" . ($email ?: 'Not provided') . "</td></tr>
<tr><td class='label'>Message:</td><td><strong>" . ($message ?: 'No specific message') . "</strong></td></tr>
</table>
<p style='color:#666;font-size:12px;margin-top:30px'>Inquiry received at: " . date('d M Y, h:i A') . "</p>
</body>
</html>
";

$customerEmailBody = "
<html>
<head><style>body{font-family:Arial,sans-serif;line-height:1.8;color:#333;padding:20px}.header{background:#f97316;color:white;padding:30px;text-align:center;border-radius:8px}.box{background:#f9f9f9;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #f97316}</style></head>
<body>
<div class='header'><h1 style='margin:0'>Thank You for Your Interest in AI Vision! 🎯</h1></div>
<p>Dear <strong>$name</strong>,</p>
<p>Thank you for your interest in <strong>SOHUB AI Vision</strong>. We have received your inquiry and are excited to discuss how our offline AI vision system can enhance your surveillance capabilities!</p>
<div class='box'>
<p style='margin:0;font-size:16px'><strong>🔍 Your Inquiry:</strong></p>
<p style='margin:10px 0 0 0;font-size:14px;color:#666'>" . ($message ?: 'General AI Vision inquiry') . "</p>
</div>
<h3 style='color:#f97316'>What Happens Next?</h3>
<ul style='line-height:2'>
<li>✅ Our AI Vision specialist will review your requirements within <strong>24 hours</strong></li>
<li>📞 We will contact you at <strong>$phone</strong> to discuss your surveillance needs</li>
<li>💡 We'll explore how our offline AI system fits your existing cameras</li>
<li>🚀 If suitable, we can arrange a live demo or pilot deployment</li>
</ul>
<h3 style='color:#f97316'>Why Choose SOHUB AI Vision?</h3>
<ul style='line-height:2'>
<li>🔒 <strong>100% Offline</strong> - No cloud dependency, complete privacy</li>
<li>📹 <strong>Works with existing cameras</strong> - ONVIF/RTSP compatible</li>
<li>⚡ <strong>Real-time processing</strong> - Instant alerts and responses</li>
<li>💰 <strong>No subscription fees</strong> - One-time investment</li>
</ul>
<p><strong>Need immediate assistance?</strong><br>
📧 Email: info@sohub.com.bd</p>
<p style='margin-top:40px'>Best regards,<br><strong style='color:#f97316'>SOHUB AI Vision Team</strong><br>Solution Hub Technologies</p>
</body>
</html>
";

try {
    sendEmail($smtp_host, $smtp_port, $smtp_user, $smtp_pass, $admin_email, "New AI Vision Inquiry from $name", $adminEmailBody, 'SOHUB Admin');
    
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendEmail($smtp_host, $smtp_port, $smtp_user, $smtp_pass, $email, "Your SOHUB AI Vision Inquiry Confirmation", $customerEmailBody, $name);
    }
    
    echo json_encode(['success' => true, 'message' => 'Inquiry submitted successfully']);
    
} catch (Exception $e) {
    http_response_code(500);
    error_log("AI Vision Contact Email Error: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}

function sendEmail($host, $port, $user, $pass, $to, $subject, $body, $toName) {
    $socket = stream_socket_client("tcp://$host:$port", $errno, $errstr, 15);
    if (!$socket) throw new Exception("Connection failed: $errstr");
    
    fgets($socket, 515);
    fputs($socket, "EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost') . "\r\n");
    do { $response = fgets($socket, 515); } while (substr($response, 3, 1) === '-');
    
    fputs($socket, "STARTTLS\r\n");
    fgets($socket, 515);
    stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
    
    fputs($socket, "EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost') . "\r\n");
    do { $response = fgets($socket, 515); } while (substr($response, 3, 1) === '-');
    
    fputs($socket, "AUTH LOGIN\r\n");
    fgets($socket, 515);
    fputs($socket, base64_encode($user) . "\r\n");
    fgets($socket, 515);
    fputs($socket, base64_encode($pass) . "\r\n");
    fgets($socket, 515);
    
    fputs($socket, "MAIL FROM: <$user>\r\n");
    fgets($socket, 515);
    fputs($socket, "RCPT TO: <$to>\r\n");
    fgets($socket, 515);
    fputs($socket, "DATA\r\n");
    fgets($socket, 515);
    
    $email = "From: SOHUB AI Vision <$user>\r\n";
    $email .= "To: $toName <$to>\r\n";
    $email .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $email .= "MIME-Version: 1.0\r\n";
    $email .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
    $email .= $body . "\r\n";
    $email .= ".\r\n";
    
    fputs($socket, $email);
    fgets($socket, 515);
    fputs($socket, "QUIT\r\n");
    fclose($socket);
}
?>