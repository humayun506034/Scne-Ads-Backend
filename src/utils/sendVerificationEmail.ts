type SendVerificationEmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export const sendVerificationEmail = async ({
  to,
  subject,
  html,
}: SendVerificationEmailPayload) => {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;
  const brevoSenderName = process.env.BREVO_SENDER_NAME || "SCNE Ads";

  if (!brevoApiKey || !brevoSenderEmail) {
    throw new Error("BREVO_API_KEY and BREVO_SENDER_EMAIL are required.");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": brevoApiKey,
    },
    body: JSON.stringify({
      sender: {
        email: brevoSenderEmail,
        name: brevoSenderName,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo error: ${errorText}`);
  }

  return response.json();
};
