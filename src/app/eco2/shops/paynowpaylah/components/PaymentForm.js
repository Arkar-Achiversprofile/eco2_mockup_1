/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { StripeApiKey } from "../../../../api/StripeApiKey";
import { BrandController, EShopController } from "../../../../controller";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteLocalStorage } from "../../../../api/localStorage";
import AppContext from "../../../../context/AppContext";

export default function CheckoutForm({
  orderData,
  clientSecret,
  paymentIntentId,
}) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [brandList, setBrandList] = React.useState([]);
  const { userInfo } = useContext(AppContext);

  useEffect(() => {
    BrandController.getBrandIdList((data) => {
      if (data.length > 0) {
        setBrandList(data);
      }
    });
  }, []);
  //   console.log("paymentForm =====>", clientSecret);

  //   React.useEffect(() => {
  //     if (!stripe) {
  //       return;
  //     }

  //     // const clientSecret = new URLSearchParams(window.location.search).get(
  //     //   "clientSecret"
  //     // );

  //     if (!clientSecret) {
  //       return;
  //     }

  //     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //       switch (paymentIntent.status) {
  //         case "succeeded":
  //           setMessage("Payment succeeded!");
  //           break;
  //         case "processing":
  //           setMessage("Your payment is processing.");
  //           break;
  //         case "requires_payment_method":
  //           setMessage("Your payment was not successful, please try again.");
  //           break;
  //         default:
  //           setMessage("Something went wrong.");
  //           break;
  //       }
  //     });
  //   }, [stripe]);

  useEffect(() => {
    window.addEventListener("beforeunload", async function (e) {
      e.preventDefault();
      e.returnValue = "";
      const stripe1 = require("stripe")(StripeApiKey.STRIPE_SECRET_KEY);
      // The user closed the modal, cancelling payment
      const payment = await stripe1.paymentIntents.cancel(paymentIntentId);
      // if (payment) {
      //   router.push("/eco2/shops/order_cancel");
      // }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    stripe.confirmPayNowPayment(clientSecret).then(async (res) => {
      // console.log("res =====>", res)
      if (res.paymentIntent.status === "succeeded") {
        var purchasedData = [];
        orderData.map((v) => {
          var obj1 = {};
          var filterBrand = brandList.filter((b) => b.name === v.brandName);
          obj1["brandID"] = filterBrand[0].id;
          obj1["selectedCollectionLocationID"] =
            v.addressId == 0 || v.addressId == null ? null : v.addressId;
          var productData = [];
          v.shopCartDisplayProductDtos.map((p) => {
            var obj2 = {};
            if (p.productCheck == true) {
              obj2["productID"] = p.productID;
              obj2["quantity"] = p.quantity;
              obj2["gcRedeemed"] = p.isGCused == true ? p.GCAmount : 0;
              obj2["discountAmount"] =
                p.isGCused == true ? p.GCAmount / 100 : 0;
              productData.push(obj2);
            }
          });
          obj1["purchasedProductDtos"] = productData;
          purchasedData.push(obj1);
        });
        var obj = {
          accountItemId: userInfo.userId,
          paymentTransactionID: res.paymentIntent.id,
          purchasedBrandDtos: purchasedData,
        };
        EShopController.createTransaction(obj, (data) => {
          if (data.accountItemID != null || data.accountItemID != 0) {
            toast.success("Payment Successfully!", {
              position: "top-right",
              onClose: () => {
                router.push("/eco2/shops/order_success");
              },
            });
            deleteLocalStorage("orderData");
            deleteLocalStorage("totalAmount");
          } else {
            toast.error(
              "Payment Successfully! Transaction saving process doesn't succeed!",
              {
                position: "top-right",
                onClose: () => {
                  router.push("/eco2/shops/order_cancel");
                },
              }
            );
          }
        });
      } else {
        const stripe1 = require("stripe")(StripeApiKey.STRIPE_SECRET_KEY);
        // The user closed the modal, cancelling payment
        const payment = await stripe1.paymentIntents.cancel(paymentIntentId);
        if (payment) {
          router.push("/eco2/shops/order_cancel");
        }
      }
    });

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
      <ToastContainer />
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
