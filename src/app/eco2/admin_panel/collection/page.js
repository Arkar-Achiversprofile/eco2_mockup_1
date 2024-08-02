"use client";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../../context/AppContext";
import { BrandController } from "../../../controller";

export default function Collection() {
  const { userInfo, isMobile, isTablet } = useContext(AppContext);
  const [collectionData, setCollectionData] = useState({
    brandID: 0,
    address: "",
    instructions: "",
    createdBy: "",
    isActive: true,
  });
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    getBrand();
  }, []);

  const getBrand = () => {
    BrandController.getBrandIdList((data) => {
      if (data.length > 0) {
        setBrandList(data);
      }
    });
  };

  const onChangeInfo = (text, value) => {
    const data = { ...collectionData };
    data[text] = value;
    setCollectionData(data);
  };

  const onClickCreate = () => {
    if (collectionData.brandID == 0 || collectionData.brandID == null) {
      toast.warn("Please select Brand Name!", {
        position: "top-right",
      });
    } else if (collectionData.address == "") {
      toast.warn("Please fill Address!", {
        position: "top-right",
      });
    } else if (collectionData.instructions == "") {
      toast.warn("Please fill Instructions!", {
        position: "top-right",
      });
    } else {
      collectionData.createdBy = userInfo.userName;
      BrandController.createCollection(collectionData, (data) => {
        if (data.brandID) {
          toast.success("Creating Collection for Brand successfully!", {
            position: "top-right",
          });
          setCollectionData({
            brandID: 0,
            address: "",
            instructions: "",
            createdBy: "",
            isActive: true,
          });
        } else {
          toast.error("Something went wrong!", {
            position: "top-right",
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
          margin: "30px auto",
        }}
      >
        <h4 style={{ marginTop: 20 }}> Create Collection for Brand</h4>
        <div className="" style={{ paddingTop: 10 }}>
          <label for="brandId" class="form-label">
            Brand Name:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            value={collectionData.brandID}
            onChange={(e) => onChangeInfo("brandID", e.target.value)}
          >
            <option value={null} selected>
              Select Brand
            </option>
            {brandList.length > 0
              ? brandList.map((value, index) => (
                  <option value={value.id} key={index}>
                    {value.name}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="" style={{ paddingTop: 10 }}>
          <label for="address" class="form-label">
            Address:
          </label>
          <textarea
            type="text"
            class="form-control"
            id="address"
            placeholder="Address"
            value={collectionData.address}
            onChange={(e) => onChangeInfo("address", e.target.value)}
          />
        </div>
        <div className="" style={{ paddingTop: 10 }}>
          <label for="instructions" class="form-label">
            Instructions:
          </label>
          <textarea
            type="text"
            class="form-control"
            id="instructions"
            placeholder="Instructions"
            value={collectionData.instructions}
            onChange={(e) => onChangeInfo("instructions", e.target.value)}
          />
        </div>

        <div className="" style={{ paddingTop: 10 }}>
          <label>Is Active:</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault6"
              id="Yes2"
              checked={collectionData.isActive == true ? true : false}
              onClick={() => onChangeInfo("isActive", true)}
            />
            <label class="form-check-label" for="Yes2">
              Yes
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault6"
              id="No2"
              checked={collectionData.isActive == false ? true : false}
              onClick={() => onChangeInfo("isActive", false)}
            />
            <label class="form-check-label" for="No2">
              No
            </label>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-success"
          style={{ width: 150, marginTop: 20, alignSelf: "flex-end" }}
          onClick={onClickCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
}
