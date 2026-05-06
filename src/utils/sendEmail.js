const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection configuration
    await transporter.verify();
    console.log("[EMAIL_CONFIG] SMTP Connection verified successfully");

    const mailOptions = {
      from: `"LandVista Guard" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px;">
                  <h2 style="color: #0F2A44; text-align: center;">LandVista Authentication</h2>
                  <hr style="border: 0; border-top: 1px solid #eee;" />
                  <p>Hello,</p>
                  <p>${options.message}</p>
                  <div style="text-align: center; margin: 30px 0;">
                      <span style="font-size: 32px; font-weight: bold; color: #0F2A44; letter-spacing: 5px; background: #f4f4f4; padding: 10px 20px; border-radius: 5px;">
                          ${options.otp}
                      </span>
                  </div>
                  <p>This code expires in 5 minutes.</p>
                  <p>If you didn't request this, please ignore this email.</p>
                  <hr style="border: 0; border-top: 1px solid #eee;" />
                  <p style="font-size: 12px; color: #777; text-align: center;">LandVista Corporate Security Team</p>
              </div>
          `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL_SUCCESS] OTP sent to ${options.email}. MessageId: ${info.messageId}`);
    console.log(`[DEBUG_OTP] OTP is: ${options.otp}`);
  } catch (error) {
    console.error(`[EMAIL_ERROR] Failed to send OTP to ${options.email}:`, error.message);
    // Print OTP anyway so dev can still login during troubleshooting
    console.log(`[DEBUG_OTP] OTP for ${options.email} is: ${options.otp}`);
    throw new Error("Failed to send OTP email.");
  }
};

module.exports = sendEmail;
