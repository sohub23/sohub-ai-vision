import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createOrderPdf } from './pdfGenerator.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/send-order', async (req, res) => {
  try {
    const orderData = req.body;

    // Generate PDF
    let pdfBuffer = null;
    if (orderData.productType !== 'edge-engine-custom') {
      pdfBuffer = await createOrderPdf(orderData);
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'razinahmed60@gmail.com';
    const customerEmail = orderData.email;

    // Admin Email HTML
    const adminHtml = `
<div style="font-family: 'Google Sans', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
  <div style="padding: 24px; border-bottom: 1px solid #e0e0e0; background-color: #f8f9fa;">
    <h2 style="margin: 0; color: #202124; font-size: 20px; font-weight: 500;">New Order Inquiry</h2>
    <p style="margin: 8px 0 0 0; color: #5f6368; font-size: 14px;">A new order request has been submitted by <strong>${orderData.name}</strong>.</p>
  </div>
  <div style="padding: 24px;">
    <h3 style="margin: 0 0 16px 0; color: #202124; font-size: 16px; font-weight: 500;">Customer Details</h3>
    <table style="width: 100%; font-size: 14px; color: #3c4043; border-collapse: collapse;">
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4; width: 120px; color: #5f6368;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4;"><strong>${orderData.name}</strong></td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4; color: #5f6368;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4;">${orderData.company || 'N/A'}</td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4; color: #5f6368;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4;"><a href="tel:${orderData.phone}" style="color: #18B5FE; text-decoration: none;">${orderData.phone}</a></td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4; color: #5f6368;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4;"><a href="mailto:${orderData.email}" style="color: #18B5FE; text-decoration: none;">${orderData.email || 'N/A'}</a></td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4; color: #5f6368;">Location</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4;">${orderData.location}</td></tr>
      <tr><td style="padding: 10px 0; color: #5f6368;">Total Value</td><td style="padding: 10px 0;"><strong>${orderData.totalPrice ? orderData.totalPrice.toLocaleString('en-BD') : 0} BDT</strong></td></tr>
    </table>
    
    <div style="margin-top: 24px; padding: 16px; background-color: #f8f9fa; border-radius: 8px;">
      <h3 style="margin: 0 0 8px 0; color: #202124; font-size: 14px; font-weight: 500;">Customer Notes</h3>
      <p style="margin: 0; color: #3c4043; font-size: 14px; line-height: 1.5;">${orderData.notes || 'No additional notes provided.'}</p>
    </div>
  </div>
 
</div>
    `;

    // Customer Email HTML
    const customerHtml = `
<div style="font-family: 'Google Sans', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
  <div style="text-align: center; padding: 40px 24px 32px 24px; border-bottom: 1px solid #e0e0e0; background-color: #ffffff;">
    <h1 style="margin: 0; color: #18B5FE; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">SOHUB <span style="color: #0B1E36;">AI</span></h1>
    <h2 style="margin: 16px 0 0 0; color: #202124; font-size: 22px; font-weight: 400;">Your request is received.</h2>
  </div>
  <div style="padding: 32px 24px; color: #3c4043; font-size: 15px; line-height: 1.6;">
    <p style="margin: 0 0 16px 0;">Hi ${orderData.name},</p>
    <p style="margin: 0 0 16px 0;">Thank you for choosing SOHUB Technologies. We have successfully received your configuration request for the <strong>${orderData.machineType || 'SOHUB AI Edge Engine'}</strong>.</p>
    
    ${pdfBuffer ? `
    <div style="margin: 24px 0; padding: 16px; border: 1px solid #dadce0; border-radius: 8px; background-color: #f8f9fa;">
      <p style="margin: 0 0 4px 0; color: #202124; font-weight: 500; font-size: 15px;">📄 Official Quotation Attached</p>
      <p style="margin: 0; color: #5f6368; font-size: 13px;">Please find your personalized SOHUB Quotation PDF attached to this email.</p>
    </div>
    ` : ''}
    
    <p style="margin: 0 0 24px 0;">One of our technical implementation specialists will review your specific environment requirements and formally follow up with you shortly at <strong>${orderData.phone}</strong>.</p>
    
    <p style="margin: 0; color: #5f6368;">Best regards,<br><span style="color: #202124; font-weight: 500;">The SOHUB Team</span></p>
  </div>
  <div style="padding: 24px; background-color: #f8f9fa; border-top: 1px solid #e0e0e0; text-align: center; color: #5f6368; font-size: 12px; line-height: 1.6;">
    <strong>SOHUB Technologies</strong><br>
    Building next-gen AI & Machine infrastructure for Bangladesh<br>
    <a href="https://www.sohub.com.bd" style="color: #18B5FE; text-decoration: none;">www.sohub.com.bd</a>
  </div>
</div>
    `;

    // Mail to admin
    await transporter.sendMail({
      from: `"SOHUB AI" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New AI Order Request - ${orderData.name}`,
      html: adminHtml,
      attachments: pdfBuffer ? [
        {
          filename: 'SOHUB_Quotation.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ] : []
    });

    // Mail to customer (if email provided)
    if (customerEmail) {
      await transporter.sendMail({
        from: `"SOHUB AI" <${process.env.SMTP_USER}>`,
        to: customerEmail,
        subject: `Order Confirmation - SOHUB AI`,
        html: customerHtml,
        attachments: pdfBuffer ? [
          {
            filename: 'SOHUB_Quotation.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf'
          }
        ] : []
      });
    }

    res.json({ success: true, message: 'Your request has been sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Email failed to send' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
