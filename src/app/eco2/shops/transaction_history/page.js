/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
import ShopNavBar from "../../../components/ShopNavBar";
import AppContext from "../../../context/AppContext";
import moment from "moment";
import { EShopController } from "../../../controller";
import { getLocalStorage } from "../../../api/localStorage";

export default function TransactionHistory() {
  const { isMobile, isTablet, userInfo } = useContext(AppContext);
  const [transactionData, setTransactionData] = useState([]);
  const fontSize = isMobile ? 11 : isTablet ? 13 : 15;

  console.log("data ====>", transactionData);

  useEffect(() => {
    getUserTransactionHistory();

    return () => {
      setTransactionData([]);
    };
  }, []);

  const getUserTransactionHistory = () => {
    const id = getLocalStorage("id")
    EShopController.getUserTransactionHistory(id, (data) => {
      if (data.length > 0) {
        setTransactionData(data);
      }
    });
  };
  //   [
  //     {
  //       "paymentTransactionID": "stripe1234",
  //       "purchasedBrandDisplayDtos": [
  //         {
  //           "brandName": "OtoTesting",
  //           "collectionAddress": "WWW XXX",
  //           "deliveryFee": 15,
  //           "freeShoppingAmount": 60,
  //           "purchasedProductDisplayDtos": [
  //             {
  //               "productName": "Tilapia",
  //               "unitPrice": 6,
  //               "quantity": 2,
  //               "gcRedeemed": 400,
  //               "discountAmount": 4
  //             },
  //             {
  //               "productName": "Sea bass",
  //               "unitPrice": 2,
  //               "quantity": 1,
  //               "gcRedeemed": 0,
  //               "discountAmount": 0
  //             }
  //           ],
  //           "transactionStatusHistoryDisplayDtos": [
  //             {
  //               "transactionHistoryId": 10,
  //               "stage": 1,
  //               "transactionStatusDescription": "Processing",
  //               "nextStageDescription": "Processed",
  //               "createdDatetime": "2024-08-01T11:17:25.3520748"
  //             }
  //           ]
  //         },
  //         {
  //           "brandName": "MushroomTesting",
  //           "collectionAddress": null,
  //           "deliveryFee": 10,
  //           "freeShoppingAmount": 80,
  //           "purchasedProductDisplayDtos": [
  //             {
  //               "productName": "Local Tea",
  //               "unitPrice": 3,
  //               "quantity": 1,
  //               "gcRedeemed": 100,
  //               "discountAmount": 100
  //             }
  //           ],
  //           "transactionStatusHistoryDisplayDtos": [
  //             {
  //               "transactionHistoryId": 13,
  //               "stage": 2,
  //               "transactionStatusDescription": "Processed",
  //               "nextStageDescription": "Fulfilled",
  //               "createdDatetime": "2024-08-01T11:52:33.9454271"
  //             },
  //             {
  //               "transactionHistoryId": 11,
  //               "stage": 1,
  //               "transactionStatusDescription": "Processing",
  //               "nextStageDescription": "Processed",
  //               "createdDatetime": "2024-08-01T11:17:25.3520757"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  return (
    <div>
      <ShopNavBar name="Transaction History" />
      <div>
        <div
          style={{
            width: isMobile ? "90%" : isTablet ? "80%" : "50%",
            marginLeft: "5%",
            marginTop: 30,
          }}
        >
          {transactionData.map((t, index) => (
            <div key={index}>
              <div className="d-flex flex-row" style={{ flex: 1, fontSize: isMobile ? 14 : isTablet ? 16 : 18 }}>
                <p style={{ flex: 1, fontWeight: "bold" }}>
                  Transaction ID:
                </p>
                <p style={{ flex: 2, fontWeight: "bold" }}>
                  {t.paymentTransactionID}
                </p>
              </div>
              {t.purchasedBrandDisplayDtos.map((pb, index1) => (
                <div key={index1} style={{fontSize: fontSize}}>
                  <div className="d-flex flex-row" style={{ flex: 1 }}>
                    <p style={{ flex: 1, fontWeight: "bold" }}>Brand:</p>
                    <p style={{ flex: 2 }}>{pb.brandName}</p>
                  </div>
                  <div className="d-flex flex-row" style={{ flex: 1 }}>
                    <p style={{ flex: 1, fontWeight: "bold" }}>
                      Transaction Status:
                    </p>
                    <p style={{ flex: 2 }}>
                      {
                        pb.transactionStatusHistoryDisplayDtos[0]
                          ?.transactionStatusDescription
                      }{" "}
                      (
                      {moment(
                        pb.transactionStatusHistoryDisplayDtos[0]
                          ?.createdDatetime
                      ).format("DD-MM-YYYY HH:MM:ss A")}
                      )
                    </p>
                  </div>

                      
                  <div className="d-flex flex-row" style={{ flex: 1 }}>
                    <p style={{ flex: 1, fontWeight: "bold" }}>
                      Purchased Product:
                    </p>
                    <div className="d-flex flex-row" style={{ flex: 2 }}>
                      {pb.purchasedProductDisplayDtos.map((p, index2) => (
                        <p key={index2}>
                          {p.productName} ({p.quantity}pcs)
                          {index2 !=
                          pb.purchasedProductDisplayDtos.length - 1 ? (
                            <span>,&nbsp;</span>
                          ) : null}
                        </p>
                      ))}
                    </div>
                  </div>
                  {index1 != t.purchasedBrandDisplayDtos.length - 1 ? (
                    <hr style={{width: "80%"}}/>
                  ) : null}
                </div>
              ))}
              <hr />{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
