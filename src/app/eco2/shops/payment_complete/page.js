"use client";
import React from "react";
import ShopNavBar from "../../../components/ShopNavBar";
import { color } from "../../../components/color";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

export default function PaymentComplete() {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  return (
    <div>
      <ShopNavBar name="Payment Completion" />
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100%", marginTop: 50}}
      >
        <p style={{ fontSize: 22, fontWeight: "bold" }}>
          Your payment is completed. Do you want to shop more items?
        </p>
        <div
          className="d-flex flex-row justify-content-evenly align-items-center"
          style={{ width: isMobile ? "90%" : "40%" }}
        >
          <button
            className="btn btn-info"
            style={{ color: color.white, width: 120 }}
            onClick={() => router.push("/")}
          >
            Home
          </button>
          <button
            className="btn btn-info"
            style={{ color: color.white, width: 120 }}
            onClick={() => router.push("/eco2/shops")}
          >
            Shop
          </button>
        </div>
      </div>
    </div>
  );
}
