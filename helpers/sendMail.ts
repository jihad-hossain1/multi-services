
import nodemailer from "nodemailer";

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // Use environment variables for sensitive info
  },
});

// Function to send emails
export async function sendEmails(
  to: string,
  subject: string,
  html: string,
  imgData?: string // Base64 image data
) {
  try {
    // Define mail options
    const mailOptions: any = {
      from: process.env.MAIL_USER,
      to: to,
      subject: subject,
      html: html,
    };

    // Add image as an attachment if provided
    // if (imgData) {
    //   const buffer = Buffer.from(imgData.split(",")[1], "base64");
    //   mailOptions.attachments = [
    //     {
    //       filename: "invoice.png",
    //       content: buffer,
    //       encoding: "base64",
    //     },
    //   ];
    // }

    // Send email
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email: ", error);
    return { success: false, error: (error as Error).message };
  }
}


export const mailBody = (data: any) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              margin: 0;
              padding: 0;
              font-family: 'Roboto', Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
          }
          .container {
              width: 100%;
              background-color: #f4f4f4;
              padding: 20px;
          }
          .content {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              padding: 20px;
              text-align: center;
          }
          .header {
              margin-bottom: 20px;
          }
          .header img {
              width: 150px;
          }
          .code {
              display: inline-block;
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 2px;
              color: #ffffff;
              background-color: #007BFF;
              padding: 15px 25px;
              border-radius: 4px;
          }
          .button {
              display: inline-block;
              font-size: 16px;
              font-weight: bold;
              color: #ffffff;
              background-color: #007BFF;
              padding: 12px 20px;
              border-radius: 4px;
              text-decoration: none;
              margin-top: 20px;
          }
          .button2 {
              display: inline-block;
              font-size: 16px;
              font-weight: bold;
              color: #fff;
              background-color: #ffffff;
              padding: 12px 20px;
              border-radius: 4px;
              text-decoration: none;
              margin-top: 20px;
          }
          .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #999;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="content">
              <div class="header">
                  <img src="https://yourdomain.com/logo.png" alt="Multi Service">
              </div>
              <h1 style="color: #333; margin-bottom: 10px;">Email Verification</h1>
              <p style="color: #555; font-size: 16px;">Thank you for registering! Please use the code below to verify your email address.</p>
              <div style="margin: 20px 0;">
                  <span class="code">${data?.code}</span>
              </div>
              <p style="color: #555; font-size: 14px;">If you did not request this, please ignore this email.</p>
              <a href="https://multi-services.vercel.app/auth/verify/${data?.email}" class="button2">Verify Email</a>
              <div class="footer">
                  <p>&copy; 2024 Multi Service. All rights reserved.</p>
                  <p>Dhaka, Bangladesh</p>
              </div>
          </div>
      </div>
  </body>
  </html>
  `;
  };