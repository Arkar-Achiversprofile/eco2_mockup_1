"use client";
import React from "react";
import styles from "../shops.module.css";
import Image from "next/image";
import { image } from "@/app/assets";
import { color } from "@/app/components/color";
import { useMediaQuery } from "react-responsive";
import ShopNavBar from "@/app/components/ShopNavBar";
import { useRouter } from "next/navigation";

export default function ProductDetail() {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width: 500px) and (max-width: 1050px)",
  });

  return (
    <div>
      <ShopNavBar name="Product Detail" />
      <div className="row mt-5 mb-5">
        <div className="col-10 col-md-5 d-flex justify-content-center justify-content-md-end mx-auto">
          <Image
            alt=""
            className={styles.image}
            src={image.fish}
            width={400}
            height={480}
            //   layout="responsive"
            // onMouseOut={(e) => {
            //   e.target.style.transform = "scale(1)";
            // }}
          />
        </div>
        <div className="col-10 col-md-5 mx-auto d-flex flex-column align-items-center align-items-md-start">
          <div
            style={{
              width: isMobile || isTablet ? 400 : "100%",
              height: 480,
              backgroundColor: color.lightGrey,
              padding: 10,
            }}
          >
            <h5>Locally Farmed Tilapia Fish</h5>
            <p style={{ color: color.grey, marginTop: 20 }}>SGD 6.00</p>
            <hr />
            <p style={{ fontWeight: "bold", fontSize: 12 }}>Descriptions:</p>
            <p style={{ color: color.grey, fontSize: 12 }}>
              300 - 500g Freshly harvested
            </p>
            <p
              style={{
                color: color.skyBlue,
                marginTop: 30,
                textDecoration: "underline",
              }}
            >
              Read More
            </p>
            <ul style={{ fontSize: 12 }}>
              <li>
                {" "}
                Green Currency Limit:{" "}
                <span style={{ fontWeight: "bold" }}>33%</span>
              </li>
              <li>
                {" "}
                Supplier:{" "}
                <span style={{ fontWeight: "bold" }}>Otolith Enrichment</span>
              </li>
              <li>
                {" "}
                In Stock: <span style={{ fontWeight: "bold" }}>Yes</span>
              </li>
            </ul>
            <div
              className="d-flex flex-row"
              style={{ width: "80%", margin: "auto" }}
            >
              <div
                className="d-flex col-6 justify-content-center align-items-center border border-info rounded-start-5 py-1"
                style={{ fontSize: isTablet ? 14 : 16 }}
              >
                QUANTITY 1 <i className="bi bi-caret-down"></i>
              </div>
              <div
                className="d-flex col-6 justify-content-center align-items-center border border-info border-start-0 rounded-end-5 py-1"
                style={{ fontSize: isTablet ? 14 : 16 }}
              >
                Green Currency{" "}
                <div
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: color.orange,
                  }}
                />
              </div>
            </div>
            <div
              class="form-check mt-3"
              style={{
                width: isMobile ? "80%" : isTablet ? "60%" : "50%",
                margin: "0 auto",
              }}
            >
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                class="form-check-label"
                for="flexCheckDefault"
                style={{ fontSize: 10 }}
              >
                Used <span style={{ color: color.green }}>199.79</span> Green
                Currency To Deduct - 33%{" "}
              </label>
            </div>
            <p className="mt-2" style={{ fontSize: 10, textAlign: "center" }}>
              Final Payment Amount:{" "}
              <span style={{ fontWeight: "bold" }}>SGD 4</span>
            </p>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-info"
                style={{ color: color.white, width: "80%" }}
                onClick={() => router.push("/shops/cart")}
              >
                Add Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
