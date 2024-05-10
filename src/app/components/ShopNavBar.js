import Image from "next/image";
import React from "react";
import { image } from "../assets";
import { useRouter } from "next/navigation";
import { StripeApiKey } from "../api/StripeApiKey";

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

export default function ShopNavBar({name = '', paymentIntentId = ''}) {
  const router = useRouter();
  const onClickBack = async () => {
    if (paymentIntentId != '') {
      const payment = await stripe.paymentIntents.cancel(
        paymentIntentId
      )
    }
    router.back()
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <div className="col-1 d-flex justify-content-center align-items-center">
          <i
          onClick={() => {onClickBack()}}
            className="bi bi-arrow-left-circle-fill"
            style={{ fontSize: 25, cursor: 'pointer' }}
          ></i>
        </div>
        <div className="col-10 d-flex flex-column justify-content-center align-items-center">
          <Image alt="" src={image.mainLogo} width={200} height={100} onClick={() => {router.replace("/")}} />
          <h5 style={{marginTop: 10}}>{name}</h5>
        </div>
        <div className="col-1 d-flex justify-content-center align-items-center">
          <i className="bi bi-bag" style={{fontSize: 25}}></i>
        </div>
      </div>
    </nav>
  );
}
