/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { image } from "../../../assets";
import ShopNavBar from "../../../components/ShopNavBar";
import { color } from "../../../components/color";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { EShopController } from "../../../controller";
import AppContext from "../../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../../../api/localStorage";

export default function Cart() {
  const { userInfo, GCBalance, setGCBalance } = useContext(AppContext);
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 770px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 770px) and (max-width: 1050px)",
  });

  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  // const [userGCBalance, setUserGCBalance] = useState(815);
  const numbers = Array(50)
    .fill(0)
    .map((_, index) => (index + 1) * 100);
  // console.log("cartData =====>", cartData);
  // console.log("balance =====>", userInfo.greenCurrencyBalance);

  const plusMinusButton = isMobile ? 20 : 25;

  useEffect(() => {
    getCartByUserId(false);
    setGCBalance(userInfo.greenCurrencyBalance);
    // setUserGCBalance(userInfo.greenCurrencyBalance)
  }, [userInfo.userId]);

  useEffect(() => {
    const reStructureData = arrayReStructure();
    const deliveryFee = deliveryFeeTotal();
    // console.log(" reStructureData",reStructureData)
    // console.log("PriceTotal =====>", productPriceTotal(reStructureData))
    setTotalAmount(productPriceTotal(reStructureData) + deliveryFee);
  }, [cartData]);

  const deliveryFeeTotal = () => {
    var filterData = [];
    cartData.map((v) => {
      if (v.brandCheck && v.isDelivery) {
        filterData.push(v);
      } else {
        var obj = { ...v };
        var filterProduct = obj.shopCartDisplayProductDtos.filter((k) => {
          if (k.productCheck) {
            return k;
          }
        });
        if (filterProduct.length > 0) {
          obj.shopCartDisplayProductDtos = filterProduct;
          filterData.push(obj);
        }
      }
    });
    return filterData.reduce((sum, i) => {
      return sum + (i.isDelivery == true ? i.deliveryFee : 0);
    }, 0);
  };

  const arrayReStructure = () => {
    var array = [];
    cartData.map((a) => {
      a.shopCartDisplayProductDtos.map((b) => {
        if (b.productCheck) {
          array.push(b);
        }
      });
    });
    return array;
  };

  var productPriceTotal = function (arr) {
    return arr.reduce((sum, i) => {
      let data =
        i.calculatedPrice != null
          ? i.calculatedPrice
          : i.unitPrice * i.quantity;
      return sum + data;
    }, 0);
  };

  const getCartByUserId = async (update) => {
    EShopController.getCartByUserId(userInfo.userId, (data) => {
      // console.log("eshop data ===>", data);
      if (data.length > 0) {
        var array = [];
        if (update) {
          var oldCartData = [...cartData];
          data.map((v) => {
            var oldBrand =
              oldCartData &&
              oldCartData.filter((b) => b.brandName == v.brandName);
            // console.log("oldbrand ===>", oldBrand)
            var obj = { ...v };
            var secArray = [];
            obj.shopCartDisplayProductDtos.map((j) => {
              var oldProduct =
                oldBrand.length > 0 &&
                oldBrand[0].shopCartDisplayProductDtos.filter(
                  (p) =>
                    p.shopCartItemId == j.shopCartItemId ||
                    p.productID == j.productID
                );
              // console.log("oldProduct ====>", oldProduct);
              var obj1 = { ...j };
              obj1["calculatedPrice"] =
                oldProduct.length > 0 ? oldProduct[0].calculatedPrice : null;
              obj1["productCheck"] =
                oldProduct.length > 0 ? oldProduct[0].productCheck : true;
              obj1["isGCused"] =
                oldProduct.length > 0 ? oldProduct[0].isGCused : false;
              obj1["GCAmount"] =
                oldProduct.length > 0 ? oldProduct[0].GCAmount : 0;
              secArray.push(obj1);
            });
            obj["brandCheck"] =
              oldBrand.length > 0 ? oldBrand[0].brandCheck : true;
            obj["isDelivery"] =
              oldBrand.length > 0 ? oldBrand[0].isDelivery : true;
            obj["address"] = oldBrand.length > 0 ? oldBrand[0].address : "";
            obj["addressId"] =
              oldBrand.length > 0 ? oldBrand[0].addressId : null;
            obj["collectionInstruction"] = false;
            obj.shopCartDisplayProductDtos = secArray;
            array.push(obj);
          });
          setCartData(array);
        } else {
          data.map((v) => {
            var obj = { ...v };
            var secArray = [];
            obj.shopCartDisplayProductDtos.map((j) => {
              var obj1 = { ...j };
              obj1["calculatedPrice"] = null;
              obj1["productCheck"] = true;
              obj1["isGCused"] = false;
              obj1["GCAmount"] = 0;
              secArray.push(obj1);
            });
            obj["brandCheck"] = true;
            obj["isDelivery"] = true;
            obj["address"] = "";
            obj["addressId"] = null;
            obj["collectionInstruction"] = false;
            obj.shopCartDisplayProductDtos = secArray;
            array.push(obj);
          });
          setCartData(array);
        }
      }
    });
  };

  const onClickQuantityChange = (productId, quantity) => {
    const obj = {
      accountItemID: userInfo.userId,
      productID: productId,
      quantity: quantity,
    };
    EShopController.updateQuantityInCart(obj, (data) => {
      getCartByUserId(true);
    });
  };

  const onClickRemove = (cartId) => {
    EShopController.deleteProductInCart(cartId, (data) => {
      // console.log(data);
      getCartByUserId(true);
    });
  };

  const onClickCheckbox = (value, parentIndex) => {
    setCartData((prevData) =>
      prevData.map((item, index) => {
        return index !== parentIndex
          ? item
          : {
              brandName: item.brandName,
              deliveryFee: item.deliveryFee,
              freeShipping: item.freeShipping,
              collectionLocations: item.collectionLocations,
              shopCartDisplayProductDtos: item.shopCartDisplayProductDtos.map(
                (P, indexP) => {
                  return {
                    productID: P.productID,
                    productName: P.productName,
                    productImageUrl: P.productImageUrl,
                    unitPrice: P.unitPrice,
                    calculatedPrice: P.calculatedPrice,
                    isGCused: P.isGCused,
                    quantity: P.quantity,
                    maxDiscountValue: P.maxDiscountValue,
                    maxGreenCredit: P.maxGreenCredit,
                    maxPurchaseNo: P.maxPurchaseNo,
                    GCAmount: P.GCAmount,
                    inStock: P.inStock,
                    shopCartItemId: P.shopCartItemId,
                    productCheck: value,
                  };
                }
              ),
              brandCheck: value,
              isDelivery: item.isDelivery,
              address: item.address,
              addressId: item.addressId,
              collectionInstruction: item.collectionInstruction,
            };
      })
    );
  };

  const onClickChildCheckbox = (value, parentIndex, childIndex) => {
    setCartData((prevData) =>
      prevData.map((item, index) => {
        return index !== parentIndex
          ? item
          : {
              brandName: item.brandName,
              deliveryFee: item.deliveryFee,
              freeShipping: item.freeShipping,
              collectionLocations: item.collectionLocations,
              shopCartDisplayProductDtos: item.shopCartDisplayProductDtos.map(
                (P, indexP) => {
                  return indexP !== childIndex
                    ? P
                    : {
                        productID: P.productID,
                        productName: P.productName,
                        productImageUrl: P.productImageUrl,
                        unitPrice: P.unitPrice,
                        calculatedPrice: P.calculatedPrice,
                        isGCused: P.isGCused,
                        quantity: P.quantity,
                        maxDiscountValue: P.maxDiscountValue,
                        maxGreenCredit: P.maxGreenCredit,
                        maxPurchaseNo: P.maxPurchaseNo,
                        GCAmount: P.GCAmount,
                        inStock: P.inStock,
                        shopCartItemId: P.shopCartItemId,
                        productCheck: value,
                      };
                }
              ),
              brandCheck: value == false ? false : item.brandCheck,
              isDelivery: item.isDelivery,
              address: item.address,
              addressId: item.addressId,
              collectionInstruction: item.collectionInstruction,
            };
      })
    );
  };

  const onClickRadioShipping = (value, parentIndex) => {
    setCartData((prevData) =>
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
              isDelivery: value,
              address: item.address,
              addressId: item.addressId,
              collectionInstruction: item.collectionInstruction,
            };
      })
    );
  };

  const onClickAddress = (value, id, parentIndex) => {
    setCartData((prevData) =>
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
              address: value,
              addressId: id,
              collectionInstruction: item.collectionInstruction,
            };
      })
    );
  };

  const greenCreditCalculate = (productGC, isGCused) => {
    // console.log("greenCredit", productGC, isGCused);
    if (productGC != 0) {
      if (GCBalance >= productGC) {
        return productGC;
      } else {
        if (isGCused) {
          return productGC;
        } else {
          const calculatedGC = [];
          numbers.map((value) => {
            // 550 > 800 - 300
            if (GCBalance >= productGC - value) {
              if (productGC - value > 0) {
                calculatedGC.push(productGC - value);
              }
            }
          });
          // console.log("calculatedGC ===>", calculatedGC);
          return calculatedGC[0];
        }
      }
    } else {
      return 0;
    }
  };

  const onClickGC = (parentIndex, childIndex, value, GCValue) => {
    // console.log(" calculate ", GCValue / 100);
    setCartData((prevData) =>
      prevData.map((item, index) => {
        return index !== parentIndex
          ? item
          : {
              brandName: item.brandName,
              deliveryFee: item.deliveryFee,
              freeShipping: item.freeShipping,
              collectionLocations: item.collectionLocations,
              shopCartDisplayProductDtos: item.shopCartDisplayProductDtos.map(
                (P, indexP) => {
                  return indexP !== childIndex
                    ? P
                    : {
                        productID: P.productID,
                        productName: P.productName,
                        productImageUrl: P.productImageUrl,
                        unitPrice: P.unitPrice,
                        calculatedPrice: value
                          ? P.unitPrice * P.quantity -
                            (P.GCAmount != 0 ? P.GCAmount : GCValue) / 100
                          : P.calculatedPrice +
                            (P.GCAmount != 0 ? P.GCAmount : GCValue) / 100,
                        isGCused: value,
                        GCAmount: value
                          ? P.GCAmount != 0
                            ? P.GCAmount
                            : GCValue
                          : 0,
                        quantity: P.quantity,
                        maxDiscountValue: P.maxDiscountValue,
                        maxGreenCredit: P.maxGreenCredit,
                        maxPurchaseNo: P.maxPurchaseNo,
                        inStock: P.inStock,
                        shopCartItemId: P.shopCartItemId,
                        productCheck: P.productCheck,
                      };
                }
              ),
              brandCheck: item.brandCheck,
              isDelivery: item.isDelivery,
              address: item.address,
              addressId: item.addressId,
              collectionInstruction: item.collectionInstruction,
            };
      })
    );
    if (value) {
      // var newUserInfo = { ...userInfo };
      // newUserInfo.greenCurrencyBalance =
      //   newUserInfo.greenCurrencyBalance - GCValue;
      // setUserInfo(newUserInfo);
      setGCBalance(GCBalance - GCValue);
      // setUserInfo({...userInfo, {greenCurrencyBalance: userInfo.greenCurrencyBalance - GCValue}})
      // setUserGCBalance(userInfo.greenCurrencyBalance - GCValue);
    } else {
      // var newUserInfo = { ...userInfo };
      // newUserInfo.greenCurrencyBalance =
      //   newUserInfo.greenCurrencyBalance + GCValue;
      // setUserInfo(newUserInfo);
      setGCBalance(GCBalance + GCValue);
      // setUserGCBalance(userInfo.greenCurrencyBalance + GCValue);
    }
  };

  const onClickContinue = () => {
    var filterData = [];
    cartData.map((v) => {
      if (v.brandCheck) {
        filterData.push(v);
      } else {
        var obj = { ...v };
        var filterProduct = obj.shopCartDisplayProductDtos.filter((k) => {
          if (k.productCheck) {
            return k;
          }
        });
        if (filterProduct.length > 0) {
          obj.shopCartDisplayProductDtos = filterProduct;
          filterData.push(obj);
        }
      }
    });
    let getData = getLocalStorage("orderData");
    let getData1 = getLocalStorage("totalAmount");
    if (getData && getData1) {
      deleteLocalStorage("orderData");
      deleteLocalStorage("totalAmount");
    }
    setLocalStorage("orderData", JSON.stringify(filterData));
    setLocalStorage("totalAmount", totalAmount);
    // setOrderData(filterData);
    // setOrderTotalAmount(totalAmount);
    router.push("/eco2/shops/shipping");
  };

  return (
    <div style={{ backgroundColor: color.lightGrey, paddingBottom: 50 }}>
      <ToastContainer />
      <ShopNavBar name="Shopping Cart" />
      <div className="mt-5">
        <div className="col-11 col-md-6  mx-auto">
          {cartData.length > 0 &&
            cartData.map((value, index) => (
              <div style={{ marginBottom: 20 }} key={index}>
                <div class="form-check" style={{ marginBottom: 10 }}>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={value.brandCheck}
                    onChange={() => onClickCheckbox(!value.brandCheck, index)}
                    id={`brandCheckbox${index}`}
                    style={{ fontSize: 18, marginRight: isMobile ? 10 : 30 }}
                  />
                  <label
                    class="form-check-label"
                    for={`brandCheckbox${index}`}
                    style={{ fontSize: isMobile ? 18 : 20, fontWeight: "bold" }}
                  >
                    {value.brandName}
                  </label>
                </div>
                {value.shopCartDisplayProductDtos.map((data, index1) => (
                  <div
                    className="d-flex justify-content-center justify-content-md-end"
                    style={{ marginBottom: 10 }}
                    key={index1}
                  >
                    <div class="form-check col-1">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={data.productCheck}
                        onChange={() =>
                          onClickChildCheckbox(
                            !data.productCheck,
                            index,
                            index1
                          )
                        }
                        id={`productCheckbox${index1}`}
                        style={{ fontSize: 18 }}
                      />
                    </div>
                    <div className="col-3">
                      <Image
                        alt=""
                        width={180}
                        height={140}
                        layout="responsive"
                        src={data.productImageUrl}
                      />
                    </div>
                    <div className="col-8">
                      <div className="px-2">
                        {isMobile || isTablet ? (
                          <h6>{data.productName}</h6>
                        ) : (
                          <h5>{data.productName}</h5>
                        )}

                        <div className="d-flex flex-row justify-content-between">
                          <div className="d-flex flex-row justify-content-evenly">
                            <p
                              style={{
                                color: color.grey,
                                fontSize: isMobile ? 10 : 16,
                              }}
                            >
                              QUANTITY:
                            </p>

                            <div
                              style={{
                                color: color.white,
                                backgroundColor: color.orange,
                                width: plusMinusButton,
                                height: plusMinusButton,
                                fontSize: 12,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                                cursor: "pointer",
                                margin: "0px 5px",
                              }}
                              onClick={() => {
                                onClickQuantityChange(
                                  data.productID,
                                  data.quantity + 1
                                );
                              }}
                            >
                              +
                            </div>
                            <p
                              style={{
                                color: color.black,
                                fontSize: isMobile ? 10 : 16,
                              }}
                            >
                              {data.quantity}
                            </p>
                            <div
                              style={{
                                color: color.white,
                                backgroundColor: color.orange,
                                width: plusMinusButton,
                                height: plusMinusButton,
                                fontSize: 12,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                                cursor: "pointer",
                                margin: "0px 5px",
                              }}
                              onClick={() => {
                                if (data.quantity > 1) {
                                  onClickQuantityChange(
                                    data.productID,
                                    data.quantity - 1
                                  );
                                }
                              }}
                            >
                              -
                            </div>
                          </div>

                          {greenCreditCalculate(
                            data.GCAmount != 0
                              ? data.GCAmount
                              : data.maxGreenCredit * data.quantity,
                            data.isGCused
                          ) > 0 ||
                          greenCreditCalculate(
                            data.GCAmount != 0
                              ? data.GCAmount
                              : data.maxGreenCredit * data.quantity,
                            data.isGCused
                          ) != undefined ? (
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={data.isGCused}
                                id={`GC${index1}${data.productName}`}
                                onChange={() =>
                                  onClickGC(
                                    index,
                                    index1,
                                    !data.isGCused,
                                    greenCreditCalculate(
                                      data.GCAmount != 0
                                        ? data.GCAmount
                                        : data.maxGreenCredit * data.quantity,
                                      data.isGCused
                                    )
                                  )
                                }
                              />
                              <label
                                class="form-check-label"
                                for={`GC${index1}${data.productName}`}
                                style={{
                                  color: color.green,
                                  fontSize: isMobile ? 10 : 14,
                                }}
                              >
                                Green Currency:{" "}
                                {greenCreditCalculate(
                                  data.GCAmount != 0
                                    ? data.GCAmount
                                    : data.maxGreenCredit * data.quantity,
                                  data.isGCused
                                )}
                              </label>
                            </div>
                          ) : data.isGCused ||
                            greenCreditCalculate(
                              data.GCAmount != 0
                                ? data.GCAmount
                                : data.maxGreenCredit * data.quantity,
                              data.isGCused
                            ) != undefined ? (
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={data.isGCused}
                                id={`GC${index1}${data.productName}`}
                                onChange={() =>
                                  onClickGC(
                                    index,
                                    index1,
                                    !data.isGCused,
                                    greenCreditCalculate(
                                      data.GCAmount != 0
                                        ? data.GCAmount
                                        : data.maxGreenCredit * data.quantity,
                                      data.isGCused
                                    )
                                  )
                                }
                              />
                              <label
                                class="form-check-label"
                                for={`GC${index1}${data.productName}`}
                                style={{
                                  color: color.green,
                                  fontSize: isMobile ? 10 : 14,
                                }}
                              >
                                Green Currency:{" "}
                                {greenCreditCalculate(
                                  data.GCAmount != 0
                                    ? data.GCAmount
                                    : data.maxGreenCredit * data.quantity,
                                  data.isGCused
                                )}
                              </label>
                            </div>
                          ) : null}
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
                                backgroundColor: color.green,
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
                            SGD:{" "}
                            {data.calculatedPrice != null
                              ? data.calculatedPrice
                              : data.unitPrice * data.quantity}
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
                          // onClick={() => onClickRemove(data.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-3">
                  <h5>Shipping Info</h5>
                  {value.collectionLocations.length > 0 ? (
                    <div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name={`flexRadioDefault${index}`}
                          id={`checkbox${index}`}
                          onClick={() => onClickRadioShipping(true, index)}
                          checked={value.isDelivery ? true : false}
                        />
                        <label
                          class="form-check-label"
                          for={`checkbox${index}`}
                        >
                          Delivery: ${value.deliveryFee} (Singapore Only)
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name={`flexRadioDefault${index}`}
                          id={`checkboxSec${index}`}
                          checked={!value.isDelivery ? true : false}
                          onClick={() => onClickRadioShipping(false, index)}
                        />
                        <label
                          class="form-check-label"
                          for={`checkboxSec${index}`}
                        >
                          Self Collection
                        </label>
                        {!value.isDelivery && (
                          <div>
                            {value.collectionLocations.map(
                              (addData, addIndex) => (
                                <div class="form-check" key={addIndex}>
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id={`flexCheck${addIndex}`}
                                    checked={
                                      value.address == addData.address
                                        ? true
                                        : false
                                    }
                                    onClick={() =>
                                      onClickAddress(
                                        addData.address,
                                        addData.id,
                                        index
                                      )
                                    }
                                  />
                                  <label
                                    class="form-check-label"
                                    for={`flexCheck${addIndex}`}
                                  >
                                    {addData.address}
                                  </label>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>Delivery: ${value.deliveryFee} (Singapore Only)</div>
                  )}
                </div>
                <hr />
              </div>
            ))}
          {cartData.length > 0 && (
            <div>
              <div className="col-12 d-flex flex-row justify-content-between">
                <p>Subtotal:</p>
                <p>SGD: {totalAmount}</p>
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
                  onClick={() => onClickContinue()}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
        {/* <div className="col-11 col-md-6 mx-auto d-flex flex-column align-items-center align-items-md-start"> */}

        {/* </div> */}
      </div>
    </div>
  );
}
