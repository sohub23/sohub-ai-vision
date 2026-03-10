import PDFDocument from 'pdfkit';
import moment from 'moment';

export function createOrderPdf(orderData) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        margin: 0,
        size: 'A4',
        info: {
          Title: 'SOHUB AI Quotation',
          Author: 'SOHUB Technologies',
        }
      });
      
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('error', reject);
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });

      const colors = {
        primary: '#18B5FE',
        secondary: '#0B1E36',
        textMain: '#1F2937',
        textMuted: '#6B7280',
        bgLight: '#F9FAFB',
        border: '#E5E7EB'
      };

      const startX = 50;
      const docWidth = 595;
      const contentWidth = docWidth - (startX * 2);

      let currentY = 50;

      // --- LOGO & TAGLINE ---
      doc.font('Helvetica-Bold').fontSize(28);
      doc.fillColor(colors.primary).text('SOHUB ', startX, currentY, { continued: true });
      doc.fillColor(colors.secondary).text('AI');
      
      currentY = doc.y + 2;
      doc.font('Helvetica').fontSize(9).fillColor(colors.textMuted);
      doc.text('Industrial Grade Edge AI Solutions', startX, currentY);

      // --- QUOTATION TITLE & DATE ---
      doc.font('Helvetica-Bold').fontSize(22).fillColor(colors.primary);
      doc.text('QUOTATION', startX, 50, { width: contentWidth, align: 'right' });

      const dateStr = moment().format('DD MMM, YYYY');
      const phoneSuf = (orderData.phone || '').replace(/\D/g, '').slice(-4) || '1234';
      const quoteId = `SHB-${moment().format('YYMMDD')}-${phoneSuf}`;

      // Date
      doc.font('Helvetica-Bold').fontSize(10);
      const dateStrWidth = doc.widthOfString(dateStr);
      doc.font('Helvetica');
      const dateLabelWidth = doc.widthOfString('Date: ');
      
      doc.fillColor(colors.textMuted);
      doc.text('Date: ', startX + contentWidth - dateStrWidth - dateLabelWidth, 80);
      doc.font('Helvetica-Bold').fillColor(colors.textMain);
      doc.text(dateStr, startX + contentWidth - dateStrWidth, 80);

      // Quote #
      doc.font('Helvetica-Bold').fontSize(10);
      const quoteIdWidth = doc.widthOfString(quoteId);
      doc.font('Helvetica');
      const quoteLabelWidth = doc.widthOfString('Quote #: ');
      
      doc.fillColor(colors.textMuted);
      doc.text('Quote #: ', startX + contentWidth - quoteIdWidth - quoteLabelWidth, 95);
      doc.font('Helvetica-Bold').fillColor(colors.textMain);
      doc.text(quoteId, startX + contentWidth - quoteIdWidth, 95);

      // --- DIVIDER ---
      currentY = 130;
      doc.moveTo(startX, currentY).lineTo(startX + contentWidth, currentY).lineWidth(1).strokeColor(colors.border).stroke();
      
      currentY += 25;

      // --- CUSTOMER DETAILS ---
      doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.secondary);
      doc.text('BILLING & DELIVERY DETAILS', startX, currentY);
      
      currentY = doc.y + 15;
      
      const leftColX = startX;
      const rightColX = startX + 250;

      // Client Name
      doc.font('Helvetica').fontSize(9).fillColor(colors.textMuted);
      doc.text('Client Name:', leftColX, currentY);
      doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.textMain);
      doc.text(orderData.name || 'N/A', leftColX, currentY + 12);

      // Contact & Email
      doc.font('Helvetica').fontSize(9).fillColor(colors.textMuted);
      doc.text('Contact & Email:', rightColX, currentY);
      doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.textMain);
      doc.text(`${orderData.phone} ${orderData.email ? ' | ' + orderData.email : ''}`, rightColX, currentY + 12);

      currentY += 35;

      // Company
      doc.font('Helvetica').fontSize(9).fillColor(colors.textMuted);
      doc.text('Company:', leftColX, currentY);
      doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.textMain);
      doc.text(orderData.company || 'N/A', leftColX, currentY + 12);

      // Deployment Location
      doc.font('Helvetica').fontSize(9).fillColor(colors.textMuted);
      doc.text('Deployment Location:', rightColX, currentY);
      doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.textMain);
      doc.text(orderData.location || 'N/A', rightColX, currentY + 12);

      currentY += 45;

      // --- ORDER SUMMARY ---
      doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.secondary);
      doc.text('ORDER SUMMARY', startX, currentY);
      
      currentY = doc.y + 10;

      // Table Header Background
      doc.rect(startX, currentY, contentWidth, 24).fill(colors.bgLight);
      
      // Table Header Text
      let textY = currentY + 7;
      doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.textMuted);
      doc.text('Item Description', startX + 15, textY);
      doc.text('Qty', startX + 290, textY, { width: 40, align: 'center' });
      doc.text('Unit Price', startX + 340, textY, { width: 70, align: 'right' });
      doc.text('Total (BDT)', startX + 410, textY, { width: 70, align: 'right' });

      currentY += 24;

      const drawRow = (desc, qty, unitPrice, total, isBold = false, isSubText = false) => {
        currentY += 12;

        if (isBold) {
          doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.textMain);
        } else if (isSubText) {
          doc.font('Helvetica').fontSize(9).fillColor(colors.textMuted);
        } else {
          doc.font('Helvetica').fontSize(10).fillColor(colors.textMain);
        }
        
        doc.text(desc, startX + 15, currentY, { width: 260 });
        const itemBottomY = doc.y;
        
        doc.text(qty.toString(), startX + 290, currentY, { width: 40, align: 'center' });
        
        if (unitPrice === 0 && total === 0) {
           doc.text('Contact Us', startX + 340, currentY, { width: 70, align: 'right' });
           doc.text('Custom', startX + 410, currentY, { width: 70, align: 'right' });
        } else {
           doc.text(unitPrice === 'Included' ? 'Included' : Number(unitPrice).toLocaleString('en-BD'), startX + 340, currentY, { width: 70, align: 'right' });
           doc.text(total === 'Included' ? 'Included' : Number(total).toLocaleString('en-BD'), startX + 410, currentY, { width: 70, align: 'right' });
        }
        
        currentY = Math.max(itemBottomY, currentY + 12) + 8;
        
        doc.moveTo(startX, currentY).lineTo(startX + contentWidth, currentY).lineWidth(1).strokeColor(colors.border).stroke();
      };

      // Main Product
      const mainTotal = (orderData.unitPrice || 0) * (orderData.quantity || 1);
      drawRow(orderData.machineType || 'SOHUB AI Edge Engine', orderData.quantity || 1, orderData.unitPrice || 0, mainTotal, true);
      
      // Addons
      if (orderData.addOns && Array.isArray(orderData.addOns)) {
        orderData.addOns.forEach(addon => {
          let name = '+ ' + (addon.name || addon);
          let price = addon.price !== undefined ? addon.price : 0;
          let qty = orderData.quantity || 1;
          let rowTotal = price * qty;
          drawRow(name, qty, price === 0 ? 'Included' : price, rowTotal === 0 ? 'Included' : rowTotal, false, true);
        });
      }

      currentY += 15;

      // --- TOTALS ---
      const totalsBoxY = currentY;
      doc.rect(startX + 230, totalsBoxY, contentWidth - 230, 48).fill(colors.bgLight);
      doc.rect(startX + 230, totalsBoxY, contentWidth - 230, 48).lineWidth(1).strokeColor(colors.border).stroke();

      doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.secondary);
      doc.text('GRAND TOTAL:', startX + 245, totalsBoxY + 18, { width: 100, align: 'left' });
      
      const grandTotal = orderData.totalPrice || 0;
      doc.font('Helvetica-Bold').fontSize(16).fillColor(colors.primary);
      
      if (grandTotal > 0) {
         doc.text(`${Number(grandTotal).toLocaleString('en-BD')} BDT`, startX + 335, totalsBoxY + 16, { width: 140, align: 'right' });
      } else {
         doc.font('Helvetica-Bold').fontSize(14);
         doc.text('To be discussed', startX + 335, totalsBoxY + 17, { width: 140, align: 'right' });
      }

      currentY = totalsBoxY + 70;

      // --- TERMS & CONDITIONS ---
      doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.secondary).text('Customer Notes:', startX, currentY);
      currentY = doc.y + 5;
      
      if (orderData.notes) {
        doc.font('Helvetica').fontSize(9).fillColor(colors.textMuted).text(orderData.notes, startX, currentY, { width: contentWidth, lineGap: 3 });
        currentY = doc.y + 15;
      } else {
        doc.font('Helvetica-Oblique').fontSize(9).fillColor(colors.textMuted).text('None', startX, currentY);
        currentY = doc.y + 15;
      }

      doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.secondary).text('Terms & Conditions:', startX, currentY);
      currentY = doc.y + 5;
      
      doc.font('Helvetica').fontSize(8).fillColor(colors.textMuted);
      const terms = [
        'All AI processing happens locally on Edge hardware (0% cloud dependency).',
        'This quotation is valid for 30 days from the issued date.',
        'Standard delivery timeframe is 7-10 working days upon order confirmation.',
        'Payment term: 50% advance payment to initiate setup and hardware allocation.',
        'Comprehensive training and deployment documentation are fully included.'
      ];
      
      terms.forEach(term => {
        doc.text(`• ${term}`, startX, currentY, { lineGap: 3, width: contentWidth });
        currentY = doc.y;
      });

      // --- FOOTER ---
      const pageHeight = 842; 
      
      doc.moveTo(startX, pageHeight - 80).lineTo(startX + contentWidth, pageHeight - 80).lineWidth(1).strokeColor(colors.border).stroke();
      
      doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.secondary);
      doc.text('SOHUB Technologies', startX, pageHeight - 65, { align: 'center', width: contentWidth });
      
      doc.font('Helvetica').fontSize(8).fillColor(colors.textMuted);
      doc.text('Building next-gen AI & Machine infrastructure for Bangladesh', startX, pageHeight - 52, { align: 'center', width: contentWidth });
      
      doc.font('Helvetica-Bold').fontSize(8).fillColor(colors.primary);
      doc.text('Email: hello@sohub.com.bd   |   Web: www.sohub.com.bd   |   Phone: +880 1922-036882', startX, pageHeight - 38, { align: 'center', width: contentWidth });

      doc.end();
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}
