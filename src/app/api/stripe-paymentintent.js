import { loadStripe } from "@stripe/stripe-js";
import { StripeApiKey } from "./StripeApiKey";

const Stripe = require("stripe");
const stripe = Stripe(StripeApiKey.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
  appInfo: {
    // For sample support and debugging, not required for production:
    name: "stripe-samples/<your-sample-name>",
    version: "0.0.1",
    url: "https://github.com/stripe-samples",
  },
});
const stripePromise = loadStripe(
  StripeApiKey.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export {
    stripe,
    stripePromise,
}