import PDFDocument from 'pdfkit';
import moment from 'moment';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createOrderPdf(orderData) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 50,
        size: 'A4',
        info: {
          Title: 'SOHUB AI Quotation',
          Author: 'SOHUB Technologies',
        }
      });


      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('error', reject);
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      const colors = {
        primary: '#1e293b',
        accent: '#0fc7ff',  // New theme color for title
        textMain: '#0f172a',
        textMuted: '#64748b',
        border: '#cbd5e1'
      };

      let currentY = 40;
      const startX = 50;
      const contentWidth = 495;

      // --- HEADER: LOGO (Left) ---
      const logoPath = path.join(__dirname, '../public/logo/sohub_ai.png');
      try {
        doc.image(logoPath, startX, currentY, { width: 90 });
      } catch (err) {
        doc.font('Helvetica-Bold').fontSize(22).fillColor(colors.primary).text('SOHUB AI', startX, currentY);
      }

      // --- CENTERED TITLE ---
      currentY = 90;
      doc.font('Helvetica-Bold').fontSize(24).fillColor(colors.textMain);
      doc.text('Quotation', 0, currentY, { width: 595, align: 'center' });

      // --- QUOTATION INFO ---
      const quoteDate = moment().format('DD/MM/YYYY hh:mm A');
      const phoneSuf = (orderData.phone || '').replace(/\D/g, '').slice(-4) || '5555';
      const quoteId = `${moment().format('YYYY')}/${phoneSuf}`;

      currentY += 40;
      doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.textMain);
      doc.text(`Quotation number: ${quoteId}`, startX, currentY);
      doc.text(`Date: ${quoteDate}`, 0, currentY, { width: 595 - startX, align: 'right' });

      // --- CUSTOMER DETAILS ---
      currentY += 22;
      doc.font('Helvetica-Bold').fontSize(10).text('Customer Details', startX, currentY);

      currentY += 14;
      doc.font('Helvetica').fontSize(10).fillColor(colors.textMain);
      doc.text(orderData.name || 'N/A', startX, currentY);

      currentY += 14;
      doc.font('Helvetica-Bold').text('Mobile: ', startX, currentY, { continued: true })
        .font('Helvetica').text(orderData.phone);

      currentY += 14;
      doc.font('Helvetica-Bold').text('Email: ', startX, currentY, { continued: true })
        .font('Helvetica').text(orderData.email || 'N/A');

      // --- TABLE HEADER ---
      currentY += 28;
      doc.font('Helvetica-Bold').fontSize(10);
      doc.text('Sl', startX, currentY);
      doc.text('Item Name', startX + 30, currentY);
      doc.text('Quantity', startX + 280, currentY, { width: 60, align: 'right' });
      doc.text('Unit Price', startX + 370, currentY, { width: 60, align: 'right' });
      doc.text('Subtotal', startX + 440, currentY, { width: 55, align: 'right' });

      currentY += 14;
      doc.moveTo(startX, currentY).lineTo(startX + contentWidth, currentY).lineWidth(0.5).strokeColor(colors.border).stroke();

      // --- TABLE ROWS ---
      currentY += 12;
      const unitPrice = orderData.unitPrice || 0;
      const quantity = orderData.quantity || 1;
      const subtotal = unitPrice * quantity;

      doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.textMain);
      doc.text('1', startX, currentY);
      doc.text(orderData.machineType || 'SOHUB AI Edge Engine', startX + 30, currentY);
      const mainBaseY = doc.y;

      doc.font('Helvetica').fontSize(9).fillColor(colors.textMuted);
      doc.text('Industrial Grade Edge AI Solutions', startX + 30, mainBaseY + 2, { width: 250 });

      doc.font('Helvetica').fontSize(10).fillColor(colors.textMain);
      doc.text(`${quantity} Pc(s)`, startX + 280, currentY, { width: 60, align: 'right' });
      doc.text(unitPrice.toLocaleString('en-BD', { minimumFractionDigits: 2 }), startX + 370, currentY, { width: 60, align: 'right' });
      doc.text(subtotal.toLocaleString('en-BD', { minimumFractionDigits: 2 }), startX + 440, currentY, { width: 55, align: 'right' });

      // --- DIVIDER ---
      currentY = Math.max(doc.y + 10, currentY + 30);
      doc.moveTo(startX, currentY).lineTo(startX + contentWidth, currentY).lineWidth(0.5).strokeColor(colors.border).stroke();

      // --- TOTALS ---
      currentY += 10;
      const grandTotal = orderData.totalPrice || subtotal;

      doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.textMain);
      doc.text('Subtotal:', startX + 250, currentY, { width: 150, align: 'right' });
      doc.font('Helvetica').text(`BDT ${subtotal.toLocaleString('en-BD', { minimumFractionDigits: 2 })}`, startX + 410, currentY, { width: 85, align: 'right' });

      currentY += 18;
      doc.font('Helvetica-Bold').text('Grand Total(Excluding Vat & Tax):', startX + 200, currentY, { width: 200, align: 'right' });
      doc.font('Helvetica').text(`BDT ${grandTotal.toLocaleString('en-BD', { minimumFractionDigits: 2 })}`, startX + 410, currentY, { width: 85, align: 'right' });

      // --- NOTE SECTION ---
      currentY += 45;
      doc.font('Helvetica-Bold').fontSize(9).text('***Note:', startX, currentY);
      doc.font('Helvetica').fontSize(8).fillColor(colors.textMuted);
      const notes = [
        '1. Quoted prices are valid for 30 Days',
        '2. Prices are exclusive of government VAT & taxes.',
        '3. Full advance payment (100%) is required for all orders.',
        '4. All products should be thoroughly checked before delivery. After delivery, SOHUB AI will not be held responsible for any damages or issues.',
        '5. All sold products are non-returnable and non-refundable.'
      ];

      currentY += 12;
      notes.forEach((note) => {
        doc.text(note, startX, currentY, { width: contentWidth });
        currentY = doc.y + 4;
      });

      // --- FOOTER ---
      currentY = 720;
      doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.textMain);
      doc.text('SOHUB AI - Making Intelligence Accessible', 0, currentY, { align: 'center', width: 595 });

      currentY += 14;
      doc.font('Helvetica').fontSize(9).fillColor(colors.textMuted);
      doc.text('Thank you for choosing SOHUB AI!', 0, currentY, { align: 'center', width: 595 });

      currentY += 14;
      doc.fontSize(8).fillColor(colors.textMain);
      doc.text(`For support, contact us at hello@sohub.com.bd or +8801833838965`, 0, currentY, { align: 'center', width: 595 });

      currentY += 14;
      doc.font('Helvetica').fontSize(9).fillColor(colors.textMain);
      doc.text('www.ai.sohub.com.bd', 0, currentY, { align: 'center', width: 595 });

      // Powered By at bottom right
      doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.textMain);
      doc.text('Powered By SOHUB', 0, 780, { width: 595 - startX, align: 'right' });

      doc.end();
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}
