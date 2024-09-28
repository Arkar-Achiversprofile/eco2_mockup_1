/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "../shops.module.css";
import Image from "next/image";
import { image } from "../../../assets";
import { color } from "../../../components/color";
import ShopNavBar from "../../../components/ShopNavBar";
import { useRouter, useSearchParams } from "next/navigation";
import { EShopController } from "../../../controller";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../../context/AppContext";
import { baseUrl } from "../../../controller/baseUrl";
import ReactStarsRating from "react-awesome-stars-rating";

export default function ProductDetail() {
  const { contextBreadCrumb, isMobile, isTablet, userInfo } =
    useContext(AppContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const [productDetailData, setProductDetailData] = useState({});
  const [quantityCount, setQuantityCount] = useState(1);
  const [quantityClick, setQuantityClick] = useState(false);

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = () => {
    EShopController.getProductDetail(productId, (data) => {
      if (data.id) {
        setProductDetailData(data);
      } else {
        toast.error("Something went wrong! Please contact admin!", {
          position: "top-right",
        });
      }
    });
  };

  const onClickAddToCart = () => {
    var obj = {};
    obj["accountItemID"] = userInfo.userId;
    obj["productID"] = productDetailData.id;
    obj["quantity"] = quantityCount;
    EShopController.addToCart(obj, (data) => {
      if (data.accountItemID) {
        toast.success("Add to cart successful!", {
          position: "top-right",
          // onClose: () => {
          //   router.push("/eco2/shops/cart");
          // },
        });
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
        });
      }
    });
  };

  // {
  //   "id": 1,
  //   "imageUrl": "https://ecoAPIt.achieversprofile.com/images/Shop/product/Tilapia.png",
  //   "name": "Tilapia",
  //   "description": "Locally Bred Fish",
  //   "unitPrice": 6,
  //   "brandName": "OtoTesting",
  //   "maxDiscountValue": 2,
  //   "maxGreenCredit": 200,
  //   "inStock": true
  // }

  return (
    <div style={{ backgroundColor: color.lightGrey }}>
      <ToastContainer />
      <ShopNavBar name="Product Detail" />
      <nav aria-label="breadcrumb" style={{ marginLeft: 30, marginTop: 20 }}>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a
              style={{
                textDecoration: "none",
                fontSize: 22,
                // cursor: "pointer",
              }}
              // onClick={() => {

              // }}
            >
              eShop
            </a>
          </li>
          {contextBreadCrumb.map((breadData, index) =>
            index == contextBreadCrumb.length - 1 ? (
              <li
                key={index}
                class="breadcrumb-item active"
                aria-current="page"
                style={{ fontSize: 22 }}
                // onClick={() => {
                //   onClickBreadCrumb(breadData.id, breadData.name)
                // }}
              >
                {breadData.name}
              </li>
            ) : (
              <li
                key={index}
                class="breadcrumb-item"
                aria-current="page"
                style={{ fontSize: 22 }}
                // onClick={() => {
                //   onClickBreadCrumb(breadData.id, breadData.name);
                // }}
              >
                {breadData.name}
              </li>
            )
          )}
        </ol>
      </nav>
      <div className="row mt-3 mb-5">
        <div className="col-11 col-md-5 d-flex justify-content-center justify-content-md-end mx-auto">
          <Image
            alt=""
            className={styles.image}
            src={baseUrl + productDetailData?.imageUrl}
            width={isMobile ? 350 : isTablet ? 400 : 450}
            height={isMobile ? 450 : isTablet ? 450 : 500}
            //   layout="responsive"
            // onMouseOut={(e) => {
            //   e.target.style.transform = "scale(1)";
            // }}
          />
        </div>
        <div className="col-11 col-md-5 mx-auto d-flex flex-column align-items-center align-items-md-start">
          <div
            style={{
              width: isMobile ? 350 : isTablet ? 400 : "100%",
              height: 550,
              backgroundColor: color.lightGrey,
              padding: 10,
            }}
          >
            <h5>{productDetailData?.name}</h5>
            <p style={{ color: color.grey, marginTop: 20, fontSize: 18 }}>
              Unit Price SGD ${productDetailData?.unitPrice}
            </p>
            {productDetailData?.discountedUnitPrice ? (
              <p style={{ color: color.red, fontSize: 18 }}>
                Discount Price SGD ${productDetailData?.discountedUnitPrice}
              </p>
            ) : null}

            <hr />
            <p style={{ fontWeight: "bold", fontSize: 16 }}>Descriptions:</p>
            <p style={{ color: color.grey, fontSize: 16 }}>
              {productDetailData?.description}
            </p>
            <p
              style={{
                color: color.skyBlue,
                marginTop: 30,
                textDecoration: "underline",
                fontSize: 18,
              }}
            >
              Read More
            </p>
            <ul style={{ fontSize: 14 }}>
              <li>
                {" "}
                Green Currency Limit:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {productDetailData?.maxGreenCredit}
                </span>
              </li>
              <li>
                {" "}
                Supplier:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {productDetailData?.brandName}
                </span>
              </li>
              <li>
                {" "}
                In Stock:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {productDetailData?.inStock ? "Yes" : "No"}
                </span>
              </li>
            </ul>
            <div
              // className="d-flex flex-row"
              style={{ width: "80%", margin: "auto" }}
            >
              <div
                className="d-flex justify-content-center align-items-center border border-info rounded-5 py-1"
                style={{ fontSize: isTablet ? 14 : 16, cursor: "pointer" }}
                onClick={() => setQuantityClick(!quantityClick)}
              >
                QUANTITY {quantityCount}{" "}
                {quantityClick ? (
                  <i className="bi bi-caret-up" />
                ) : (
                  <i className="bi bi-caret-down" />
                )}
              </div>
              {quantityClick ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-info"
                    style={{ color: color.white }}
                    onClick={() => {
                      if (quantityCount > 1) {
                        setQuantityCount(quantityCount - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <p>{quantityCount}</p>
                  <button
                    type="button"
                    className="btn btn-info"
                    style={{ color: color.white }}
                    onClick={() => {
                      setQuantityCount(quantityCount + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              ) : null}
              {/* <div
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
              </div> */}
            </div>
            {/* <div
              class="form-check mt-3"
              style={{
                width: isMobile ? "80%" : "60%",
                margin: "0 auto",
              }}
            >
              <input
                class="form-check-input"
                type="checkbox"
                value={GC}
                id="flexCheckDefault"
                onChange={() => onChangeGC(!GC)}
              />
              <label
                class="form-check-label"
                for="flexCheckDefault"
                style={{ fontSize: 12 }}
              >
                Used <span style={{ color: color.green }}>200</span> Green
                Currency To Deduct - $2{" "}
              </label>
            </div> */}
            {/* <input
              class="form-control"
              type="text"
              placeholder="Green Currency"
              aria-label="default input example"
              value={GC}
              onChange={(v) => onChangeGC(v.target.value)}
              style={{
                width: isMobile ? "80%" : "60%",
                margin: "5px auto",
                height: 30,
                fontSize: 12,
              }}
            ></input> */}
            {/* <p className="mt-2" style={{ fontSize: 12, textAlign: "center" }}>
              Final Payment Amount:{" "}
              <span style={{ fontWeight: "bold" }}>SGD {productCost}</span>
            </p> */}
            <div className="d-flex justify-content-center mt-3">
              <button
                type="button"
                class="btn btn-info"
                style={{ color: color.white, width: "80%" }}
                onClick={() => {
                  if (productDetailData?.inStock) {
                    onClickAddToCart();
                  } else {
                    toast.warn("This product is not available now!", {
                      position: "top-right",
                    });
                  }
                }}
              >
                Add Cart
              </button>
            </div>
          </div>
        </div>
        {productDetailData?.reviews?.length > 0 ? (
          <div style={{ width: "100%", paddingLeft: isMobile ? 20 : 100 }}>
            <h4>Customer Reviews</h4>
            {productDetailData?.reviews?.map((value, index) => (
              <div key={index} style={{ width: isMobile ? "100%" : "60%" }}>
                <div style={{ marginTop: 20 }}>
                  <ReactStarsRating
                    value={value.rating}
                    size={25}
                    starGap={10}
                    isHalf={false}
                  />
                </div>
                <p style={{ fontSize: isMobile ? 14 : 16 }}>{value.review}</p>
                {index == productDetailData?.reviews?.length - 1 ? null : (
                  <hr />
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
