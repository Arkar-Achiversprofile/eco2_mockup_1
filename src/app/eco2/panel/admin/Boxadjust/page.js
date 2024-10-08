"use client";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../../../../components/NavBar";
import AppContext from "../../../../context/AppContext";
import { useRouter } from "next/navigation";
import { GreenCreditAdjustController } from "../../../../controller";

export default function BoxAdjust() {
  const { userInfo, isMobile, isTablet } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [boxInfo, setBoxInfo] = useState({
    accountId: "",
    accountItemId: "",
    isBoxOut: false,
    createdBy: "",
  });
  const router = useRouter();

  useEffect(() => {
    getAccounts();
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

  const onChangeInfo = (text, value) => {
    const data = { ...boxInfo };
    data[text] = value;
    setBoxInfo(data);
  };

  const onClickSubmit = () => {
    if (boxInfo.accountId == 0) {
      toast.warn("Please choose user!");
    } else {
      let filterUser = users.filter((v) => v.name == boxInfo.accountId);
      boxInfo.accountItemId = filterUser[0].id;
      boxInfo.createdBy = userInfo.userName;
    //   console.log("boxInfo ====>", boxInfo)
      GreenCreditAdjustController.updateBoxAdjust(boxInfo, (data) => {
          toast.success("Box adjustment is successful!", {
            position: "top-right",
            onClose: () => {
              router.back();
            },
          });
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
        <h4>Box Adjustment</h4>
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
              onChange={(e) => onChangeInfo("accountId", e.target.value)}
            />
            <datalist id="datalistOptions">
              {users.map((value, index) => (
                <option key={index} value={value.name}></option>
              ))}
            </datalist>
          </div>
        </div>
        <div className="" style={{ display: "flex", flexDirection: "row", paddingTop: 10 }}>
            <div style={{flex: 1}}>Box Adjustment</div>
            <div style={{flex: 1}}>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault-10"
              id="BoxIn"
              checked={boxInfo.isBoxOut == false ? true : false}
              onClick={() => onChangeInfo("isBoxOut", false)}
            />
            <label class="form-check-label" for="BoxIn">
              Box In
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault-10"
              id="BoxOut"
              checked={boxInfo.isBoxOut == true ? true : false}
              onClick={() => onChangeInfo("isBoxOut", true)}
            />
            <label class="form-check-label" for="BoxOut">
              Box Out
            </label>
          </div>
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
