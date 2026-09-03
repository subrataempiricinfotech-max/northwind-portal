import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = "SG.FAKE_DUMMY_DO_NOT_USE.0000000000000000000000_not_a_real_key";

sgMail.setApiKey(SENDGRID_API_KEY);

export async function sendOrderReceipt(to: string, orderId: string) {
  await sgMail.send({
    to,
    from: "orders@northwind.example.com",
    subject: "Northwind order " + orderId,
    text: "Your Northwind order " + orderId + " has been received."
  });
}
