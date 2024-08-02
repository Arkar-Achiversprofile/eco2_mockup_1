"use client";
import ShopNavBar from "../../../components/ShopNavBar";
import { color } from "../../../components/color";
import React, { useContext, useEffect, useState } from "react";
import "./shipping.css";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import AppContext from "../../../context/AppContext";
import { getLocalStorage } from "../../../api/localStorage";

export default function ShippingInfo() {
  // const { orderData, setOrderData, orderTotalAmount } = useContext(AppContext);
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });

  const [deliveryData, setDeliveryData] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  // const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    separateOrderData();
  }, []);

  const separateOrderData = () => {
    let orderData = JSON.parse(getLocalStorage("orderData"));
    // let orderTotalAmount = getLocalStorage("totalAmount");
    var delivery = [];
    var collection = [];
    orderData.length > 0 &&
      orderData.map((v) => {
        if (v.isDelivery) {
          delivery.push(v);
        } else {
          collection.push(v);
        }
      });
    // setTotalAmount(orderTotalAmount);
    setDeliveryData(delivery);
    setCollectionData(collection);
  };

  const onClickCollectionInstruction = (parentIndex, value) => {
    setCollectionData((prevData) =>
      prevData.map((item, index) => {
        return index !== parentIndex
          ? item
          : {
              brandName: item.brandName,
              deliveryFee: item.deliveryFee,
              freeShipping: item.freeShipping,
              collectionLocations: item.collectionLocations,
              shopCartDisplayProductDtos: item.shopCartDisplayProductDtos,
              brandCheck: item.brandCheck,
              isDelivery: item.isDelivery,
              address: item.address,
              addressId: item.addressId,
              collectionInstruction: value,
            };
      })
    );
  };

  return (
    <div>
      <ShopNavBar name="Shipping Info" />
      <div className="my-3">
        <div className="row">
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Name:</p>
            <p>Jerry Lim</p>
          </div>
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Display Name:</p>
            <p>Jerry</p>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Mobile Phone:</p>
            <p>01234241</p>
          </div>
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Postal Code:</p>
            <p>54100</p>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Unit Number:</p>
            <p>02</p>
          </div>
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Street:</p>
            <p>Serangoon avenue 5</p>
          </div>
        </div>

        {deliveryData.length > 0 && (
          <h5
            style={{
              paddingLeft: isMobile ? 20 : 50,
              marginTop: 30,
              textDecoration: "underline",
            }}
          >
            Delivery Charges By Supplier
          </h5>
        )}

        <div style={{ width: "90%", margin: "0 auto" }}>
          {deliveryData.map((d, index) => (
            <div key={index}>
              {d.shopCartDisplayProductDtos.map((p, i) => (
                <p key={i}>{p.productName}</p>
              ))}
              <div className="d-flex flex-row">
                <p
                  style={{
                    width: isMobile ? "50%" : "30%",
                    fontWeight: "bold",
                  }}
                >
                  {d.brandName}:
                </p>
                <p>SGD {d.deliveryFee}</p>
              </div>
            </div>
          ))}
        </div>
        {collectionData.length > 0 && (
          <h5
            style={{
              paddingLeft: isMobile ? 20 : 50,
              marginTop: 30,
              textDecoration: "underline",
            }}
          >
            Self Collected
          </h5>
        )}
        <div style={{ width: "90%", margin: "0 auto" }}>
          {collectionData.map((c, i) => (
            <div key={i}>
              {c.shopCartDisplayProductDtos.map((p, index) => (
                <p key={index}>{p.productName}</p>
              ))}
              <div className="d-flex flex-row">
                <p
                  style={{
                    width: isMobile ? "50%" : "30%",
                    fontWeight: "bold",
                  }}
                >
                  {c.brandName}:
                </p>
                <p>{c.address}</p>
              </div>
              {c.collectionInstruction ? (
                <div>
                  <div
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: color.black,
                    }}
                    onClick={() =>
                      onClickCollectionInstruction(i, !c.collectionInstruction)
                    }
                  >
                    Hide Collection Instruction
                  </div>
                  <p style={{ color: color.red }}>
                    {
                      c.collectionLocations.filter(
                        (cl) => cl.id == c.addressId
                      )[0].instructions
                    }
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: color.black,
                  }}
                  onClick={() =>
                    onClickCollectionInstruction(i, !c.collectionInstruction)
                  }
                >
                  Show Collection Instruction
                </div>
              )}
            </div>
          ))}
        </div>

        {/* <h5 style={{ paddingLeft: isMobile ? 20 : 50, marginTop: 30 }}>
          Delivery Information
        </h5>
        <div
          className="d-flex flex-row justify-content-around align-items-center mt-3"
          style={{ width: "80%", margin: "0 auto" }}
        >
          <div
            className="border border-info"
            onClick={() => onClickPaymentType(0)}
            style={{
              cursor: "pointer",
              width: isMobile ? 80 : 100,
              height: isMobile ? 80 : 100,
              backgroundColor: buttonIndex == 0 ? color.skyBlue : null,
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
                color: buttonIndex == 0 ? color.white : color.skyBlue,
              }}
            >
              Free
            </p>
            <p
              style={{
                fontSize: isMobile ? 8 : 10,
                color: buttonIndex == 0 ? color.white : color.black,
              }}
            >
              Self Collection
            </p>
          </div>
          <div
            style={{
              width: isMobile ? 20 : 50,
              height: 1,
              backgroundColor: color.grey,
            }}
          />
          <div
            className="border border-info"
            onClick={() => onClickPaymentType(1)}
            style={{
              cursor: "pointer",
              width: isMobile ? 80 : 100,
              height: isMobile ? 80 : 100,
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
              SGD 30
            </p>
            <p
              style={{
                fontSize: isMobile ? 8 : 10,
                color: buttonIndex == 1 ? color.white : color.black,
              }}
            >
              Delivery
            </p>
          </div>
          <div
            style={{
              width: isMobile ? 20 : 50,
              height: 1,
              backgroundColor: color.grey,
            }}
          />
          <div
            className="border border-info"
            onClick={() => onClickPaymentType(2)}
            style={{
              cursor: "pointer",
              width: isMobile ? 80 : 100,
              height: isMobile ? 80 : 100,
              backgroundColor: buttonIndex == 2 ? color.skyBlue : null,
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
                color: buttonIndex == 2 ? color.white : color.skyBlue,
              }}
            >
              Other
            </p>
            <p
              style={{
                fontSize: isMobile ? 8 : 10,
                color: buttonIndex == 2 ? color.white : color.black,
              }}
            >
              If any other option
            </p>
          </div>
        </div> */}

        <div className="d-flex flex-row justify-content-center mt-3">
          <button
            type="button"
            class="btn btn-info"
            style={{
              color: color.white,
              fontSize: 16,
              padding: isMobile ? "5px 30px" : "5px 40px",
              marginRight: 20,
            }}
            onClick={() => router.back()}
          >
            Back
          </button>
          <button
            type="button"
            class="btn btn-info"
            style={{
              color: color.white,
              fontSize: 16,
              padding: isMobile ? "5px 30px" : "5px 40px",
            }}
            onClick={() => router.push("/eco2/shops/payment")}
          >
            Payment
          </button>
        </div>
      </div>
    </div>
  );
}
