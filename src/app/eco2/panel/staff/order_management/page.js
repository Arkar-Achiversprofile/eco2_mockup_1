"use client";
import React, { useContext, useMemo, useState } from "react";
import NavBar from "../../../../components/NavBar";
import AppContext from "../../../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SupplierAdminController } from "../../../../controller";
import Pagination from "../../../../components/Pagination";
import { color } from "../../../../components/color";
import { getLocalStorage } from "../../../../api/localStorage";
import moment from "moment";

export default function OrderManagement() {
  const { isMobile, isTablet } = useContext(AppContext);
  const [tab, setTab] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [closedTransaction, setClosedTransaction] = useState([]);
  const [closedCurrentPage, setClosedCurrentPage] = useState(1);
  const pageSize = 10;

  const onClickTabs = (value) => {
    if (value == 1) {
      getTransactionBySupplierId();
    } else if (value == 2) {
      getClosedTransaction();
    }
    setTab(value);
  };

  const getTransactionBySupplierId = () => {
    const id = getLocalStorage("id");
    SupplierAdminController.getTransactionBySupplierId(id, (data) => {
      if (data.length > 0) {
        data.sort(function (a, b) {
          return new Date(a.stage) - new Date(b.stage);
        });
        setTransaction(data);
      }
    });
  };

  const getClosedTransaction = () => {
    const id = getLocalStorage("id");
    SupplierAdminController.getClosedTransaction(id, (data) => {
      if (data.length > 0) {
        setClosedTransaction(data);
      }
    });
  };

  const onClickDetail = (id) => {
    SupplierAdminController.getTransactionDetailByPurchasedBrandId(
      id,
      (data) => {
        setTransactionDetail(data);
      }
    );
  };

  const onClickNextStage = (transactionHistoryId) => {
    SupplierAdminController.updateTransactionStatusBySupplier(
      transactionHistoryId,
      (data) => {
        if (data.transactionHistoryId > 0) {
          toast.success("Status update successful!", {
            position: "top-right",
          });
          getTransactionBySupplierId();
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
            paddingLeft: 20,
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
                        .transactionHistoryId
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
