"use client";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../../../components/NavBar";
import AppContext from "../../../../context/AppContext";
import { useMediaQuery } from "react-responsive";
import { GreenCreditAdjustController } from "../../../../controller";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "../../../../api/localStorage";

export default function GCAdjust() {
  const { userInfo } = useContext(AppContext);
  const [GCInfo, setGCInfo] = useState({
    accountItemId: "",
    adjustAmount: null,
    adjustReasonID: 0,
    createdBy: "",
  });
  const [users, setUsers] = useState([]);
  const [reason, setReason] = useState([]);
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 500px) and (max-width: 1050px)",
  });

  useEffect(() => {
    getAccounts();
    getAdjustReason();
  }, []);

  const getAccounts = () => {
    GreenCreditAdjustController.getAccounts((data) => {
      if (data.length > 0) {
        setUsers(data);
      } else {
        toast.error("There is no user to search!", {
          position: "top-right",
        });
      }
    });
  };

  const getAdjustReason = () => {
    GreenCreditAdjustController.getAdjustReason((data) => {
      if (data.length > 0) {
        setReason(data);
      } else {
        toast.error("There is no reason for adjustment!", {
          position: "top-right",
        });
      }
    });
  };

  const onChangeInfo = (text, value) => {
    const data = { ...GCInfo };
    if (text === "accountItemId") {
      data[text] = value;
    } else {
      data[text] = parseInt(value);
    }
    setGCInfo(data);
  };

  const onClickSubmit = () => {
    if (GCInfo.accountItemId == 0) {
      toast.warn("Please choose user!");
    } else if (GCInfo.adjustReasonID == 0) {
      toast.warn("Please choose reason adjustment!");
    } else if (GCInfo.adjustAmount == 0) {
      toast.warn("Please set amount!");
    } else {
      const id = getLocalStorage("id")
      let filterUser = users.filter((v) => v.name == GCInfo.accountItemId);
      GCInfo.accountItemId = filterUser[0].id;
      GCInfo.createdBy = `${id}`;
      // console.log("GCINfo ====>", GCInfo)
      GreenCreditAdjustController.updateGCAdjust(GCInfo, (data) => {
        if (data.accountItemId != 0 || data.accountItemId != null || data.accountItemId ) {
          toast.success("Green credit adjustment is successful!", {
            position: "top-right",
            onClose: () => {
              router.back();
            },
          });
        }
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: isMobile ? "90%" : isTablet ? "60%" : "50%",
          margin: "20px auto",
        }}
      >
        <h4>Green Credit Adjustment</h4>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 30 }}>
          <div style={{ flex: 1 }}>
            <p>Search for user</p>
          </div>
          <div style={{ flex: 1 }}>
            <input
              class="form-control"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="Type to search..."
              onChange={(e) => onChangeInfo("accountItemId", e.target.value)}
            />
            <datalist id="datalistOptions">
              {users.map((value, index) => (
                <option key={index} value={value.name}></option>
              ))}
            </datalist>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1 }}>
            <p>Reason for adjustment</p>
          </div>
          <div style={{ flex: 1 }}>
            <select
              class="form-select"
              aria-label="Default select example"
              value={GCInfo.adjustReasonID}
              onChange={(e) => onChangeInfo("adjustReasonID", e.target.value)}
            >
              <option value={null} selected>
                Select Adjustment
              </option>
              {reason.map((value, index) => (
                <option value={value.id} key={index}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1 }}>
            <p>Amount</p>
          </div>
          <div style={{ flex: 1 }}>
            <input
              type="number"
              class="form-control"
              id="adjustAmount"
              placeholder="Amount"
              value={GCInfo.adjustAmount}
              onChange={(e) => {
                onChangeInfo("adjustAmount", e.target.value);
              }}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-success"
          style={{ width: 150, marginTop: 20, alignSelf: "flex-end" }}
          onClick={onClickSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
