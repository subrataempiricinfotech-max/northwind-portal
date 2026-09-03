import { NextRequest, NextResponse } from "next/server";
import { paymentEnvironmentFromValue, resolvePaymentClient } from "../../../../config/payments";

export async function POST(request: NextRequest) {
  const environment = paymentEnvironmentFromValue(request.headers.get("x-northwind-payment-env"));
  const stripe = resolvePaymentClient(environment);
  const signature = request.headers.get("stripe-signature");
  const secret = environment === "sandbox" ? process.env.STRIPE_WEBHOOK_SECRET_SANDBOX : process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json({ error: "missing webhook signature configuration" }, { status: 400 });
  }

  const rawBody = await request.text();
  const event = stripe.webhooks.constructEvent(rawBody, signature, secret);

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    console.info("Payment completed", paymentIntent.id, environment);
  }

  return NextResponse.json({ received: true, environment });
}
