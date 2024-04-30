"use client";
import { image } from "@/app/assets";
import ShopNavBar from "@/app/components/ShopNavBar";
import { color } from "@/app/components/color";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Cart() {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 770px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 770px) and (max-width: 1050px)",
  });

  const [product1, setProduct1] = useState(true);
  const [product2, setProduct2] = useState(true);
  const [product3, setProduct3] = useState(true);

  const onClickCheckbox = (id) => {
    if (id == 1) {
      setProduct1(!product1);
    } else if (id == 2) {
      setProduct2(!product2);
    } else {
      setProduct3(!product3);
    }
  };

  return (
    <div style={{ backgroundColor: color.lightGrey, paddingBottom: 50 }}>
      <ShopNavBar name="Shopping Cart" />
      <div className="mt-5">
        <div className="col-11 col-md-6  mx-auto">
          <div style={{ marginBottom: 20 }}>
            <div class="form-check" style={{ marginBottom: 10 }}>
              <input
                class="form-check-input"
                type="checkbox"
                checked={product1}
                onClick={() => onClickCheckbox(1)}
                id="flexCheckDefault"
                style={{ fontSize: 18, marginRight: isMobile ? 10 : 30 }}
              />
              <label
                class="form-check-label"
                for="flexCheckDefault"
                style={{ fontSize: isMobile ? 18 : 20, fontWeight: "bold" }}
              >
                Otolith Enrichment
              </label>
            </div>
            <div className="d-flex justify-content-center justify-content-md-end" style={{marginBottom: 10}}>
              <div class="form-check col-1">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={product1}
                  onClick={() => onClickCheckbox(1)}
                  id="flexCheckDefault"
                  style={{ fontSize: 18 }}
                />
              </div>
              <div className="col-3">
                <Image
                  alt=""
                  width={180}
                  height={140}
                  layout="responsive"
                  src={image.fish}
                />
              </div>
              <div className="col-8">
                <div className="px-2">
                  {isMobile || isTablet ? <h6>Fish</h6> : <h5>Fish</h5>}

                  <div className="d-flex flex-row justify-content-between">
                    <p
                      style={{
                        color: color.grey,
                        fontSize: isMobile ? 10 : 16,
                      }}
                    >
                      QUANTITY: 1
                    </p>
                    <p
                      style={{
                        color: color.green,
                        fontSize: isMobile ? 10 : 14,
                      }}
                    >
                      Green Currency: 199.79
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                      <p
                        style={{
                          color: color.grey,
                          fontSize: isMobile ? 10 : 16,
                        }}
                      >
                        Color:{" "}
                      </p>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: color.orange,
                          marginTop: 5,
                          marginLeft: 10,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: isMobile ? 10 : 14,
                      }}
                    >
                      SGD: 4
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    style={{
                      color: color.white,
                      marginTop: isMobile ? -10 : 10,
                      fontSize: isMobile ? 8 : 16,
                    }}
                    // onClick={() => router.push("/shops/cart")}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center justify-content-md-end">
              <div class="form-check col-1">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={product1}
                  onClick={() => onClickCheckbox(1)}
                  id="flexCheckDefault"
                  style={{ fontSize: 18 }}
                />
              </div>
              <div className="col-3">
                <Image
                  alt=""
                  width={180}
                  height={140}
                  layout="responsive"
                  src={image.fragrantRed}
                />
              </div>
              <div className="col-8">
                <div className="px-2">
                  {isMobile || isTablet ? <h6>Fragrant Red Basil 60g</h6> : <h5>Fragrant Red Basil 60g</h5>}

                  <div className="d-flex flex-row justify-content-between">
                    <p
                      style={{
                        color: color.grey,
                        fontSize: isMobile ? 10 : 16,
                      }}
                    >
                      QUANTITY: 1
                    </p>
                    <p
                      style={{
                        color: color.green,
                        fontSize: isMobile ? 10 : 14,
                      }}
                    >
                      Green Currency: 0
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                      <p
                        style={{
                          color: color.grey,
                          fontSize: isMobile ? 10 : 16,
                        }}
                      >
                        Color:{" "}
                      </p>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: color.orange,
                          marginTop: 5,
                          marginLeft: 10,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: isMobile ? 10 : 14,
                      }}
                    >
                      SGD: 4
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    style={{
                      color: color.white,
                      marginTop: isMobile ? -10 : 10,
                      fontSize: isMobile ? 8 : 16,
                    }}
                    // onClick={() => router.push("/shops/cart")}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div style={{ marginBottom: 20 }}>
            <div class="form-check" style={{ marginBottom: 10 }}>
              <input
                class="form-check-input"
                type="checkbox"
                checked={product2}
                onClick={() => onClickCheckbox(2)}
                id="flexCheckDefault"
                style={{ fontSize: 18, marginRight: isMobile ? 10 : 30 }}
              />
              <label
                class="form-check-label"
                for="flexCheckDefault"
                style={{ fontSize: isMobile ? 18 : 20, fontWeight: "bold" }}
              >
                Mushroom Buddies
              </label>
            </div>
            <div className="d-flex justify-content-center justify-content-md-end">
              <div class="form-check col-1">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={product2}
                  onClick={() => onClickCheckbox(2)}
                  id="flexCheckDefault"
                  style={{ fontSize: 18 }}
                />
              </div>
              <div className="col-3">
                <Image
                  alt=""
                  width={180}
                  height={140}
                  layout="responsive"
                  src={image.mushroom}
                />
              </div>
              <div className="col-8">
                <div className="px-2">
                  {isMobile || isTablet ? (
                    <h6>Pearl Oyster Mushroom</h6>
                  ) : (
                    <h5>Pearl Oyster Mushroom</h5>
                  )}

                  <div className="d-flex flex-row justify-content-between">
                    <p
                      style={{
                        color: color.grey,
                        fontSize: isMobile ? 10 : 16,
                      }}
                    >
                      QUANTITY: 1
                    </p>
                    <p
                      style={{
                        color: color.green,
                        fontSize: isMobile ? 10 : 14,
                      }}
                    >
                      Green Currency: 0
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                      <p
                        style={{
                          color: color.grey,
                          fontSize: isMobile ? 10 : 16,
                        }}
                      >
                        Color:{" "}
                      </p>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: color.orange,
                          marginTop: 5,
                          marginLeft: 10,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: isMobile ? 10 : 14,
                      }}
                    >
                      SGD: 4.5
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    style={{
                      color: color.white,
                      marginTop: isMobile ? -10 : 10,
                      fontSize: isMobile ? 8 : 16,
                    }}
                    // onClick={() => router.push("/shops/cart")}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div style={{ marginBottom: 20 }}>
            <div class="form-check" style={{ marginBottom: 10 }}>
              <input
                class="form-check-input"
                type="checkbox"
                checked={product3}
                onClick={() => onClickCheckbox(3)}
                id="flexCheckDefault"
                style={{ fontSize: 18, marginRight: isMobile ? 10 : 30 }}
              />
              <label
                class="form-check-label"
                for="flexCheckDefault"
                style={{ fontSize: isMobile ? 18 : 20, fontWeight: "bold" }}
              >
                The Good Kombucha
              </label>
            </div>
            <div className="d-flex justify-content-center justify-content-md-end">
              <div class="form-check col-1">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={product3}
                  onClick={() => onClickCheckbox(3)}
                  id="flexCheckDefault"
                  style={{ fontSize: 18 }}
                />
              </div>
              <div className="col-3">
                <Image
                  alt=""
                  width={180}
                  height={140}
                  layout="responsive"
                  src={image.kombucha}
                />
              </div>
              <div className="col-8">
                <div className="px-2">
                  {isMobile || isTablet ? (
                    <h6 style={{ fontSize: 12 }}>
                      The Food Kombucha Small Gift Pack (4 x 375ml)
                    </h6>
                  ) : (
                    <h5>The Food Kombucha Small Gift Pack (4 x 375ml)</h5>
                  )}

                  <div className="d-flex flex-row justify-content-between">
                    <p
                      style={{
                        color: color.grey,
                        fontSize: isMobile ? 10 : 16,
                      }}
                    >
                      QUANTITY: 1
                    </p>
                    <p
                      style={{
                        color: color.green,
                        fontSize: isMobile ? 10 : 14,
                      }}
                    >
                      Green Currency: 0
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                      <p
                        style={{
                          color: color.grey,
                          fontSize: isMobile ? 10 : 16,
                        }}
                      >
                        Color:{" "}
                      </p>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: color.orange,
                          marginTop: 5,
                          marginLeft: 10,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: isMobile ? 10 : 14,
                      }}
                    >
                      SGD: 34
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    style={{
                      color: color.white,
                      marginTop: isMobile ? -10 : 10,
                      fontSize: isMobile ? 8 : 16,
                    }}
                    // onClick={() => router.push("/shops/cart")}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="col-11 col-md-6 mx-auto d-flex flex-column align-items-center align-items-md-start">
          <div className="col-12 d-flex flex-row justify-content-between">
            <p>Subtotal:</p>
            <p>SGD: 46.5</p>
          </div>
          <hr className="col-12" />
          <div className="col-12 d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-info"
              style={{
                color: color.white,
                width: "80%",
                fontSize: 18,
                marginTop: isMobile ? 10 : 30,
              }}
              onClick={() => router.push("/shops/shipping")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
