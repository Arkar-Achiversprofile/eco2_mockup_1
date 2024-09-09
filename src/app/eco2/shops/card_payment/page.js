"use client";
import React, {useEffect, useState} from "react";
import ShopNavBar from "../../../components/ShopNavBar";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../../components/PaymentForm";
import {stripe, stripePromise} from "../../../api/stripe-paymentintent";
import { getLocalStorage } from "../../../api/localStorage";


export default function CardPayment() {
  const [clientSecret, setClientSecret] = React.useState("");
  const [paymentIntentId, setPaymentIntentId] = React.useState("");
  //   const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);
  //       setClientSecret("");
  //       setPaymentIntentId("");
  const [total, setTotal] = useState(0);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    getOrderData()
  }, [])

  const getOrderData = () => {
    let orderData = JSON.parse(getLocalStorage("orderData"))
    let orderTotalAmount = getLocalStorage("totalAmount");
    setOrderData(orderData);
    setTotal(orderTotalAmount);
  }


  const onClickButton = async () => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: total * 100,
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
            <PaymentForm orderData={orderData} paymentIntentId={paymentIntentId} />
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
