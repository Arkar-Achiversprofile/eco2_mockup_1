"use client";
import { image } from "../../../assets";
import ShopNavBar from "../../../components/ShopNavBar";
import { color } from "../../../components/color";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { StripeApiKey } from "../../../api/StripeApiKey";
import { stripe } from "../../../api/stripe-paymentintent";
import { getLocalStorage } from "../../../api/localStorage";

export default function Payment() {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const [total, setTotal] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const [reStructureData, setReStructureData] = useState([]);
  // const [buttonIndex, setButtonIndex] = useState(1);

  useEffect(() => {
    getOrderData()
  }, [])

  const getOrderData = () => {
    let orderData = JSON.parse(getLocalStorage("orderData"))
    let orderTotalAmount = getLocalStorage("totalAmount");
    var array = [];
    orderData.map((a) => {
      a.shopCartDisplayProductDtos.map((b) => {
        if (b.isGCused) {
          array.push(b);
        }
      });
    });
    setReStructureData(array);
    setOrderData(orderData);
    setTotal(orderTotalAmount);
  }

  const GCAmountTotal =  function (arr) {
      return arr.reduce((sum, i) => {
        return sum + i.GCAmount;
      }, 0);
  }

  // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  //   apiVersion: '2024-04-10',
  //   appInfo: { // For sample support and debugging, not required for production:
  //     name: "stripe-samples/<your-sample-name>",
  //     version: "0.0.1",
  //     url: "https://github.com/stripe-samples"

  //   }
  // });

  // useEffect(() => {
  //   fetch("http://localhost:4242/config").then(async (r) => {
  //     const { publishableKey } = await r.json();
  //     setStripePromise(loadStripe(publishableKey));
  //   });
  // }, []);

  const onClickPaymentType = async (index) => {
    if (index == 0) {
      router.push("/eco2/shops/card_payment");
    } else {
      // Set your secret key. Remember to switch to your live secret key in production.
      // See your keys here: https://dashboard.stripe.com/apikeys

      const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ["paynow"],
        payment_method_data: {
          type: "paynow",
        },
        amount: 400,
        currency: "sgd",
      });
      router.push(
        "/eco2/shops/paynowpaylah" +
          "?" +
          createQueryString("clientSecret", paymentIntent.client_secret) +
          "&" +
          createQueryString("paymentIntentId", paymentIntent.id)
      );
    }
  };

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const onClickContinue = async () => {
    router.push("/eco2/shops/order_success")
  };
  return (
    <div>
      <ShopNavBar name="Payment" />
      <div className="col-11 col-md-6 mx-auto mt-5">
        <h5>Order Summary</h5>
        <div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <p style={{ color: color.grey }}>Green Currency Deductible
</p>
          <p style={{ fontWeight: "bold" }}>{GCAmountTotal(reStructureData)}</p>
        </div>
        <div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p style={{ color: color.grey }}>Amount Payable</p>
          <p style={{ fontWeight: "bold" }}>SGD {total}</p>
        </div>
        {/* <div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p style={{ color: color.grey }}>Shipping Fees</p>
          <p style={{ fontWeight: "bold" }}>SGD 0</p>
        </div>
        <div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p style={{ color: color.grey }}>Shipping Method</p>
          <p style={{ fontWeight: "bold" }}>Self Collection</p>
        </div> */}
      </div>
      <hr style={{ width: "90%", margin: "10px auto" }} />

      <div className="col-11 col-md-6 mx-auto my-4">
        {total == 0 || total == "0" ? (
          <div className="d-flex mt-5" style={{ width: "70%" }}>
            <button
              type="button"
              class="btn btn-info"
              style={{
                color: color.white,
                fontSize: 16,
                padding: isMobile ? "5px 30px" : "5px 40px",
              }}
              onClick={() => onClickContinue()}
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            <h6>We accept</h6>
            <div
              className="d-flex flex-row mt-3"
              style={{ height: 40, alignItems: "center" }}
            >
              <div
                className="border border-info"
                onClick={() => onClickPaymentType(0)}
                style={{
                  width: isMobile ? 200 : 250,
                  padding: "0 10px",
                  height: 40,
                  cursor: "pointer",
                  backgroundColor: color.skyBlue,
                  // backgroundColor: buttonIndex == 0 ? color.skyBlue : null,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: isMobile ? 12 : 14,
                    color: color.white,
                    // color: buttonIndex == 0 ? color.white : color.skyBlue,
                    // textAlign: 'center'
                  }}
                >
                  Credit / Debit Card Payment
                </span>
              </div>
              <Image alt="" src={image.visaCard} width={50} height={30} />
              <Image alt="" src={image.masterCard} width={50} height={30} />
              {/* <Image alt="" src={image.paypalCard} width={50} height={30} /> */}
              {/* <Image alt="" src={image.paynowCard} width={50} height={30} /> */}
            </div>

            <div
              className="d-flex flex-row mt-3"
              style={{ height: 40, alignItems: "center" }}
            >
              <div
                className="border border-info"
                onClick={() => onClickPaymentType(1)}
                style={{
                  width: isMobile ? 200 : 250,
                  padding: "0 10px",
                  height: 40,
                  cursor: "pointer",
                  backgroundColor: color.skyBlue,
                  // backgroundColor: buttonIndex == 1 ? color.skyBlue : null,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: isMobile ? 12 : 14,
                    color: color.white,
                    // color: buttonIndex == 1 ? color.white : color.skyBlue,
                    // textAlign: 'center'
                  }}
                >
                  PayNow Payment
                </span>
              </div>
              {/* <Image alt="" src={image.visaCard} width={50} height={30} />
          <Image alt="" src={image.masterCard} width={50} height={30} /> */}
              {/* <Image alt="" src={image.paypalCard} width={50} height={30} /> */}
              <Image alt="" src={image.paynowCard} width={70} height={40} />
            </div>
          </>
        )}
        {/* <div
          className="d-flex flex-row justify-content-around align-items-center mt-5"
          style={{ width: "70%" }}
        >
          <div
            className="border border-info"
            onClick={() => onClickPaymentType(0)}
            style={{
              width: isMobile ? 80 : 100,
              height: isMobile ? 80 : 100,
              cursor: "pointer",
              backgroundColor: buttonIndex == 0 ? color.skyBlue : null,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: isMobile ? 12 : 16,
                color: buttonIndex == 0 ? color.white : color.skyBlue,
              }}
            >
              Card
            </p>
          </div>
          <div
            style={{
              width: 50,
              height: 1,
              backgroundColor: color.grey,
            }}
          />
          <div
            className="border border-info"
            onClick={() => onClickPaymentType(1)}
            style={{
              width: isMobile ? 80 : 100,
              height: isMobile ? 80 : 100,
              cursor: "pointer",
              backgroundColor: buttonIndex == 1 ? color.skyBlue : null,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: isMobile ? 12 : 16,
                color: buttonIndex == 1 ? color.white : color.skyBlue,
              }}
            >
              PayNow
            </p>
            <p
              style={{
                fontWeight: "bold",
                fontSize: isMobile ? 12 : 16,
                color: buttonIndex == 1 ? color.white : color.skyBlue,
              }}
            >
              PayLah
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
