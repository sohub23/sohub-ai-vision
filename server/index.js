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
    <strong>SOHUB AI</strong><br>
    Building next-gen AI & Machine infrastructure for Bangladesh<br>
    <a href="https://www.ai.sohub.com.bd" style="color: #18B5FE; text-decoration: none;">www.ai.sohub.com.bd</a>
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
          filename: 'SOHUB_AI_Quatation.pdf',
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
            filename: 'SOHUB_AI_Quatation.pdf',
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

// Contact form endpoint
app.post('/api/send-contact', async (req, res) => {
  try {
    const { name, phone, email, message, productType } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and phone are required' });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'razinahmed60@gmail.com';

    // Admin Email HTML
    const adminHtml = `
<div style="font-family: 'Google Sans', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
  <div style="padding: 24px; border-bottom: 1px solid #e0e0e0; background-color: #f8f9fa;">
    <h2 style="margin: 0; color: #202124; font-size: 20px; font-weight: 500;">🔔 New AI Vision Inquiry</h2>
    <p style="margin: 8px 0 0 0; color: #5f6368; font-size: 14px;">A new inquiry has been submitted by <strong>${name}</strong>.</p>
  </div>
  <div style="padding: 24px;">
    <h3 style="margin: 0 0 16px 0; color: #202124; font-size: 16px; font-weight: 500;">Contact Details</h3>
    <table style="width: 100%; font-size: 14px; color: #3c4043; border-collapse: collapse;">
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4; width: 120px; color: #5f6368;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4;"><strong>${name}</strong></td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4; color: #5f6368;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4;"><a href="tel:${phone}" style="color: #18B5FE; text-decoration: none;">${phone}</a></td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4; color: #5f6368;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f3f4;">${email ? `<a href="mailto:${email}" style="color: #18B5FE; text-decoration: none;">${email}</a>` : 'Not provided'}</td></tr>
      <tr><td style="padding: 10px 0; color: #5f6368;">Product</td><td style="padding: 10px 0;"><strong>${productType || 'SOHUB AI Vision'}</strong></td></tr>
    </table>
    
    <div style="margin-top: 24px; padding: 16px; background-color: #f8f9fa; border-radius: 8px;">
      <h3 style="margin: 0 0 8px 0; color: #202124; font-size: 14px; font-weight: 500;">Message</h3>
      <p style="margin: 0; color: #3c4043; font-size: 14px; line-height: 1.5;">${message || 'No specific message provided.'}</p>
    </div>
  </div>
  <div style="padding: 24px; background-color: #f8f9fa; border-top: 1px solid #e0e0e0; text-align: center; color: #5f6368; font-size: 12px;">
    Inquiry received at: ${new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' })}
  </div>
</div>
    `;

    // Customer Email HTML
    const customerHtml = `
<div style="font-family: 'Google Sans', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
  <div style="text-align: center; padding: 40px 24px 32px 24px; border-bottom: 1px solid #e0e0e0; background-color: #ffffff;">
    <h1 style="margin: 0; color: #18B5FE; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">SOHUB <span style="color: #0B1E36;">AI</span></h1>
    <h2 style="margin: 16px 0 0 0; color: #202124; font-size: 22px; font-weight: 400;">Thank You for Your Interest! 🎯</h2>
  </div>
  <div style="padding: 32px 24px; color: #3c4043; font-size: 15px; line-height: 1.6;">
    <p style="margin: 0 0 16px 0;">Hi <strong>${name}</strong>,</p>
    <p style="margin: 0 0 16px 0;">Thank you for your interest in <strong>SOHUB AI Vision</strong>. We have received your inquiry and are excited to discuss how our offline AI vision system can enhance your surveillance capabilities!</p>
    
    <div style="margin: 24px 0; padding: 16px; border: 1px solid #dadce0; border-radius: 8px; background-color: #f8f9fa;">
      <p style="margin: 0 0 4px 0; color: #202124; font-weight: 500; font-size: 15px;">🔍 Your Inquiry:</p>
      <p style="margin: 10px 0 0 0; font-size: 14px; color: #5f6368;">${message || 'General AI Vision inquiry'}</p>
    </div>
    
    <h3 style="color: #18B5FE; margin: 24px 0 12px 0;">What Happens Next?</h3>
    <ul style="line-height: 2; margin: 0; padding-left: 20px;">
      <li>✅ Our AI Vision specialist will review your requirements within <strong>24 hours</strong></li>
      <li>📞 We will contact you at <strong>${phone}</strong> to discuss your surveillance needs</li>
      <li>💡 We'll explore how our offline AI system fits your existing cameras</li>
      <li>🚀 If suitable, we can arrange a live demo or pilot deployment</li>
    </ul>
    
    <h3 style="color: #18B5FE; margin: 24px 0 12px 0;">Why Choose SOHUB AI Vision?</h3>
    <ul style="line-height: 2; margin: 0; padding-left: 20px;">
      <li>🔒 <strong>100% Offline</strong> - No cloud dependency, complete privacy</li>
      <li>📹 <strong>Works with existing cameras</strong> - ONVIF/RTSP compatible</li>
      <li>⚡ <strong>Real-time processing</strong> - Instant alerts and responses</li>
      <li>💰 <strong>No subscription fees</strong> - One-time investment</li>
    </ul>
    
    <p style="margin: 24px 0 0 0;"><strong>Need immediate assistance?</strong><br>
    📧 Email: info@sohub.com.bd<br>
    📱 Phone: +880 1922-036882</p>
    
    <p style="margin: 32px 0 0 0; color: #5f6368;">Best regards,<br><strong style="color: #18B5FE;">SOHUB AI Vision Team</strong><br>Solution Hub Technologies</p>
  </div>
  <div style="padding: 24px; background-color: #f8f9fa; border-top: 1px solid #e0e0e0; text-align: center; color: #5f6368; font-size: 12px; line-height: 1.6;">
    <strong>SOHUB AI</strong><br>
    Building next-gen AI & Machine infrastructure for Bangladesh<br>
    <a href="https://ai.sohub.com.bd" style="color: #18B5FE; text-decoration: none;">www.ai.sohub.com.bd</a>
  </div>
</div>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: `"SOHUB AI Vision" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New AI Vision Inquiry from ${name}`,
      html: adminHtml,
    });

    // Send confirmation to customer (if email provided)
    if (email) {
      await transporter.sendMail({
        from: `"SOHUB AI Vision" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Your SOHUB AI Vision Inquiry Confirmation',
        html: customerHtml,
      });
    }

    res.json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
