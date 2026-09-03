import Stripe from "stripe";

export type PaymentEnvironment = "production" | "sandbox";

const apiVersion = "2024-06-20" as const;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(name + " is required");
  }
  return value;
}

export function resolvePaymentClient(environment: PaymentEnvironment): Stripe {
  const keyName = environment === "production" ? "STRIPE_SECRET_KEY" : "STRIPE_SANDBOX_SECRET_KEY";
  return new Stripe(requireEnv(keyName), { apiVersion });
}

export function paymentEnvironmentFromValue(value: string | null): PaymentEnvironment {
  return value === "sandbox" ? "sandbox" : "production";
}
