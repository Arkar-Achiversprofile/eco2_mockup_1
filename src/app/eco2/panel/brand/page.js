"use client";
import React, { useContext, useState } from "react";
import NavBar from "../../../components/NavBar";
import AppContext from "../../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrandController } from "../../../controller";

export default function Brand() {
  const { userInfo, isMobile, isTablet } = useContext(AppContext);
  const [brandData, setBrandData] = useState({
    name: "",
    companyUEN: "",
    brandEmail: "",
    logoPath: "",
    deliveryFee: 0,
    freeShoppingAmount: 0,
    createdBy: "",
    isActive: true,
  });
  const onChangeInfo = (text, value) => {
    const data = { ...brandData };
    data[text] =
      text == "deliveryFee" || text == "freeShoppingAmount"
        ? parseInt(value)
        : value;
    setBrandData(data);
  };

  const onClickCreate = () => {
    if (brandData.name == "") {
      toast.warn("Please write Brand Name!", {
        position: "top-right",
      });
    } else if (brandData.companyUEN == "") {
      toast.warn("Please write Company UEN!", {
        position: "top-right",
      });
    } else if (brandData.brandEmail == "") {
      toast.warn("Please write Email!", {
        position: "top-right",
      });
    } else if (brandData.logoPath == "") {
      toast.warn("Please choose Brand Logo!", {
        position: "top-right",
      });
    } else if (brandData.deliveryFee == null) {
      toast.warn("Please set Delivery Fee!", {
        position: "top-right",
      });
    } else if (brandData.freeShoppingAmount == null) {
      toast.warn("Please set Free Shopping Amount!", {
        position: "top-right",
      });
    } else {
      brandData.createdBy = userInfo.userName;
      BrandController.createBrand(brandData, (data) => {
        if (data.id) {
          toast.success("Create brand successfully!", {
            position: "top-right",
          });
          setBrandData({
            name: "",
            companyUEN: "",
            brandEmail: "",
            logoPath: "",
            deliveryFee: 0,
            freeShoppingAmount: 0,
            createdBy: "",
            isActive: true,
          });
        } else {
          toast.error("Something went wrong! Please try again!", {
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
        <h4 style={{ marginTop: 20 }}> Create Brand</h4>
        <div className="" style={{ paddingTop: 10 }}>
          <label for="brand" class="form-label">
            Brand Name:
          </label>
          <input
            type="text"
            class="form-control"
            id="brand"
            placeholder="Brand"
            value={brandData.name}
            onChange={(e) => onChangeInfo("name", e.target.value)}
          />
        </div>
        <div className="" style={{ paddingTop: 10 }}>
          <label for="company" class="form-label">
            Company UEN:
          </label>
          <input
            type="text"
            class="form-control"
            id="company"
            placeholder="Company UEN"
            value={brandData.companyUEN}
            onChange={(e) => onChangeInfo("companyUEN", e.target.value)}
          />
        </div>
        <div className="" style={{ paddingTop: 10 }}>
          <label for="brandEmail" class="form-label">
            Brand Email:
          </label>
          <input
            type="text"
            class="form-control"
            id="brandEmail"
            placeholder="Email"
            value={brandData.brandEmail}
            onChange={(e) => onChangeInfo("brandEmail", e.target.value)}
          />
        </div>
        <div className="" style={{ paddingTop: 10 }}>
          <label for="logo" class="form-label">
            Brand Logo
          </label>
          <input
            class="form-control"
            type="file"
            id="logo"
            accept="image/*"
            value={brandData.logoPath}
            onChange={(e) => onChangeInfo("logoPath", e.target.value)}
          ></input>
        </div>
        <div className="" style={{ paddingTop: 10 }}>
          <label for="deliveryFee" class="form-label">
            Delivery Fee:
          </label>
          <input
            type="number"
            class="form-control"
            id="deliveryFee"
            placeholder="Delivery Fee"
            value={brandData.deliveryFee}
            onChange={(e) => onChangeInfo("deliveryFee", e.target.value)}
          />
        </div>
        <div className="" style={{ paddingTop: 10 }}>
          <label for="amount" class="form-label">
            Free Shipping Amount:
          </label>
          <input
            type="number"
            class="form-control"
            id="amount"
            placeholder="Amount"
            value={brandData.freeShoppingAmount}
            onChange={(e) => onChangeInfo("freeShoppingAmount", e.target.value)}
          />
        </div>
        <div className="" style={{ paddingTop: 10 }}>
          <label>Is Active:</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault5"
              id="Yes1"
              checked={brandData.isActive == true ? true : false}
              onClick={() => onChangeInfo("isActive", true)}
            />
            <label class="form-check-label" for="Yes1">
              Yes
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault5"
              id="No1"
              checked={brandData.isActive == false ? true : false}
              onClick={() => onChangeInfo("isActive", false)}
            />
            <label class="form-check-label" for="No1">
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
