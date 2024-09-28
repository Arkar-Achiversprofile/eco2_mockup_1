"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../../../../components/NavBar";
import AppContext from "../../../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrandController,
  OrderManagementController,
} from "../../../../controller";
import Pagination from "../../../../components/Pagination";
import { color } from "../../../../components/color";
import { getLocalStorage } from "../../../../api/localStorage";
import moment from "moment";
import { baseUrl } from "../../../../controller/baseUrl";

export default function OrderManagement() {
  const { isMobile, isTablet } = useContext(AppContext);
  const [tab, setTab] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [closedTransaction, setClosedTransaction] = useState([]);
  const [closedCurrentPage, setClosedCurrentPage] = useState(1);
  const [brandList, setBrandList] = useState([]);
  const [selectedBrandId, setSelectBrandId] = useState(0);
  const [selectedClosedBrandId, setSelectClosedBrandId] = useState(0);
  const pageSize = 10;
  console.log("detail == >", transactionDetail);

  useEffect(() => {
    getBrand();
    setSelectClosedBrandId(0);
    setSelectBrandId(0);
  }, [tab]);

  const onClickTabs = (value) => {
    if (value == 1) {
      getAllActiveTransaction();
    } else if (value == 2) {
      getAllClosedTransaction();
    }
    setTab(value);
  };

  const getBrand = () => {
    BrandController.getBrandIdList((data) => {
      if (data.length > 0) {
        setBrandList(data);
      }
    });
  };

  const getAllActiveTransaction = () => {
    OrderManagementController.getAllActiveTransaction((data) => {
      if (data.length > 0) {
        data.sort(function (a, b) {
          return new Date(a.stage) - new Date(b.stage);
        });
        setTransaction(data);
      }
    });
  };

  const getAllClosedTransaction = () => {
    OrderManagementController.getAllClosedTransaction((data) => {
      if (data.length > 0) {
        setClosedTransaction(data);
      }
    });
  };

  const onClickDetail = (id) => {
    OrderManagementController.getTransactionDetailByPurchasedBrandId(
      id,
      (data) => {
        setTransactionDetail(data);
      }
    );
  };

  //   {
  //     "buyerName": "Arkar",
  //     "buyerEmail": "arkarphonemyat99@gmail.com",
  //     "purchasedBrandID": 24,
  //     "selectedCollectionLocation": {
  //         "id": 3,
  //         "brandID": 4,
  //         "brand": null,
  //         "address": "Guess water lane",
  //         "instructions": "Weekend 5pm-5am",
  //         "createdDatetime": "2024-08-02T09:16:51.4569161",
  //         "createdBy": "5",
  //         "editedDatetime": null,
  //         "editedBy": null,
  //         "isActive": true
  //     },
  //     "purchasedProductDisplayDtos": [
  //         {
  //             "productName": "red gas",
  //             "unitPrice": 30,
  //             "discountedUnitPrice": 25,
  //             "quantity": 1,
  //             "gcRedeemed": 0,
  //             "discountAmount": 0
  //         }
  //     ],
  //     "transactionStatusHistoryDisplayDtos": [
  //         {
  //             "transactionHistoryId": 10048,
  //             "stage": 1,
  //             "transactionStatusDescription": "Processing",
  //             "nextStageDescription": "Processed",
  //             "createdDatetime": "2024-09-13T17:47:32.7826253"
  //         }
  //     ]
  // }
  const onClickNextStage = (transactionHistoryId, status, detail) => {
    OrderManagementController.updateTransactionStatusByStaff(
      transactionHistoryId,
      (data) => {
        if (data.transactionHistoryId > 0) {
          toast.success("Status update successful!", {
            position: "top-right",
          });
          getAllActiveTransaction();
          if (status == "Processed") {
            try {
              fetch(`${baseUrl}/api/Email/send`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;",
                },
                body: JSON.stringify({
                  toEmail: `${detail.buyerEmail}`,
                  subject: "Purchase ready for collection!",
                  body: `<html><body><h4>Dear <b>${detail.buyerName}</b>,</h4>
                        <p>The following items ${
                          detail.selectedCollectionLocation == null
                            ? "have been sent"
                            : "are ready for your collection"
                        }.</p>
                        <br/>
                        <div>
                          <h4>Product Information</h4>
                                        <ul>
                                          ${detail.purchasedProductDisplayDtos
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
                                                    productData.gcRedeemed != 0
                                                      ? `
                                                    <li>GC Redeemed: <span>${
                                                      productData.gcRedeemed
                                                    }</span></li>
                                                    <li>Discount Amount: <span>${
                                                      productData.discountAmount /
                                                      100
                                                    }</span></li>
                                                `
                                                      : ""
                                                  }
                                                  <li>Net Payable: <span>${
                                                    productData.gcRedeemed == 0
                                                      ? (productData.discountedUnitPrice
                                                          ? productData.discountedUnitPrice *
                                                            productData.quantity
                                                          : productData.quantity *
                                                            productData.unitPrice) -
                                                        productData.gcRedeemed
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
                                            detail.selectedCollectionLocation ==
                                            null
                                              ? "Delivery"
                                              : "Self Collection"
                                          }</span></li>
                                          ${
                                            detail.selectedCollectionLocation !=
                                            null
                                              ? `
                                            <li>Collection Location: <span>${detail.selectedCollectionLocation.address}</span></li>
                                            <li>Collection Instruction: <span>${detail.selectedCollectionLocation.instructions}</span></li>
                                          `
                                              : ""
                                          }
                                        </ul>
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
                .then((res) => {
                  toast.success(res, { position: "top-right" });
                })
                .catch((err) => console.log("email error =====>", err));
            } catch (err) {
              console.error(err);
              toast.error("Something went wrong!");
            }
          } else if (status == "Fulfilled") {
            try {
              fetch(`${baseUrl}/api/Email/send`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;",
                },
                body: JSON.stringify({
                  toEmail: `${detail.buyerEmail}`,
                  subject: "Looking forward to your response!!",
                  body: `<html><body><h4>Dear <b>${detail.buyerName}</b>,</h4>
                          <p>Hope you're enjoying your new product/s. We value your opinion - let us know:</p>
                          <br/>
                          <a href="https://feak.achieversprofile.com/eco2/shops/product_review">https://feak.achieversprofile.com/eco2/shops/product_review</a>
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
                .then((res) => {
                  toast.success(res, { position: "top-right" });
                })
                .catch((err) => console.log("email error =====>", err));
            } catch (err) {
              console.error(err);
              toast.error("Something went wrong!");
            }
          }
        } else {
          toast.error("Something is wrong updating the status!", {
            position: "top-right",
          });
        }
      }
    );
  };

  const transactionData = useMemo(() => {
    let computedData = transaction;
    const startIndex = (currentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, transaction]);

  const closedTransactionData = useMemo(() => {
    let computedData = closedTransaction;
    const startIndex = (closedCurrentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [closedCurrentPage, closedTransaction]);

  const onSelectActiveBrandName = (brand) => {
    setSelectBrandId(brand);
    if (brand == 0) {
      getAllActiveTransaction();
    } else {
      OrderManagementController.getActiveTransactionByBrandId(brand, (data) => {
        setTransaction(data);
        if (data.length < 1) {
          toast.warn("There is no transaction for this brand!", {
            position: "top-right",
          });
        }
      });
    }
  };

  const onSelectClosedBrandName = (brand) => {
    setSelectClosedBrandId(brand);
    if (brand == 0) {
      getAllClosedTransaction();
    } else {
      OrderManagementController.getClosedTransactionByBrandId(brand, (data) => {
        setClosedTransaction(data);
        if (data.length < 1) {
          toast.warn("There is no transaction for this brand!", {
            position: "top-right",
          });
        }
      });
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onPageChangeClosed = (page) => {
    setClosedCurrentPage(page);
  };
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <h2 style={{ marginTop: 20, marginLeft: 30 }}>Order Management</h2>
      <div style={{ width: "95%", margin: "0px auto" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            // justifyContent: "center",
            // paddingLeft: 20,
          }}
        >
          <button
            type="button"
            class="btn btn-info"
            style={{
              color: tab == 1 ? color.skyBlue : color.white,
              width: 180,
              fontSize: 14,
              backgroundColor: tab == 1 ? color.white : "",
              margin: "5px 10px",
            }}
            onClick={() => onClickTabs(1)}
          >
            Manage Transaction
          </button>
          <button
            type="button"
            class="btn btn-info"
            style={{
              color: tab == 2 ? color.skyBlue : color.white,
              width: 180,
              fontSize: 14,
              backgroundColor: tab == 2 ? color.white : "",
              margin: "5px 10px",
            }}
            onClick={() => onClickTabs(2)}
          >
            Closed Transaction
          </button>
        </div>
        {tab == 1 ? (
          <>
            {isMobile ? (
              <h5 style={{ marginTop: 20 }}>Manage Transaction</h5>
            ) : (
              <h4 style={{ marginTop: 20 }}>Manage Transaction</h4>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <div>
                <label className="form-label" for="active">
                  Select Brand
                </label>
                <select
                  id="active"
                  name="active"
                  class="form-select"
                  aria-label="Default select example 1"
                  style={{ width: 220, height: 35, marginRight: 10 }}
                  value={selectedBrandId}
                  onChange={(e) => onSelectActiveBrandName(e.target.value)}
                >
                  <option value={0}>All Brand</option>
                  {brandList.map((value, index) => (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="table-responsive" style={{ margin: "30px 0px" }}>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Stripe Payment ID</th>
                    <th scope="col">Buyer Name</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((v, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{v.purchasedBrandID}</td>
                      <td>{v.paymentTransactionID}</td>
                      <td>{v.buyerName}</td>
                      <td>{moment(v.createdDate).format("DD MMM YYYY")}</td>
                      <td>{v.statusDescription}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          style={{ color: color.white }}
                          data-bs-toggle="modal"
                          data-bs-target="#orderManagementModal"
                          onClick={() => onClickDetail(v.purchasedBrandID)}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                items={transaction.length} // 12
                currentPage={currentPage} // 1
                setCurrentPage={setCurrentPage}
                pageSize={pageSize} // 6
                onPageChange={onPageChange}
              />
            </div>
          </>
        ) : tab == 2 ? (
          <>
            {isMobile ? (
              <h5 style={{ marginTop: 20 }}>Closed Transaction</h5>
            ) : (
              <h4 style={{ marginTop: 20 }}>Closed Transaction</h4>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <div>
                <label className="form-label" for="closed">
                  Select Brand
                </label>
                <select
                  id="closed"
                  name="closed"
                  class="form-select"
                  aria-label="Default select example"
                  style={{ width: 220, height: 35, marginRight: 10 }}
                  value={selectedClosedBrandId}
                  onChange={(e) => onSelectClosedBrandName(e.target.value)}
                >
                  <option value={0}>All Brand</option>
                  {brandList.map((value, index) => (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="table-responsive" style={{ margin: "30px 0px" }}>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Stripe Payment ID</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {closedTransactionData.map((v, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{v.purchasedBrandID}</td>
                      <td>{v.paymentTransactionID}</td>
                      <td>{moment(v.createdDate).format("DD MMM YYYY")}</td>
                      <td>{v.statusDescription}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          style={{ color: color.white }}
                          data-bs-toggle="modal"
                          data-bs-target="#orderManagementModal"
                          onClick={() => onClickDetail(v.purchasedBrandID)}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                items={closedTransaction.length} // 12
                currentPage={closedCurrentPage} // 1
                setCurrentPage={setClosedCurrentPage}
                pageSize={pageSize} // 6
                onPageChange={onPageChangeClosed}
              />
            </div>
          </>
        ) : null}
      </div>
      <div
        class="modal fade"
        id="orderManagementModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabelOrder"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabelOrder">
                Transaction Detail
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setTransactionDetail(null)}
              ></button>
            </div>
            <div class="modal-body">
              <div
                style={{
                  width: isMobile || isTablet ? "100%" : "80%",
                  margin: "0px auto",
                }}
              >
                <h6>Purchased Products</h6>
                {transactionDetail?.purchasedProductDisplayDtos.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      width: "100%",
                      // borderWidth: 1,
                      // border: "1.5px dotted green",
                      backgroundColor: color.grey,
                      // borderColor: color.skyBlue,
                      borderRadius: 20,
                      lineHeight: 1,
                      padding: "12px",
                      marginBottom: 10,
                      color: color.white,
                      fontSize: isMobile ? 12 : 14,
                    }}
                  >
                    <div className="d-flex flex-row justify-content-between">
                      <p>Product Name:</p>
                      <p>{p.productName}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <p>Quantity:</p>
                      <p>{p.quantity}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <p>GC Used:</p>
                      <p>{p.gcRedeemed}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <p>Discount:</p>
                      <p>{p.discountAmount}</p>
                    </div>
                  </div>
                ))}

                {transactionDetail?.selectedCollectionLocation != null ? (
                  <div>
                    <h6>Self Collection</h6>
                    <div
                      className="d-flex flex-row justify-content-between"
                      style={{ fontSize: isMobile ? 12 : 14 }}
                    >
                      <p>Location Address:</p>
                      <p>
                        {transactionDetail?.selectedCollectionLocation.address}
                      </p>
                    </div>
                  </div>
                ) : null}
                <h6>Transaction Status</h6>
                <div
                  className="d-flex flex-row justify-content-between"
                  style={{ fontSize: isMobile ? 12 : 14 }}
                >
                  <p>Status:</p>
                  <p>
                    {
                      transactionDetail?.transactionStatusHistoryDisplayDtos[0]
                        .transactionStatusDescription
                    }
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              {transactionDetail?.transactionStatusHistoryDisplayDtos[0]
                .transactionStatusDescription == "Fulfilled" ||
              transactionDetail?.transactionStatusHistoryDisplayDtos[0]
                .transactionStatusDescription == "Closed" ? null : (
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    onClickNextStage(
                      transactionDetail?.transactionStatusHistoryDisplayDtos[0]
                        .transactionHistoryId,
                      transactionDetail?.transactionStatusHistoryDisplayDtos[0]
                        .nextStageDescription,
                      transactionDetail
                    );
                  }}
                >
                  {
                    transactionDetail?.transactionStatusHistoryDisplayDtos[0]
                      .nextStageDescription
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
