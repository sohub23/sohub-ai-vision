<?php
/**
 * Standalone SOHUB AI Vision Edge Engine Email Handler
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

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

require_once __DIR__ . "/ai-pdf-generator.php";

$envPath = __DIR__ . '/.env';
if (!file_exists($envPath)) {
    $envPath = dirname(__DIR__) . '/.env';
}

if (!loadEnv($envPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'API Configuration not found']);
    exit;
}

$smtp_host = $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com';
$smtp_port = (int)($_ENV['SMTP_PORT'] ?? 587);
$smtp_user = $_ENV['SMTP_USER'] ?? '';
$smtp_pass = $_ENV['SMTP_PASS'] ?? '';
$admin_email = !empty($_ENV['ADMIN_EMAIL']) ? trim($_ENV['ADMIN_EMAIL']) : 'muyed@sohub.com.bd';

if (empty($smtp_user) || empty($smtp_pass)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'SMTP settings missing']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'] ?? '';
$company = $data['company'] ?? '';
$phone = $data['phone'] ?? '';
$email = $data['email'] ?? '';
$location = $data['location'] ?? '';
$notes = $data['notes'] ?? '';
$machineType = $data['machineType'] ?? 'SOHUB AI Edge Engine';
$quantity = $data['quantity'] ?? 1;
$addOns = $data['addOns'] ?? [];
$totalPrice = $data['totalPrice'] ?? 0;
$unitPrice = $data['unitPrice'] ?? 0;
$productType = $data['productType'] ?? 'edge-engine';

if (empty($name) || empty($phone) || empty($location)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Validation failed: Name, Phone, and Location are required.']);
    exit;
}

$pdfContent = null;
if ($productType !== 'edge-engine-custom') {
    $pdfContent = generateAIOrderPDF($name, $company, $phone, $email, $location, $notes, $machineType, $quantity, $addOns, $totalPrice, $unitPrice);
}

if ($productType === 'edge-engine-custom') {
    $subjectTitle = "Custom Edge Engine Request - $name";
    $adminEmailBody = "
    <html>
    <head><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333;padding:20px}table{width:100%; border-collapse: collapse;}td{padding:10px; border-bottom: 1px solid #eee;}.label{font-weight:600;color:#666;width:150px}</style></head>
    <body>
    <h2 style='color:#18B5FE'>🧠 New Custom Channel Request</h2>
    <p>Details for a potential custom deployment:</p>
    <table>
    <tr><td class='label'>Name:</td><td><strong>$name</strong></td></tr>
    <tr><td class='label'>Company:</td><td>$company</td></tr>
    <tr><td class='label'>Phone:</td><td><strong>$phone</strong></td></tr>
    <tr><td class='label'>Email:</td><td>$email</td></tr>
    <tr><td class='label'>Location:</td><td>$location</td></tr>
    <tr><td class='label'>Scope:</td><td>" . nl2br(htmlspecialchars($notes)) . "</td></tr>
    </table>
    </body>
    </html>";

    $customerEmailBody = "
    <html>
    <body>
    <h1 style='color:#18B5FE'>Request Received 🎉</h1>
    <p>Dear $name,</p>
    <p>Thank you for reaching out for a custom <strong>SOHUB AI Vision Edge Engine</strong> setup.</p>
    <p>Our technical team will review your requirements and call you at <strong>$phone</strong> within 1 business day.</p>
    <p>Best regards,<br>SOHUB Team</p>
    </body>
    </html>";
} else {
    $subjectTitle = "AI Edge Engine Order - $name";
    $adminEmailBody = "
    <html>
    <body>
    <h2 style='color:#18B5FE'>🧠 New Order: $machineType</h2>
    <p>A new purchase request has been submitted. Full details are in the attached PDF.</p>
    <ul>
    <li>Customer: $name</li>
    <li>Phone: $phone</li>
    <li>Location: $location</li>
    </ul>
    </body>
    </html>";

    $customerEmailBody = "
    <html>
    <body>
    <h1 style='color:#18B5FE'>Thank You for Your Order! 🎉</h1>
    <p>Dear $name,</p>
    <p>We have received your order for the $machineType. Your official quotation is attached as a PDF.</p>
    <p>We will contact you shortly to confirm deployment.</p>
    <p>Best regards,<br>SOHUB Team</p>
    </body>
    </html>";
}

try {
    // Send to Admin first
    sendEmail($smtp_host, $smtp_port, $smtp_user, $smtp_pass, $admin_email, $subjectTitle, $adminEmailBody, $pdfContent, 'SOHUB Admin');
    
    // Then send confirmation to Customer
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $msg = ($productType === 'edge-engine-custom') ? "Custom Request Received" : "Order Confirmation";
        // Also CC the admin back on the customer email for tracking
        sendEmail($smtp_host, $smtp_port, $smtp_user, $smtp_pass, $email, "$msg - SOHUB AI Vision", $customerEmailBody, $pdfContent, $name, $admin_email);
    }
    
    echo json_encode(['success' => true, 'message' => 'Your request has been sent successfully.']);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Email failed: ' . $e->getMessage()]);
}

function sendEmail($host, $port, $user, $pass, $to, $subject, $body, $pdfContent, $toName, $cc = null, $replyTo = null) {
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
    if ($cc) {
        fputs($socket, "RCPT TO: <$cc>\r\n");
        fgets($socket, 515);
    }
    fputs($socket, "DATA\r\n");
    fgets($socket, 515);
    
    $boundary = md5(uniqid(rand(), true));
    $messageId = "<" . md5(uniqid(rand(), true)) . "@" . ($_SERVER['SERVER_NAME'] ?? 'localhost') . ">";
    
    $emailContents = "Date: " . date("r") . "\r\n";
    $emailContents .= "Message-ID: $messageId\r\n";
    $emailContents .= "From: SOHUB AI Vision <$user>\r\n";
    if ($replyTo) $emailContents .= "Reply-To: $replyTo\r\n";
    $emailContents .= "To: $toName <$to>\r\n";
    if ($cc) $emailContents .= "Cc: $cc\r\n";
    $emailContents .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $emailContents .= "MIME-Version: 1.0\r\n";
    $emailContents .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n\r\n";
    
    $emailContents .= "--$boundary\r\n";
    $emailContents .= "Content-Type: text/html; charset=UTF-8\r\n";
    $emailContents .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $emailContents .= $body . "\r\n\r\n";
    
    if ($pdfContent !== null) {
        $emailContents .= "--$boundary\r\n";
        $emailContents .= "Content-Type: application/pdf; name=\"Quotation.pdf\"\r\n";
        $emailContents .= "Content-Transfer-Encoding: base64\r\n";
        $emailContents .= "Content-Disposition: attachment; filename=\"Quotation.pdf\"\r\n\r\n";
        $emailContents .= chunk_split(base64_encode($pdfContent)) . "\r\n";
    }
    
    $emailContents .= "--$boundary--\r\n";
    $emailContents .= ".\r\n";
    
    fputs($socket, $emailContents);
    fgets($socket, 515);
    fputs($socket, "QUIT\r\n");
    fclose($socket);
}
?>
