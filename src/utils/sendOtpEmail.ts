import { generateOtpEmailTemplate } from "./emailTemplates";
import { sendVerificationEmail } from "./sendVerificationEmail";

export const sendOtpEmail = async (to: string, otp: string) => {
  const html = generateOtpEmailTemplate(otp, {
    title: "OTP Verification",
    intro: "Your One-Time Password (OTP) for verification is:",
    expiryText: "This OTP is valid for the next 5 minutes. Please do not share it with anyone.",
    ignoreText: "If you did not request this verification, please ignore this email.",
  });

  await sendVerificationEmail({
    to,
    subject: "SCNE Ads - Secure OTP Verification",
    html,
  });
};
