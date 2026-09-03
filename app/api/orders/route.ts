import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resolvePaymentClient } from "../../../config/payments";
import { sendOrderReceipt } from "../../../config/email";
import { uploadProductImageManifest } from "../../../config/storage";

const orderSchema = z.object({
  customerId: z.string(),
  email: z.string().email(),
  amount: z.number().int().positive(),
  currency: z.string().length(3).default("usd"),
  productImageKeys: z.array(z.string()).default([]),
  environment: z.enum(["production", "sandbox"]).default("sandbox")
});

export async function POST(request: NextRequest) {
  const payload = orderSchema.parse(await request.json());
  const stripe = resolvePaymentClient(payload.environment);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: payload.amount,
    currency: payload.currency,
    metadata: {
      customerId: payload.customerId
    }
  });
  const orderId = "nw-" + paymentIntent.id;

  await uploadProductImageManifest(orderId, JSON.stringify({
    orderId,
    productImageKeys: payload.productImageKeys
  }));
  await sendOrderReceipt(payload.email, orderId);

  return NextResponse.json({
    orderId,
    paymentIntentId: paymentIntent.id,
    environment: payload.environment
  });
}
