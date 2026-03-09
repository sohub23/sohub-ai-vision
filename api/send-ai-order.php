<?php
/**
 * Standalone SOHUB AI Vision Edge Engine Email Handler
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

require_once __DIR__ . '/Exception.php';
require_once __DIR__ . '/PHPMailer.php';
require_once __DIR__ . '/SMTP.php';

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
    <head><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333;padding:20px}.header{background:#18B5FE;color:white;padding:20px;text-align:center;border-radius:8px}table{width:100%;margin:20px 0}td{padding:8px 0}.label{font-weight:600;color:#666;width:150px}</style></head>
    <body>
    <div class='header'><h2 style='margin:0'>🧠 New AI Edge Engine Order</h2></div>
    <p>A new purchase request has been submitted. Full details are in the attached PDF.</p>
    <table>
    <tr><td class='label'>Customer Name:</td><td><strong>$name</strong></td></tr>
    <tr><td class='label'>Phone:</td><td><strong>$phone</strong></td></tr>
    <tr><td class='label'>Email:</td><td>" . ($email ?: 'Not provided') . "</td></tr>
    <tr><td class='label'>Location:</td><td>$location</td></tr>
    <tr><td class='label'>Total Amount:</td><td><strong style='color:#18B5FE;font-size:18px'>" . number_format($totalPrice) . " BDT</strong></td></tr>
    </table>
    <p style='color:#666;font-size:12px;margin-top:30px'>Order received at: " . date('d M Y, h:i A') . "</p>
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

file_put_contents(__DIR__ . '/mail_log.txt', "\n--- NEW ORDER INITIATED AT " . date('Y-m-d H:i:s') . " ---\n", FILE_APPEND);

try {
    // 1. Send purely to Admin
    sendEmail($smtp_host, $smtp_port, $smtp_user, $smtp_pass, $admin_email, $subjectTitle, $adminEmailBody, $pdfContent, 'SOHUB Admin', $email);
    file_put_contents(__DIR__ . '/mail_log.txt', "ADMIN EMAIL SUCCESSFUL\n", FILE_APPEND);
    
    // Safety delay to prevent Gmail duplicate suppression
    sleep(2);
    
    // 2. Send purely to Customer (If provided)
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $msg = ($productType === 'edge-engine-custom') ? "Custom Request Received" : "Order Confirmation";
        sendEmail($smtp_host, $smtp_port, $smtp_user, $smtp_pass, $email, "$msg - SOHUB AI Vision", $customerEmailBody, $pdfContent, $name, $admin_email);
        file_put_contents(__DIR__ . '/mail_log.txt', "CUSTOMER EMAIL SUCCESSFUL\n", FILE_APPEND);
    }
    
    echo json_encode(['success' => true, 'message' => 'Your request has been sent successfully.']);
    
} catch (Exception $e) {
    file_put_contents(__DIR__ . '/mail_log.txt', "EXCEPTION OCCURRED: " . $e->getMessage() . "\n", FILE_APPEND);
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Email failed: ' . $e->getMessage()]);
}

function sendEmail($host, $port, $user, $pass, $to, $subject, $body, $pdfContent, $toName, $replyToEmail = null) {
    $mail = new PHPMailer(true);
    try {
        $mail->SMTPDebug = 2; // Output raw SMTP info
        $mail->Debugoutput = function($str, $level) {
            file_put_contents(__DIR__ . '/mail_log.txt', $str . "\n", FILE_APPEND | LOCK_EX);
        };
        
        $mail->isSMTP();
        $mail->Host       = $host;
        $mail->SMTPAuth   = true;
        $mail->Username   = $user;
        $mail->Password   = $pass;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $port;

        $mail->setFrom($user, 'SOHUB AI Vision');
        $mail->addAddress($to, $toName);
        if ($replyToEmail && filter_var($replyToEmail, FILTER_VALIDATE_EMAIL)) {
            $mail->addReplyTo($replyToEmail);
        }
        
        $mail->CharSet = 'UTF-8';

        if ($pdfContent !== null) {
            $mail->addStringAttachment($pdfContent, 'Quotation.pdf', PHPMailer::ENCODING_BASE64, 'application/pdf');
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;

        $mail->send();
    } catch (PHPMailerException $e) {
        throw new Exception("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    }
}
?>
