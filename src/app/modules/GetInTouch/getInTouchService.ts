import { sendVerificationEmail } from "../../../utils/sendVerificationEmail";

const sendGetInTouchMessage = async (payload: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const supportEmail = process.env.BREVO_SENDER_EMAIL;

  if (!supportEmail) {
    throw new Error(
      "BREVO_SENDER_EMAIL is required for contact messages."
    );
  }

  await sendVerificationEmail({
    to: supportEmail,
    subject: "New Get In Touch Message Received",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px;">
        <h2 style="color: #333;">New Contact Message</h2>
        <p>You have received a new message through the "Get In Touch" form. Here are the details:</p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="font-weight: bold; padding: 8px 0;">Name:</td>
            <td>${payload.firstName} ${payload.lastName}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 0;">Email:</td>
            <td><a href="mailto:${payload.email}">${payload.email}</a></td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 0;">Phone:</td>
            <td>${payload.phone || "N/A"}</td>
          </tr>
        </table>

        <div style="margin-top: 20px;">
          <p style="font-weight: bold;">Message:</p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #007BFF;">
            <p style="white-space: pre-wrap; margin: 0;">${payload.message}</p>
          </div>
        </div>
      </div>
    `,
  });
};

export const getInTouchService = {
  sendGetInTouchMessage,
};
