<?php
require_once(__DIR__ . '/TCPDF/tcpdf.php');

/**
 * Dedicated PDF Generator for SOHUB AI Vision Edge Engine
 * Theme: Light Blue (#18B5FE)
 */
function generateAIOrderPDF($name, $company, $phone, $email, $location, $notes, $machineType, $quantity, $addOns, $totalPrice, $unitPrice, $productType = 'edge-engine') {
    $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
    
    // Theme Colors (#18B5FE)
    $primaryColor = [24, 181, 254]; 

    $pdf->SetCreator('SOHUB');
    $pdf->SetAuthor('SOHUB AI Vision');
    $pdf->SetTitle('Official Quotation');
    $pdf->SetSubject('Quotation details');
    
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    $pdf->SetMargins(15, 15, 15);
    $pdf->SetAutoPageBreak(TRUE, 15);
    $pdf->AddPage();
    
    // Header
    $pdf->SetFont('helvetica', 'B', 20);
    $pdf->SetTextColor($primaryColor[0], $primaryColor[1], $primaryColor[2]);
    $pdf->Cell(0, 10, 'QUOTATION', 0, 1, 'C');
    
    $pdf->SetFont('helvetica', '', 10);
    $pdf->SetTextColor(100, 100, 100);
    $pdf->Cell(0, 5, 'SOHUB - Solution Hub Technologies', 0, 1, 'C');
    $pdf->SetFont('helvetica', 'B', 10);
    $pdf->Cell(0, 5, 'SOHUB AI Vision', 0, 1, 'C');
    $pdf->Ln(5);
    
    // Date & ID
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFont('helvetica', '', 9);
    $pdf->Cell(30, 6, 'Date:', 0, 0);
    $pdf->SetFont('helvetica', 'B', 9);
    $pdf->Cell(0, 6, date('d M Y'), 0, 1);
    
    $pdf->SetFont('helvetica', '', 9);
    $pdf->Cell(30, 6, 'Quotation ID:', 0, 0);
    $pdf->SetFont('helvetica', 'B', 9);
    $pdf->Cell(0, 6, 'SOHUB-' . date('Ymd') . '-' . substr(md5($phone), 0, 6), 0, 1);
    $pdf->Ln(5);
    
    // Customer Section Header
    $pdf->SetFillColor($primaryColor[0], $primaryColor[1], $primaryColor[2]);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->SetFont('helvetica', 'B', 11);
    $pdf->Cell(0, 8, 'CUSTOMER DETAILS', 0, 1, 'L', true);
    
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFont('helvetica', '', 9);
    $pdf->Cell(30, 6, 'Name:', 0, 0);
    $pdf->SetFont('helvetica', 'B', 9);
    $pdf->Cell(0, 6, $name, 0, 1);
    
    if ($company) {
        $pdf->SetFont('helvetica', '', 9);
        $pdf->Cell(30, 6, 'Company:', 0, 0);
        $pdf->SetFont('helvetica', 'B', 9);
        $pdf->Cell(0, 6, $company, 0, 1);
    }
    
    $pdf->SetFont('helvetica', '', 9);
    $pdf->Cell(30, 6, 'Phone:', 0, 0);
    $pdf->SetFont('helvetica', 'B', 9);
    $pdf->Cell(0, 6, $phone, 0, 1);
    
    if ($email) {
        $pdf->SetFont('helvetica', '', 9);
        $pdf->Cell(30, 6, 'Email:', 0, 0);
        $pdf->SetFont('helvetica', 'B', 9);
        $pdf->Cell(0, 6, $email, 0, 1);
    }
    
    $pdf->SetFont('helvetica', '', 9);
    $pdf->Cell(30, 6, 'Location:', 0, 0);
    $pdf->SetFont('helvetica', 'B', 9);
    $pdf->Cell(0, 6, $location, 0, 1);
    $pdf->Ln(5);
    
    // Order Summary Header
    $pdf->SetFillColor($primaryColor[0], $primaryColor[1], $primaryColor[2]);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->SetFont('helvetica', 'B', 11);
    $pdf->Cell(0, 8, 'ORDER SUMMARY', 0, 1, 'L', true);
    
    $pdf->SetFillColor(245, 245, 245);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFont('helvetica', 'B', 9);
    $pdf->Cell(100, 7, 'Item Description', 1, 0, 'L', true);
    $pdf->Cell(30, 7, 'Qty', 1, 0, 'C', true);
    $pdf->Cell(50, 7, 'Price (BDT)', 1, 1, 'R', true);
    
    // AI Edge Engine Label
    $pdf->SetFont('helvetica', '', 9);
    $pdf->Cell(100, 6, $machineType, 1, 0, 'L');
    $pdf->Cell(30, 6, $quantity, 1, 0, 'C');
    $pdf->Cell(50, 6, number_format($unitPrice * $quantity), 1, 1, 'R');
    
    // Add-ons
    foreach ($addOns as $addon) {
        $addonName = is_array($addon) ? $addon['name'] : $addon;
        $addonPrice = is_array($addon) ? $addon['price'] : getAddonPrice($addon);
        
        if ($addonPrice >= 0) {
            $pdf->Cell(100, 6, '+ ' . $addonName, 1, 0, 'L');
            $pdf->Cell(30, 6, $quantity, 1, 0, 'C');
            $pdf->Cell(50, 6, number_format($addonPrice * $quantity), 1, 1, 'R');
        }
    }
    
    // Total
    $pdf->SetFont('helvetica', 'B', 10);
    $pdf->Cell(130, 8, 'GRAND TOTAL', 1, 0, 'R');
    $pdf->SetTextColor($primaryColor[0], $primaryColor[1], $primaryColor[2]);
    $pdf->Cell(50, 8, number_format($totalPrice) . ' BDT', 1, 1, 'R');
    
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFont('helvetica', 'I', 8);
    $pdf->Cell(0, 5, '* Offline deployment. Includes 1-year hardware warranty', 0, 1, 'R');
    $pdf->Ln(5);
    
    // Terms Header
    $pdf->SetFillColor($primaryColor[0], $primaryColor[1], $primaryColor[2]);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->SetFont('helvetica', 'B', 11);
    $pdf->Cell(0, 8, 'TERMS & CONDITIONS', 0, 1, 'L', true);
    
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFont('helvetica', '', 8);
    $terms = "• All AI processing happens locally on Edge hardware (No cloud required)\n• Valid for 30 days from issued date\n• Delivery: 7-10 working days\n• Payment: 50% advance to initiate setup\n• Training and deployment documentation included";
    $pdf->MultiCell(0, 5, $terms, 0, 'L');
    
    if ($notes) {
        $pdf->Ln(3);
        $pdf->SetFont('helvetica', 'B', 9);
        $pdf->Cell(0, 6, 'Customer Requirements / Notes:', 0, 1);
        $pdf->SetFont('helvetica', '', 8);
        $pdf->MultiCell(0, 5, $notes, 0, 'L');
    }
    
    // Footer
    $pdf->Ln(10);
    $pdf->SetFont('helvetica', '', 7);
    $pdf->SetTextColor(100, 100, 100);
    $pdf->Cell(0, 4, 'SOHUB - Building next-gen AI & Machine infrastructure for Bangladesh', 0, 1, 'C');
    $pdf->Cell(0, 4, 'Email: hello@sohub.com.bd | Web: www.sohub.com.bd | Phone: +880 1922-036882', 0, 1, 'C');
    
    return $pdf->Output('', 'S');
}

function getAddonPrice($name) {
    $prices = [
        'Professional Installation' => 5000,
        'On-Site Training' => 3000,
        'Extended Warranty' => 8000,
        'Priority Support' => 5000
    ];
    return $prices[$name] ?? 0;
}
?>
