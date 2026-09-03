import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resolvePaymentClient } from "../../../config/payments";

const orderSchema = z.object({
  customerId: z.string(),
  amount: z.number().int().positive(),
  currency: z.string().length(3).default("usd"),
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

  return NextResponse.json({
    orderId: "nw-" + paymentIntent.id,
    paymentIntentId: paymentIntent.id,
    environment: payload.environment
  });
}
