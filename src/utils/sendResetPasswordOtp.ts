import { generateOtpEmailTemplate } from "./emailTemplates";
import { sendVerificationEmail } from "./sendVerificationEmail";

export const sendPasswordResetOtp = async (to: string, otp: string) => {
  const html = generateOtpEmailTemplate(otp, {
    title: "Password Reset OTP",
    intro: "You requested to reset your password. Use this OTP to continue:",
    expiryText: "This OTP is valid for the next 5 minutes. Please do not share it with anyone.",
    ignoreText: "If you did not request a password reset, please ignore this email.",
  });

  await sendVerificationEmail({
    to,
    subject: "SCNE Ads - Password Reset OTP",
    html,
  });
};
