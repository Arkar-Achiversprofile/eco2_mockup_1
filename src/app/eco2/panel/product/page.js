"use client";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import { CategoryController } from "../../../controller";
import { BrandController, ProductController } from "../../../controller";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../../context/AppContext";

export default function Product() {
  const { userInfo } = useContext(AppContext);
  const [productData, setProductData] = useState({
    categoryID: 0,
    brandID: 0,
    name: "",
    description: "",
    unitPrice: null,
    maxDiscountValue: null,
    maxGreenCredit: null,
    categoryImageUrl: null,
    maxPurchaseNo: null,
    productImageUrl: "",
    imageFileName: "",
    imageName: "",
    priority: null,
    inStock: true,
    isActive: true,
    createdBy: "",
  });
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  // console.log("prodcut", productData.productImageUrl);

  useEffect(() => {
    getCategories();
    getBrand();
  }, []);

  const getCategories = () => {
    CategoryController.getLowestCategories((data) => {
      if (data.length > 0) {
        setCategory(data);
      }
    });
  };

  const getBrand = () => {
    BrandController.getBrandIdList((data) => {
      if (data.length > 0) {
        setBrand(data);
      }
    });
  };

  const onChangeInfo = (text, value) => {
    const data = { ...productData };
    if (
      text == "unitPrice" ||
      text == "mmaxDiscountValuea" ||
      text == "maxGreenCredit" ||
      text == "priority" ||
      text == "categoryID" ||
      text == "brandID"
    ) {
      data[text] = parseInt(value);
    } else {
      if (text == "productImageUrl") {
        getBase64(value.files, (result) => {
          alert(result)
          data.productImageUrl = result;
        });
        data.imageName = value.value;
        data.imageFileName = value.files[0].name;
      } else {
        data[text] = value;
      }
    }

    setProductData(data);
  };

  const getBase64 = (files, cb) => {
    const filePromises = Object.entries(files).map((item) => {
      return new Promise((resolve, reject) => {
        const [index, file] = item;
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = function (event) {
          // cb(`data:${file.type};base64,${btoa(event.target.result)}`);
          const arrayBuffer = event.target.result;
          const uint8Array = new Uint8Array(arrayBuffer);
          const base64String = btoa(String.fromCharCode(...uint8Array));
          // cb(`data:${file.type};base64,${btoa(event.target.result)}`);

          resolve(`${base64String}`);
          // resolve(`${btoa(event.target.result)}`);
        };
        reader.onerror = function () {
          console.log("can't read the file");
          reject();
        };
      });
    });

    Promise.all(filePromises)
      .then((res) => {
        console.log("ready to submit");
        // console.log("res", res)
        cb(res[0]);
      })
      .catch((error) => {
        console.log(error);
        // console.log("something wrong happened");
      });
  };

  const onClickCreate = () => {
    if (productData.name == "") {
      toast.warn("Please enter Product Name!", {
        position: "top-right",
      });
    } else if (productData.unitPrice == null) {
      toast.warn("Please set Unit Price!", {
        position: "top-right",
      });
    } else if (productData.maxDiscountValue == null) {
      toast.warn("Please set Maximum Discount!", {
        position: "top-right",
      });
    } else if (productData.maxGreenCredit == null) {
      toast.warn("Please set Maximum Green Credit!", {
        position: "top-right",
      });
    } else if (productData.maxPurchaseNo == null) {
      toast.warn("Please set Max Purchase No!", {
        position: "top-right",
      });
    } else if (productData.productImageUrl == "") {
      toast.warn("Please choose Product Image!", {
        position: "top-right",
      });
    } else if (productData.priority == null) {
      toast.warn("Please set Priority!", {
        position: "top-right",
      });
    } else if (productData.categoryID == 0) {
      toast.warn("Please choose Category!", {
        position: "top-right",
      });
    } else if (productData.brandID == 0) {
      toast.warn("Please choose Brand!", {
        position: "top-right",
      });
    } else {
      productData.createdBy = userInfo.userName;
      ProductController.createProduct(productData, (data) => {
        if (data.id) {
          toast.success("Creating Product successfully!", {
            position: "top-right",
          });
          setProductData({
            categoryID: 0,
            brandID: 0,
            name: "",
            description: "",
            unitPrice: null,
            maxDiscountValue: null,
            maxGreenCredit: null,
            categoryImageUrl: null,
            maxPurchaseNo: null,
            productImageUrl: "",
            imageFileName: "",
            imageName: "",
            priority: null,
            inStock: true,
            isActive: true,
            createdBy: "",
          });
        } else {
          toast.warn("Something went wrong!", {
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
          width: "90%",
          margin: "30px auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4 style={{ marginTop: 20 }}>Create Product</h4>
        <div className="row">
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="Product Name" class="form-label">
              Product Name:
            </label>
            <input
              type="text"
              class="form-control"
              id="Product Name"
              placeholder="Product Name"
              value={productData.name}
              onChange={(e) => onChangeInfo("name", e.target.value)}
            />
          </div>
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="price" class="form-label">
              Unit Price:
            </label>
            <input
              type="number"
              class="form-control"
              id="price"
              placeholder="Unit Price"
              value={productData.unitPrice}
              onChange={(e) => onChangeInfo("unitPrice", e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="discount" class="form-label">
              Max Discount Value:
            </label>
            <input
              type="text"
              class="form-control"
              id="discount"
              placeholder="Max Discount Value"
              value={productData.maxDiscountValue}
              onChange={(e) => onChangeInfo("maxDiscountValue", e.target.value)}
            />
          </div>
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="credit" class="form-label">
              Max Green Credit:
            </label>
            <input
              type="number"
              class="form-control"
              id="credit"
              placeholder="Max Green Credit"
              value={productData.maxGreenCredit}
              onChange={(e) => onChangeInfo("maxGreenCredit", e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="maxPurchaseNo" class="form-label">
              Max Purchase No:
            </label>
            <input
              type="number"
              class="form-control"
              id="maxPurchaseNo"
              placeholder="Number"
              value={productData.maxPurchaseNo}
              onChange={(e) => onChangeInfo("maxPurchaseNo", e.target.value)}
            />
          </div>

          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="priority" class="form-label">
              Priority:
            </label>
            <input
              type="number"
              class="form-control"
              id="priority"
              placeholder="Priority"
              value={productData.priority}
              onChange={(e) => onChangeInfo("priority", e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="category" class="form-label">
              Category:
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              value={productData.categoryID}
              onChange={(e) => onChangeInfo("categoryID", e.target.value)}
            >
              <option value={null} selected>
                Select Category
              </option>
              {category.length > 0
                ? category.map((value, index) => (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="brand" class="form-label">
              Brand:
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              value={productData.brandID}
              onChange={(e) => onChangeInfo("brandID", e.target.value)}
            >
              <option selected>Select Brand</option>
              {brand.length > 0
                ? brand.map((value, index) => (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  ))
                : null}
            </select>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="formFile" class="form-label">
              Product Image
            </label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              value={productData.imageName}
              onChange={(e) => onChangeInfo("productImageUrl", e.target)}
            ></input>
          </div>
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="description" class="form-label">
              Description:
            </label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              placeholder="Description"
              value={productData.description}
              onChange={(e) => onChangeInfo("description", e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div
            className="d-flex flex-row col-md-6 col-12 px-3"
            style={{ paddingTop: 10 }}
          >
            <div style={{ width: "50%" }}>
              <label>Instock:</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault1"
                  id="Yes"
                  checked={productData.inStock == true ? true : false}
                  onClick={() => onChangeInfo("inStock", true)}
                />
                <label class="form-check-label" for="Yes">
                  Yes
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault1"
                  id="No"
                  checked={productData.inStock == false ? true : false}
                  onClick={() => onChangeInfo("inStock", false)}
                />
                <label class="form-check-label" for="No">
                  No
                </label>
              </div>
            </div>
            <div style={{ width: "50%" }}>
              <label>Is Active:</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault2"
                  id="Yes1"
                  checked={productData.isActive == true ? true : false}
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
                  name="flexRadioDefault2"
                  id="No1"
                  checked={productData.isActive == false ? true : false}
                  onClick={() => onChangeInfo("isActive", false)}
                />
                <label class="form-check-label" for="No1">
                  No
                </label>
              </div>
            </div>
          </div>
          <div></div>
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
