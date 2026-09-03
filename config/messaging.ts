import twilio from "twilio";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(name + " is required");
  }
  return value;
}

export const twilioClient = twilio(requireEnv("TWILIO_ACCOUNT_SID"), requireEnv("TWILIO_AUTH_TOKEN"));

export const verifyServiceSid = requireEnv("TWILIO_VERIFY_SERVICE_SID");

export async function sendVerificationCode(to: string) {
  return twilioClient.verify.v2.services(verifyServiceSid).verifications.create({
    to,
    channel: "sms"
  });
}
