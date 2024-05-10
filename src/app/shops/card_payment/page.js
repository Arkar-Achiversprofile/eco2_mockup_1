"use client";
import React, { useEffect } from "react";
import ShopNavBar from "../../components/ShopNavBar";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../components/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { StripeApiKey } from "../../api/StripeApiKey";
import { color } from "../../components/color";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
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

export default function CardPayment() {
  const [clientSecret, setClientSecret] = React.useState("");
  const [paymentIntentId, setPaymentIntentId] = React.useState("");
  //   const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);
  //       setClientSecret("");
  //       setPaymentIntentId("");


  const onClickButton = async () => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 100 * 100,
          currency: "sgd",
          payment_method_types: ["card"],
        });
        setClientSecret(paymentIntent.client_secret);
        setPaymentIntentId(paymentIntent.id);
      } catch (error) {
        console.log("paymentIntent error =====>", error);
      }
  }

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <ShopNavBar
        name="Card Payment"
        paymentIntentId={paymentIntentId ? paymentIntentId : ""}
      />
      {clientSecret != "" ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%" }}
        >
          <Elements options={options} stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div class="card">
            <div class="card-header">Eco2 Balance</div>
            <div class="card-body">
              <h5 class="card-title">Payment Method</h5>
              <p class="card-text">
                We accept the online banking payment by Visa Card.
              </p>
              <button href="#" class="btn btn-success" onClick={onClickButton}>
                Pay with Visa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
