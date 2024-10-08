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
import {
  deleteLocalStorage,
  getLocalStorage,
} from "../../../../api/localStorage";
import AppContext from "../../../../context/AppContext";
import { baseUrl } from "../../../../controller/baseUrl";

export default function CheckoutForm({
  orderData,
  totalAmount,
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
    // return () => {
    //   window.addEventListener('unload', function(event) {
    //     event.returnValue = undefined;
    //   });
    // }
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
    // window.addEventListener("beforeunload", async function (e) {
    //   e.preventDefault();
    //   e.returnValue = "";
    //   const stripe1 = require("stripe")(StripeApiKey.STRIPE_SECRET_KEY);
    //   // The user closed the modal, cancelling payment
    //   const payment = await stripe1.paymentIntents.cancel(paymentIntentId);
    //   // if (payment) {
    //   //   router.push("/eco2/shops/order_cancel");
    //   // }
    // });
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
            const userName = getLocalStorage("userName");
            const email = getLocalStorage("email");
            try {
              fetch(`${baseUrl}/api/Email/send`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;",
                },
                body: JSON.stringify({
                  toEmail: `${email}`,
                  subject: "Thanks for shopping with Eco2 eShop!",
                  body: `<html><body><h4>Dear <b>${userName}</b>,</h4>
                          <p>You have purchased the following item/s from us. Your payment ID is <b>${
                            res.paymentIntent.id
                          }</b>.</p>
                          <p>Here is a summary of your purchase/s. Supplier/s of the item/s will update you on the status of your purchase/s.</p>
                          <br/>
                          <div>
                          ${orderData
                            .map((brandData, index) => {
                              return `
                                        <div key=${index}>
                                          <h3>Supplier: ${
                                            brandData.brandName
                                          }</h3>
                                          <ul>
                                            ${brandData.shopCartDisplayProductDtos
                                              .map((productData, index1) => {
                                                return `
                                                <li key=${index1}>
                                                  <span>Product Name: ${
                                                    productData.productName
                                                  }</span>
                                                  <ul>
                                                    <li>Quantity: <span>${
                                                      productData.quantity
                                                    }</span></li>
                                                    <li>Unit Price: <span>${
                                                      productData.discountedUnitPrice
                                                        ? productData.discountedUnitPrice
                                                        : productData.unitPrice
                                                    }</span></li>
                                                    <li>SubTotal: <span>${
                                                      productData.discountedUnitPrice
                                                        ? productData.discountedUnitPrice *
                                                          productData.quantity
                                                        : productData.quantity *
                                                          productData.unitPrice
                                                    }</span></li>
                                                    ${
                                                      productData.isGCused
                                                        ? `
                                                      <li>GC Redeemed: <span>${
                                                        productData.GCAmount
                                                      }</span></li>
                                                      <li>Discount Amount: <span>${
                                                        productData.GCAmount /
                                                        100
                                                      }</span></li>
                                                  `
                                                        : ""
                                                    }
                                                    <li>Net Payable: <span>${
                                                      productData.isGCused
                                                        ? (productData.discountedUnitPrice
                                                            ? productData.discountedUnitPrice *
                                                              productData.quantity
                                                            : productData.quantity *
                                                              productData.unitPrice) -
                                                          productData.GCAmount
                                                        : productData.discountedUnitPrice
                                                        ? productData.discountedUnitPrice *
                                                          productData.quantity
                                                        : productData.quantity *
                                                          productData.unitPrice
                                                    }</span></li>
                                                  </ul>
                                              </li>
                                              `;
                                              })
                                              .join("")}
                                          </ul>
                                          <h4>Brand Shipment and Collection Information</h4>
                                          <ul>
                                            <li>Shipment Mode: <span>${
                                              brandData.isDelivery
                                                ? "Delivery"
                                                : "Self Collection"
                                            }</span></li>
                                            ${
                                              brandData.isDelivery == false
                                                ? `
                                              <li>Collection Location: <span>${
                                                brandData.address
                                              }</span></li>
                                              <li>Collection Instruction: <span>${
                                                brandData.collectionLocations.filter(
                                                  (v) =>
                                                    v.id == brandData.addressId
                                                )[0].instructions
                                              }</span></li>
                                            `
                                                : ""
                                            }
                                          </ul>
                                        </div>
                                      `;
                            })
                            .join("")}
                          </div>
                          <h3>Total cost: ${totalAmount}</h3>
                          </body></html>`,
                  isHtml: true,
                }),
              })
                .then(async (response) => {
                  if (response.ok) {
                    return response.text();
                  } else {
                    toast.error("Something went wrong!");
                  }
                })
                .then((response) => {
                  toast.success(response, { position: "top-right" });
                  orderData.map((brandData, i) => {
                    try {
                      fetch(`${baseUrl}/api/Email/send`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json;",
                        },
                        body: JSON.stringify({
                          toEmail: `${brandData.brandEmail}`,
                          subject: "An order has been placed!",
                          body: `<html><body><h4>Dear <b>${
                            brandData.brandName
                          }</b>,</h4>
                                <p>${userName} have purchased the following item/s from you. The payment ID is <b>${
                            res.paymentIntent.id
                          }</b>.</p>
                                <p>Here is a summary of your purchase/s.</p>
                                <br/>
                                <div>
                                
                                              <div>
                                                <ul>
                                                  ${brandData.shopCartDisplayProductDtos
                                                    .map(
                                                      (productData, index1) => {
                                                        return `
                                                      <li key=${index1}>
                                                        <span>Product Name: ${
                                                          productData.productName
                                                        }</span>
                                                        <ul>
                                                          <li>Quantity: <span>${
                                                            productData.quantity
                                                          }</span></li>
                                                          <li>Unit Price: <span>${
                                                            productData.discountedUnitPrice
                                                              ? productData.discountedUnitPrice
                                                              : productData.unitPrice
                                                          }</span></li>
                                                          <li>SubTotal: <span>${
                                                            productData.discountedUnitPrice
                                                              ? productData.discountedUnitPrice *
                                                                productData.quantity
                                                              : productData.quantity *
                                                                productData.unitPrice
                                                          }</span></li>
                                                          ${
                                                            productData.isGCused
                                                              ? `
                                                            <li>GC Redeemed: <span>${
                                                              productData.GCAmount
                                                            }</span></li>
                                                            <li>Discount Amount: <span>${
                                                              productData.GCAmount /
                                                              100
                                                            }</span></li>
                                                        `
                                                              : ""
                                                          }
                                                          <li>Net Payable: <span>${
                                                            productData.isGCused
                                                              ? (productData.discountedUnitPrice
                                                                  ? productData.discountedUnitPrice *
                                                                    productData.quantity
                                                                  : productData.quantity *
                                                                    productData.unitPrice) -
                                                                productData.GCAmount
                                                              : productData.discountedUnitPrice
                                                              ? productData.discountedUnitPrice *
                                                                productData.quantity
                                                              : productData.quantity *
                                                                productData.unitPrice
                                                          }</span></li>
                                                        </ul>
                                                    </li>
                                                    `;
                                                      }
                                                    )
                                                    .join("")}
                                                </ul>
                                                <h4>Brand Shipment and Collection Information</h4>
                                                <ul>
                                                  <li>Shipment Mode: <span>${
                                                    brandData.isDelivery
                                                      ? "Delivery"
                                                      : "Self Collection"
                                                  }</span></li>
                                                  ${
                                                    brandData.isDelivery ==
                                                    false
                                                      ? `
                                                    <li>Collection Location: <span>${
                                                      brandData.address
                                                    }</span></li>
                                                    <li>Collection Instruction: <span>${
                                                      brandData.collectionLocations.filter(
                                                        (v) =>
                                                          v.id ==
                                                          brandData.addressId
                                                      )[0].instructions
                                                    }</span></li>
                                                  `
                                                      : ""
                                                  }
                                                </ul>
                                              </div>
                                </div>
                                </body></html>`,
                          isHtml: true,
                        }),
                      })
                        .then(async (response) => {
                          if (response.ok) {
                            return response.text();
                          } else {
                            toast.error("Something went wrong!");
                          }
                        })
                        .then((res) => {})
                        .catch((err) => console.log("email error =====>", err));
                    } catch (err) {
                      console.error(err);
                      toast.error("Something went wrond!");
                    }
                  });
                })
                .catch((err) => console.log("email error =====>", err));
            } catch (err) {
              console.error(err);
              toast.error("Something went wrong!");
            }
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
