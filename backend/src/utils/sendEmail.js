import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOTP = async (email, otp, name) => {
  try {
    const mailOptions = {
      from: `"PriceCompare" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Email - PriceCompare',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              color: #ffffff;
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 18px;
              color: #333333;
              margin-bottom: 20px;
            }
            .message {
              font-size: 16px;
              color: #666666;
              line-height: 1.6;
              margin-bottom: 30px;
            }
            .otp-container {
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
              border-radius: 10px;
              padding: 30px;
              text-align: center;
              margin-bottom: 30px;
            }
            .otp-code {
              font-size: 36px;
              font-weight: bold;
              color: #667eea;
              letter-spacing: 8px;
              margin: 0;
            }
            .otp-label {
              font-size: 14px;
              color: #666666;
              margin-top: 10px;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #999999;
            }
            .warning {
              font-size: 14px;
              color: #e74c3c;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>PriceCompare</h1>
            </div>
            <div class="content">
              <p class="greeting">Hello ${name || 'there'},</p>
              <p class="message">
                Thank you for signing up with PriceCompare! To complete your registration, 
                please use the verification code below. This code will expire in 5 minutes.
              </p>
              <div class="otp-container">
                <p class="otp-code">${otp}</p>
                <p class="otp-label">Your Verification Code</p>
              </div>
              <p class="warning">
                If you didn't request this code, please ignore this email.
              </p>
            </div>
            <div class="footer">
              <p>&copy; 2026 PriceCompare. All rights reserved.</p>
              <p>Local Electronics Price Comparison Platform</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export default transporter;
