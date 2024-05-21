"use client";
import { image } from "../../../assets";
import ShopNavBar from "../../../components/ShopNavBar";
import { color } from "../../../components/color";
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

  const [radioCheck1, setRadioCheck1] = useState(0);
  const [radioCheck2, setRadioCheck2] = useState(0);
  const [radioCheck3, setRadioCheck3] = useState(0);

  const [address1, setAddress1] = useState(0);
  const [address2, setAddress2] = useState(0);
  const [address3, setAddress3] = useState(0);

  const onClickCheckbox = (id) => {
    if (id == 1) {
      setProduct1(!product1);
    } else if (id == 2) {
      setProduct2(!product2);
    } else {
      setProduct3(!product3);
    }
  };

  const onClickRadioShipping1 = (v) => {
    setRadioCheck1(v);
  };
  const onClickRadioShipping2 = (v) => {
    setRadioCheck2(v);
  };
  const onClickRadioShipping3 = (v) => {
    setRadioCheck3(v);
  };

  const onClickAddress1 = (v) => {
    setAddress1(v);
  };
  const onClickAddress2 = (v) => {
    setAddress2(v);
  };
  const onClickAddress3 = (v) => {
    setAddress3(v);
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
            <div
              className="d-flex justify-content-center justify-content-md-end"
              style={{ marginBottom: 10 }}
            >
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
                      Green Currency: 200
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
                    // onClick={() => router.push("/eco2/cart")}
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
                  {isMobile || isTablet ? (
                    <h6>Fragrant Red Basil 60g</h6>
                  ) : (
                    <h5>Fragrant Red Basil 60g</h5>
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
                    // onClick={() => router.push("/eco2/cart")}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <h5>Shipping Info</h5>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  onClick={() => onClickRadioShipping1(0)}
                  checked={radioCheck1 == 0 ? true : false}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Delivery: $15 (Singapore Only)
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked={radioCheck1 == 1 ? true : false}
                  onClick={() => onClickRadioShipping1(1)}
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Self Collection
                </label>
                {radioCheck1 == 1 && (
                  <div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        checked={address1 == 0 ? true : false}
                        onClick={() => onClickAddress1(0)}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        XXX, YYY (S) 123456
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked={address1 == 1 ? true : false}
                        onClick={() => onClickAddress1(1)}
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        AAA, BBB (S) 987654
                      </label>
                    </div>
                  </div>
                )}
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
                    // onClick={() => router.push("/eco2/cart")}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <h5>Shipping Info</h5>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault1"
                  id="flexRadioDefault3"
                  onClick={() => onClickRadioShipping2(0)}
                  checked={radioCheck2 == 0 ? true : false}
                />
                <label class="form-check-label" for="flexRadioDefault3">
                  Delivery: $15 (Singapore Only)
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault1"
                  id="flexRadioDefault4"
                  checked={radioCheck2 == 1 ? true : false}
                  onClick={() => onClickRadioShipping2(1)}
                />
                <label class="form-check-label" for="flexRadioDefault4">
                  Self Collection
                </label>
                {radioCheck2 == 1 && (
                  <div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault1"
                        checked={address2 == 0 ? true : false}
                        onClick={() => onClickAddress2(0)}
                      />
                      <label class="form-check-label" for="flexCheckDefault1">
                        XXX, YYY (S) 123456
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked1"
                        checked={address2 == 1 ? true : false}
                        onClick={() => onClickAddress2(1)}
                      />
                      <label class="form-check-label" for="flexCheckChecked1">
                        AAA, BBB (S) 987654
                      </label>
                    </div>
                  </div>
                )}
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
                    // onClick={() => router.push("/eco2/cart")}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <h5>Shipping Info</h5>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault2"
                  id="flexRadioDefault5"
                  onClick={() => onClickRadioShipping3(0)}
                  checked={radioCheck3 == 0 ? true : false}
                />
                <label class="form-check-label" for="flexRadioDefault5">
                  Delivery: $15 (Singapore Only)
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault2"
                  id="flexRadioDefault6"
                  checked={radioCheck3 == 1 ? true : false}
                  onClick={() => onClickRadioShipping3(1)}
                />
                <label class="form-check-label" for="flexRadioDefault6">
                  Self Collection
                </label>
                {radioCheck3 == 1 && (
                  <div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault2"
                        checked={address3 == 0 ? true : false}
                        onClick={() => onClickAddress3(0)}
                      />
                      <label class="form-check-label" for="flexCheckDefault2">
                        XXX, YYY (S) 123456
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked2"
                        checked={address3 == 1 ? true : false}
                        onClick={() => onClickAddress3(1)}
                      />
                      <label class="form-check-label" for="flexCheckChecked2">
                        AAA, BBB (S) 987654
                      </label>
                    </div>
                  </div>
                )}
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
              onClick={() => router.push("/eco2/shops/shipping")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
