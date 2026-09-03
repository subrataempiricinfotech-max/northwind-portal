import sgMail from "@sendgrid/mail";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(name + " is required");
  }
  return value;
}

sgMail.setApiKey(requireEnv("SENDGRID_API_KEY"));

export async function sendOrderReceipt(to: string, orderId: string) {
  await sgMail.send({
    to,
    from: "orders@northwind.example.com",
    subject: "Northwind order " + orderId,
    text: "Your Northwind order " + orderId + " has been received."
  });
}
