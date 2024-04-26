"use client";
import { image } from "@/app/assets";
import ShopNavBar from "@/app/components/ShopNavBar";
import { color } from "@/app/components/color";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Payment() {
    const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const [buttonIndex, setButtonIndex] = useState(1);

  const onClickPaymentType = (index) => {
    setButtonIndex(index);
  };
  return (
    <div>
      <ShopNavBar name="Payment" />
      <div className="col-11 col-md-5 mx-auto mt-5">
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
          <p style={{ color: color.grey }}>My Total Green Currency</p>
          <p style={{ fontWeight: "bold" }}>1500</p>
        </div>
        <div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p style={{ color: color.grey }}>Cart Amount</p>
          <p style={{ fontWeight: "bold" }}>SGD 4</p>
        </div>
        <div
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
        </div>
      </div>
      <hr style={{ width: "90%", margin: "10px auto" }} />

      <div className="col-11 col-md-5 mx-auto my-4">
        <h6>We accept</h6>
        <div className="d-flex flex-row mt-3">
          <Image alt="" src={image.visaCard} width={40} height={20} />
          <Image alt="" src={image.masterCard} width={40} height={20} />
          <Image alt="" src={image.paypalCard} width={40} height={20} />
          <Image alt="" src={image.paynowCard} width={40} height={20} />
        </div>
        <div
          className="d-flex flex-row justify-content-around align-items-center mt-5"
          style={{ width: "70%",}}
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
              flexDirection: 'column',
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
        </div>
        <div className="d-flex mt-5" style={{width: '70%'}}>
        <button
            type="button"
            class="btn btn-info"
            style={{
              color: color.white,
              fontSize: 16,
              padding: isMobile ? "5px 30px" : "5px 40px",
            }}
            onClick={() => router.push("/shops/paynowpaylah")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
