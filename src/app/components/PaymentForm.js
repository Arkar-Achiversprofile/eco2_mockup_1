'use client'
import React, { useContext } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import {EShopController} from "../controller"
import AppContext from "../context/AppContext";

export default function PaymentForm(orderData) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const {userInfo} = useContext(AppContext);
  console.log("orderData ====>", orderData)

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    var obj = {
      accountItemId: userInfo.userId,
    }
    var purchasedData = []
    // orderData.map((v) => {

    // })

    stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://feak.achieversprofile.com/eco2/shops/order_success",
        // return_url: "http://localhost:3000/eco2/shops/order_success",
      },
      redirect: 'if_required',
    }).then( async (result) => {
      console.log('result====>', result)
      console.log("intent ====>", result.paymentIntent)
      if (result.paymentIntent.status === "succeeded") {
        EShopController.createTransaction();
        router.push("/eco2/shops/order_success")
      } else {
        const stripe1 = require("stripe")(StripeApiKey.STRIPE_SECRET_KEY);
        // The user closed the modal, cancelling payment
        const payment =  await stripe1.paymentIntents.cancel(paymentIntentId);
        if (payment) {
          router.push("/eco2/shops/order_cancel")
        }
      }
      // if (result.error.type === "card_error" || result.error.type === "validation_error") {
      //   setMessage(result.error.message);
      // } else {
      //   setMessage("An unexpected error occurred.");
      // }
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        className="btn btn-success"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        style={{ marginTop: 20 }}
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
