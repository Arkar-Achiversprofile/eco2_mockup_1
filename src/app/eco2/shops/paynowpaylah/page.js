"use client";
import { Elements } from "@stripe/react-stripe-js";
import ShopNavBar from "../../../components/ShopNavBar";
import React, { useEffect, useState } from "react";
import PaymentForm from "./components/PaymentForm";
import {stripePromise} from "../../../api/stripe-paymentintent";
import { useSearchParams } from "next/navigation";
import { getLocalStorage } from "../../../api/localStorage";

// const stripePromise = loadStripe(
//   StripeApiKey.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

export default function PaynowPaylah() {
  // const { clientSecret, paymentIntentId } = params;
  const searchParams = useSearchParams();

  const clientSecret = searchParams.get("clientSecret");
  const paymentIntentId = searchParams.get("paymentIntentId");
  const [qrImage, setQrImage] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    getOrderData()
  }, [])

  const getOrderData = () => {
    let orderData = JSON.parse(getLocalStorage("orderData"));
    let orderTotalAmount = getLocalStorage("totalAmount");
    setTotalAmount(orderTotalAmount)
    setOrderData(orderData);
  }

  // useEffect(() => {
  //   generatePayNowQR("4.00", setQrImage);
  // }, []);
  // console.log("qrImage ====>", qrImage);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      <ShopNavBar name="Payment" paymentIntentId={paymentIntentId} />
      {clientSecret != "" && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%" }}
        >
          <Elements options={options} stripe={stripePromise}>
            <PaymentForm orderData={orderData} totalAmount={totalAmount} clientSecret={clientSecret} paymentIntentId={paymentIntentId} />
          </Elements>
        </div>
      )}
      {/* <h4 style={{ marginLeft: "10%", marginTop: 30 }}>PayNow / PayLah</h4>
      <div className="d-flex flex-column align-items-center col-11 col-md-6 mx-auto">
        <Image alt="" src={qrImage} width={300} height={300} />
        <p style={{ fontWeight: "bold", marginTop: 20 }}>SGD 4</p>
        <p style={{ fontSize: 10, color: color.grey }}>
          Enter your billing reference number inside the form on the left and
        </p>
        <p style={{ fontSize: 10, color: color.grey, marginTop: -15 }}>
          enter the bill reference number at your bank internet banking page
        </p>
        <p
          style={{
            cursor: "pointer",
            fontSize: 10,
            color: color.skyBlue,
            marginTop: -5,
          }}
        >
          Where to enter the bill reference number for my preferred banks
          internet banking page?
        </p>
        <p style={{ fontSize: 12, color: color.grey, marginTop: 0 }}>
          Click next and Pay
        </p>
        <Image
          alt=""
          src={image.banks}
          width={250}
          height={25}
          style={{ marginTop: -10 }}
        />
        <p style={{ fontSize: 10, color: color.grey }}>
          Please remember to enter the bill reference number,
        </p>
        <p style={{ fontSize: 10, color: color.grey, marginTop: -15 }}>
          so we will know it&apos;s you and can start processing your order
          Thank you!
        </p>
        <button
            type="button"
            class="btn btn-info"
            style={{
              color: color.white,
              fontSize: 16,
              width: "70%"
            }}
            onClick={() => {}}
          >
            Done
          </button>
      </div> */}
    </div>
  );
}
