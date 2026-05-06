const Engagement = require("./engagement.model");
const sendEmail = require("../../utils/sendEmail");

exports.submitEngagement = async (req, res) => {
  try {
    const { 
      fullName, 
      organization, 
      role, 
      investorType, 
      ticketSize, 
      interestArea, 
      purpose, 
      timeline 
    } = req.body;

    // 1. Create entry in Database
    const engagement = await Engagement.create({
      fullName,
      organization,
      role,
      investorType,
      ticketSize,
      interestArea,
      purpose,
      timeline
    });

    // 2. Prepare email for Administrator
    const adminMessage = `
      NEW INSTITUTIONAL ENGAGEMENT REQUEST
      
      Full Name: ${fullName}
      Organization: ${organization}
      Role: ${role}
      Investor Type: ${investorType}
      Ticket Size: ${ticketSize}
      Interest Areas: ${interestArea.join(", ")}
      Purpose: ${purpose}
      Timeline: ${timeline}
      
      Submission Date: ${new Date().toLocaleString()}
      Engagement ID: ${engagement._id}
    `;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 30px; background: #ffffff;">
        <div style="background: #0F2A44; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">Institutional Engagement Request</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #F7F8FA;">
          <p style="color: #5A6673; font-size: 12px; text-transform: uppercase; font-weight: bold;">Submitter Details</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px; border-bottom: 1px solid #F7F8FA; font-weight: bold; color: #0F2A44;">Full Name</td><td style="padding: 10px; border-bottom: 1px solid #F7F8FA;">${fullName}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #F7F8FA; font-weight: bold; color: #0F2A44;">Organization</td><td style="padding: 10px; border-bottom: 1px solid #F7F8FA;">${organization}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #F7F8FA; font-weight: bold; color: #0F2A44;">Role</td><td style="padding: 10px; border-bottom: 1px solid #F7F8FA;">${role}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #F7F8FA; font-weight: bold; color: #0F2A44;">Investor Type</td><td style="padding: 10px; border-bottom: 1px solid #F7F8FA;">${investorType}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #F7F8FA; font-weight: bold; color: #0F2A44;">Ticket Size</td><td style="padding: 10px; border-bottom: 1px solid #F7F8FA;">${ticketSize}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #F7F8FA; font-weight: bold; color: #0F2A44;">Areas</td><td style="padding: 10px; border-bottom: 1px solid #F7F8FA;">${interestArea.join(", ")}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #F7F8FA; font-weight: bold; color: #0F2A44;">Timeline</td><td style="padding: 10px; border-bottom: 1px solid #F7F8FA;">${timeline}</td></tr>
          </table>
          
          <p style="color: #5A6673; font-size: 12px; text-transform: uppercase; font-weight: bold; margin-top: 30px;">Purpose of Engagement</p>
          <div style="background: #F7F8FA; padding: 20px; border-radius: 8px; color: #1F2933; font-style: italic;">
            "${purpose}"
          </div>
        </div>
        <div style="text-align: center; margin-top: 30px; font-size: 10px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 1px;">
          LandVista Institutional Intelligence Gateway &bull; Secured Session
        </div>
      </div>
    `;

    // 3. Send email to admin
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL || "monikahachion@gmail.com",
        subject: `[Engagement] New Request: ${organization} - ${fullName}`,
        message: adminMessage,
        html: adminHtml
      });
    } catch (emailError) {
      console.error("[ENGAGEMENT_EMAIL_ERROR] Failed to notify admin:", emailError.message);
      // We don't fail the request if email fails, as the record is saved
    }

    res.status(201).json({
      success: true,
      message: "Engagement profile submitted successfully",
      data: engagement
    });

  } catch (error) {
    console.error("[ENGAGEMENT_SUBMIT_ERROR]", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit institutional profile",
      error: error.message
    });
  }
};

exports.getAllEngagements = async (req, res) => {
  try {
    const engagements = await Engagement.find().sort({ createdAt: -1 });
    res.json(engagements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
