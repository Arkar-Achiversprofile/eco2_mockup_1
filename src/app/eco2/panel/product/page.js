"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../../../components/NavBar";
import {
  CategoryController,
  SupplierAdminController,
} from "../../../controller";
import { BrandController, ProductController } from "../../../controller";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../../context/AppContext";
import Pagination from "../../../components/Pagination";
import Image from "next/image";
import { baseUrl } from "../../../controller/baseUrl";
import { color } from "../../../components/color";
import { getLocalStorage } from "../../../api/localStorage";

export default function Product() {
  const { userInfo, isMobile } = useContext(AppContext);
  const [productData, setProductData] = useState({
    categoryID: 0,
    brandID: 0,
    name: "",
    description: "",
    unitPrice: null,
    discountedUnitPrice: null,
    maxDiscountValue: 0,
    maxGreenCredit: 0,
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
  const [selectedBrandId, setSelectBrandId] = useState(null)
  const [maxPurchase, setMaxPurchase] = useState(false);
  const [isProductNew, setIsProductNew] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [tempAllProduct, setTempAllProduct] = useState([]);
  const [editProductData, setEditProductData] = useState(null);
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [isProductImageChange, setIsProductImageChange] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousInStock, setPreviousInStock] = useState(true);
  const [removeClick, setRemoveClick] = useState({
    text: "",
    id: 0,
  });
  const pageSize = 10;

  useEffect(() => {
    getLandingProducts();
    getCategories();
    getBrand();
  }, []);

  const getLandingProducts = () => {
    ProductController.getLandingProducts((data) => {
      if (data.length > 0) {
        setAllProduct(data);
        setTempAllProduct(data);
      } else {
        toast.warn("There is no product!", {
          position: "top-right",
        });
      }
    });
  };

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

  const onSelectBrandName = (brand) => {
    setSelectBrandId(brand);
    if (brand == "All") {
      setAllProduct(tempAllProduct);
    } else {
      const filter = tempAllProduct.filter(v => v.brandName == brand)
      setAllProduct(filter)
    }
  }

  const onChangeInfo = (text, value) => {
    const data = { ...productData };
    if (
      text == "unitPrice" ||
      text == "mmaxDiscountValuea" ||
      text == "maxGreenCredit" ||
      text == "discountedUnitPrice" ||
      text == "priority" ||
      text == "categoryID" ||
      text == "brandID"
    ) {
      data[text] =
        value == NaN || value == undefined || value == ""
          ? null
          : parseInt(value);
    } else {
      if (text == "productImageUrl") {
        getBase64(value.files, (result) => {
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

  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  const getBase64 = (files, cb) => {
    const filePromises = Object.entries(files).map((item) => {
      return new Promise((resolve, reject) => {
        const [index, file] = item;
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = function (event) {
          // cb(`data:${file.type};base64,${btoa(event.target.result)}`);
          const arrayBuffer = event.target.result;
          // const uint8Array = new Uint8Array(arrayBuffer);
          // const base64String = btoa(String.fromCharCode(...uint8Array));
          const base64String = arrayBufferToBase64(arrayBuffer)
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
      const userId = getLocalStorage("id")
      productData.createdBy = `${userId}`;
      ProductController.createProduct(productData, (data) => {
        if (data.id) {
          toast.success("Creating Product successfully!", {
            position: "top-right",
          });
          getLandingProducts();
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
          setIsProductNew(false);
        } else {
          toast.warn("Something went wrong!", {
            position: "top-right",
          });
        }
      });
    }
  };

  const allProductData = useMemo(() => {
    let computedData = allProduct;
    const startIndex = (currentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, allProduct]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onClickEditProduct = (id, isEdit) => {
    setIsEditProduct(isEdit);
    ProductController.getProductDetail(id, (data) => {
      if (data.id) {
        var obj = { ...data };
        obj.imageName = "";
        obj.imageFileName = "";
        obj.brandID = brand.filter((v) => v.name == obj.brandName)[0]?.id;
        setPreviousInStock(obj.inStock);
        setEditProductData(obj);
      }
    });
  };

  const onClickEdit = () => {
    const userId = getLocalStorage("id")
    var obj = {
      id: editProductData.id,
      categoryID: parseInt(editProductData.categoryId),
      brandID: editProductData.brandID,
      name: editProductData.name,
      description: editProductData.description,
      unitPrice: editProductData.unitPrice,
      discountedUnitPrice: editProductData.discountedUnitPrice,
      maxDiscountValue: editProductData.maxDiscountValue,
      maxGreenCredit: editProductData.maxGreenCredit,
      maxPurchaseNo: editProductData.maxPurchaseNo,
      productImageUrl: editProductData.imageUrl,
      imageFileName: editProductData.imageFileName
        ? editProductData.imageFileName
        : "string",
      inStock: editProductData.inStock,
      priority: editProductData.priority,
      editBy: `${userId}`,
      isActive: true,
    };
    ProductController.updateProduct(obj, (data) => {
      toast.success("Update Successfully!", {
        position: "top-right",
      });
      setIsProductImageChange(false);
      setEditProductData(null);
      getLandingProducts();
      if (data.length > 0) {
        if (previousInStock == false && obj.inStock == true) {
          SupplierAdminController.getUserListWhoWishlistTheProduct(
            obj.id,
            async (userList) => {
              if (userList.length > 0) {
                await userList.map((u) => {
                  try {
                    fetch(`${baseUrl}/api/Email/send`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json;",
                      },

                      body: JSON.stringify({
                        toEmail: `${u.userEmail}`,
                        subject: "Your wish has come true!",
                        body: `<html><body><h4>Dear <b>${u.userName}</b>,</h4>
                            <p>The item <b>${data[0].productName}</b> is now available! You can now purchase it from our eShop:</p>
                            <br/>
                            <a href="https://feak.achieversprofile.com/eco2/shops/productsdetail/?productId=${data[0].productId}">https://feak.achieversprofile.com/eco2/shops/productsdetail/?productId=${data[0].productId}</a>
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
                        toast.success(`${u.userName} ${res}`, {
                          position: "top-right",
                        });
                      })
                      .catch((err) => console.log("email error =====>", err));
                  } catch (err) {
                    console.error(err);
                    toast.error("Something went wrong!");
                  }
                });
                SupplierAdminController.removeAllWishlistWhenProductInstock(
                  obj.id,
                  (data) => {}
                );
              }
            }
          );
        }
      }
    });
  };

  const onChangeEditInfo = (text, value) => {
    const newData = { ...editProductData };
    if (
      text == "unitPrice" ||
      text == "maxDiscountValue" ||
      text == "maxGreenCredit" ||
      text == "discountedUnitPrice" ||
      text == "categoryID" ||
      text == "maxPurchaseNo" ||
      text == "priority"
    ) {
      newData[text] =
        value == NaN || value == undefined || value == ""
          ? null
          : parseInt(value);
    } else {
      if (text == "imageName") {
        getBase64(value.files, (result) => {
          newData.imageUrl = result;
        });
        newData.imageName = value.value;
        newData.imageFileName = value.files[0].name;
      } else {
        newData[text] = value;
      }
    }
    setEditProductData(newData);
  };

  const onClickRemove = (id) => {
    var obj = {
      actorId: userInfo.userId,
      recordId: id,
    };
    ProductController.deleteProduct(obj, (data) => {
      getLandingProducts();
    });
  };
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <div style={{ width: "95%", margin: "0px auto" }}>
        {isMobile ? (
          <h5 style={{ marginTop: 20 }}> Manage Product</h5>
        ) : (
          <h4 style={{ marginTop: 20 }}> Manage Product</h4>
        )}
        {isProductNew ? (
          <div
            style={{
              width: "90%",
              margin: "30px auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              className="btn btn-info"
              style={{
                color: color.white,
                width: 120,
                alignSelf: "flex-end",
              }}
              onClick={() => setIsProductNew(false)}
            >
              Back to List
            </button>
            {isMobile ? (
              <h5 style={{ marginTop: 20, fontSize: "1.1rem" }}>
                Create Product
              </h5>
            ) : (
              <h5 style={{ marginTop: 20 }}>Create Product</h5>
            )}
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
                  onChange={(e) =>
                    onChangeInfo("maxDiscountValue", e.target.value)
                  }
                />
              </div>
              <div
                className="col-md-6 col-12 px-3 mx-auto"
                style={{ paddingTop: 10 }}
              >
                <label for="DiscountPrice" class="form-label">
                  Discount Price:
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="DiscountPrice"
                  placeholder="Discount Price"
                  value={productData.discountedUnitPrice}
                  onChange={(e) =>
                    onChangeInfo("discountedUnitPrice", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row">
              {maxPurchase ? (
                <div
                  className="col-md-6 col-12 px-3 mx-auto"
                  style={{ paddingTop: 10, display: "flex" }}
                >
                  <div style={{ width: "80%" }}>
                    <label for="MaxPurchaseNo" class="form-label">
                      Max Purchase No:
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="MaxPurchaseNo"
                      placeholder="Number"
                      value={productData.maxPurchaseNo}
                      onChange={(e) =>
                        onChangeInfo("maxPurchaseNo", e.target.value)
                      }
                    />
                  </div>
                  <div
                    className="d-flex align-items-end justify-content-center"
                    style={{ width: "20%" }}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setMaxPurchase(false);
                        var newData = { ...productData };
                        newData["maxPurchaseNo"] = null;
                        setProductData(newData);
                      }}
                      style={{ fontSize: 12 }}
                    >
                      Unlimited
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="col-md-6 col-12 px-3 mx-auto"
                  style={{ paddingTop: 10, display: "flex" }}
                >
                  <div style={{ width: "80%" }}>
                    <label for="MaxPurchaseNo1" class="form-label">
                      Max Purchase No:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="MaxPurchaseNo1"
                      disabled
                      value={"Any amount"}
                    />
                  </div>
                  <div
                    className="d-flex align-items-end justify-content-center"
                    style={{ width: "20%" }}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setMaxPurchase(true);
                        var newData = { ...productData };
                        newData["maxPurchaseNo"] = null;
                        setProductData(newData);
                      }}
                      style={{ fontSize: 12 }}
                    >
                      Set Limit
                    </button>
                  </div>
                </div>
              )}
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
                  onChange={(e) =>
                    onChangeInfo("maxGreenCredit", e.target.value)
                  }
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
                <label for="FormFile" class="form-label">
                  Product Image
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="FormFile"
                  // name={newProductData.imageFileName.split(/(\\|\/)/g).pop()}
                  value={productData.imageName}
                  onChange={(e) => onChangeInfo("productImageUrl", e.target)}
                ></input>
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

            <button
              type="button"
              className="btn btn-success"
              style={{ width: 150, marginTop: 20, alignSelf: "flex-end" }}
              onClick={onClickCreate}
            >
              Create
            </button>
          </div>
        ) : (
          <div className="d-flex flex-column">
            <div
              style={{
                display: "flex",
                flexDirection: 'row',
                justifyContent: "flex-end",
                alignItems: 'flex-end',
                flexWrap: 'wrap',
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
                  onChange={(e) => onSelectBrandName(e.target.value)}
                >
                  <option value={"All"}>All Brand</option>
                  {brand.map((value, index) => (
                    <option key={index} value={value.name}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="btn btn-info"
                style={{
                  color: color.white,
                  width: 120,
                  height: 40
                  // alignSelf: "flex-end",
                }}
                onClick={() => setIsProductNew(true)}
              >
                Create New
              </button>
            </div>

            <div class="table-responsive" style={{ margin: "30px 0px" }}>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">ID</th>
                    <th scope="col">Product Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Discount Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Instock</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allProductData.map((v, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{v.id}</td>
                      <td>
                        <Image
                          alt=""
                          src={baseUrl + v.imageUrl}
                          width={50}
                          height={50}
                        />
                      </td>
                      <td>
                        <p
                          data-bs-toggle="modal"
                          data-bs-target="#productAdminModal"
                          onClick={() => onClickEditProduct(v.id, false)}
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                            color: color.skyBlue,
                          }}
                        >
                          {v.name}
                        </p>
                      </td>
                      <td>{v.unitPrice}</td>
                      <td>
                        {v.discountedUnitPrice ? v.discountedUnitPrice : 0}
                      </td>
                      <td>{v.brandName}</td>
                      <td>{v.inStock ? "In stock" : "Out of stock"}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          style={{
                            color: color.white,
                            marginRight: 10,
                            width: 70,
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#productAdminModal"
                          onClick={() => {
                            onClickEditProduct(v.id, true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteAdminModal"
                          style={{ color: color.white, width: 70 }}
                          onClick={() => {
                            setRemoveClick({
                              id: v.id,
                              text: v.name,
                            });
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                items={allProduct.length} // 12
                currentPage={currentPage} // 1
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        )}
      </div>
      <div
        class="modal fade"
        id="productAdminModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabelProductAdmin"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div class={isEditProduct ? "modal-dialog modal-xl" : "modal-dialog"}>
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabelProductAdmin">
                {isEditProduct ? "Update Product" : "Product Detail"}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setEditProductData(null);
                  setIsProductImageChange(false);
                  setPreviousInStock(true);
                }}
              ></button>
            </div>
            <div class="modal-body">
              <div style={{ width: "95%", margin: "0px auto" }}>
                {isEditProduct ? (
                  <div>
                    <div className="row">
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="ProductNameEdit" class="form-label">
                          Product Name:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="ProductNameEdit"
                          placeholder="Product Name"
                          value={editProductData?.name}
                          onChange={(e) => {
                            onChangeEditInfo("name", e.target.value);
                          }}
                        />
                      </div>
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="PriceEdit" class="form-label">
                          Unit Price:
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="PriceEdit"
                          placeholder="Unit Price"
                          value={editProductData?.unitPrice}
                          onChange={(e) => {
                            onChangeEditInfo("unitPrice", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="DiscountEdit" class="form-label">
                          Max Discount Value:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="DiscountEdit"
                          placeholder="Max Discount Value"
                          value={editProductData?.maxDiscountValue}
                          onChange={(e) => {
                            onChangeEditInfo(
                              "maxDiscountValue",
                              e.target.value
                            );
                          }}
                        />
                      </div>
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="DiscountUnitPriceEdit" class="form-label">
                          Discount Unit Price:
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="DiscountUnitPriceEdit"
                          placeholder="Discount Unit Price"
                          value={editProductData?.discountedUnitPrice}
                          onChange={(e) => {
                            onChangeEditInfo(
                              "discountedUnitPrice",
                              e.target.value
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="MaxPurchaseNoEdit" class="form-label">
                          Max Purchase No:
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="MaxPurchaseNoEdit"
                          placeholder="Number"
                          value={editProductData?.maxPurchaseNo}
                          onChange={(e) => {
                            onChangeEditInfo("maxPurchaseNo", e.target.value);
                          }}
                        />
                      </div>
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="CreditEdit" class="form-label">
                          Max Green Credit:
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="CreditEdit"
                          placeholder="Max Green Credit"
                          value={editProductData?.maxGreenCredit}
                          onChange={(e) => {
                            onChangeEditInfo("maxGreenCredit", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="CategoryEdit" class="form-label">
                          Category:
                        </label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          value={editProductData?.categoryId}
                          onChange={(e) => {
                            onChangeEditInfo("categoryId", e.target.value);
                          }}
                        >
                          {category.length > 0
                            ? category.map((value, index) => (
                                <option
                                  key={index}
                                  value={value.id}
                                  selected={
                                    value.id == editProductData?.categoryId
                                      ? true
                                      : false
                                  }
                                >
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
                          value={editProductData?.brandID}
                          onChange={(e) =>
                            onChangeEditInfo("brandID", e.target.value)
                          }
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
                        <label for="PriorityEdit" class="form-label">
                          Priority:
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="PriorityEdit"
                          placeholder="Priority"
                          value={editProductData?.priority}
                          onChange={(e) => {
                            onChangeEditInfo("priority", e.target.value);
                          }}
                        />
                      </div>
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="DescriptionEdit" class="form-label">
                          Description:
                        </label>
                        <textarea
                          type="text"
                          class="form-control"
                          id="DescriptionEdit"
                          placeholder="Description"
                          value={editProductData?.description}
                          onChange={(e) => {
                            onChangeEditInfo("description", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        {!isEditProduct ? (
                          <>
                            <label for="ProductImageView" class="form-label">
                              Product Image
                            </label>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                alt=""
                                src={baseUrl + editProductData?.imageUrl}
                                width={120}
                                height={120}
                              />
                            </div>
                          </>
                        ) : isProductImageChange ? (
                          <div>
                            <label for="FormFileEdit" class="form-label">
                              Product Image
                            </label>
                            <input
                              class="form-control"
                              type="file"
                              id="FormFileEdit"
                              value={editProductData?.imageName}
                              onChange={(e) => {
                                onChangeEditInfo("imageName", e.target);
                              }}
                            ></input>
                          </div>
                        ) : (
                          <>
                            <label for="ProductImageEdit" class="form-label">
                              Product Image
                            </label>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                alt=""
                                src={baseUrl + editProductData?.imageUrl}
                                width={120}
                                height={120}
                              />
                              <button
                                className="btn btn-info"
                                style={{ color: color.white, marginLeft: 20 }}
                                onClick={() => setIsProductImageChange(true)}
                              >
                                Change
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className="col-md-6 col-12 px-3"
                        style={{ paddingTop: 10 }}
                      >
                        <p>Instock</p>
                        <div className="d-flex flex-column">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault30"
                              id="Yes30"
                              checked={
                                editProductData?.inStock == true ? true : false
                              }
                              onClick={() => {
                                onChangeEditInfo("inStock", true);
                              }}
                            />
                            <label class="form-check-label" for="Yes30">
                              Yes
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault30"
                              id="No30"
                              checked={
                                editProductData?.inStock == false ? true : false
                              }
                              onClick={() => {
                                onChangeEditInfo("inStock", false);
                              }}
                            />
                            <label class="form-check-label" for="No30">
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Product Image:</p>
                      <div style={{ flex: 3 }}>
                        <Image
                          alt=""
                          src={baseUrl + editProductData?.imageUrl}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Product Name:</p>
                      <p style={{ flex: 3 }}>{editProductData?.name}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Unit Price:</p>
                      <p style={{ flex: 3 }}>{editProductData?.unitPrice}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Discount Price:</p>
                      <p style={{ flex: 3 }}>
                        {editProductData?.discountedUnitPrice
                          ? editProductData?.discountedUnitPrice
                          : 0}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Max Discount Value:</p>
                      <p style={{ flex: 3 }}>
                        {editProductData?.maxDiscountValue}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Max Green Credit:</p>
                      <p style={{ flex: 3 }}>
                        {editProductData?.maxGreenCredit}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Max Purchase No:</p>
                      <p style={{ flex: 3 }}>
                        {editProductData?.maxPurchaseNo
                          ? editProductData?.maxPurchaseNo
                          : "Any Amount"}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Category:</p>
                      <p style={{ flex: 3 }}>
                        {
                          category.filter(
                            (v) => v.id == editProductData?.categoryId
                          )[0]?.name
                        }
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Brand Name:</p>
                      <p style={{ flex: 3 }}>{editProductData?.brandName}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Priority:</p>
                      <p style={{ flex: 3 }}>{editProductData?.priority}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Description:</p>
                      <p style={{ flex: 3 }}>{editProductData?.description}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Instock:</p>
                      <p style={{ flex: 3 }}>
                        {editProductData?.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {isEditProduct ? (
              <div class="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  style={{ width: 120, marginTop: 20, alignSelf: "flex-end" }}
                  onClick={() => onClickEdit()}
                >
                  Edit
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="deleteAdminModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabelDeleteAdmin"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabelDeleteAdmin">
                Product
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setEditProductData(null);
                  setRemoveClick({ text: "", id: "" });
                }}
              ></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: 16, fontWeight: "bold" }}>
                Are you sure you want to delete &quot;{removeClick.text}&quot;?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                style={{ width: 80, alignSelf: "flex-end" }}
                onClick={() => onClickRemove(removeClick.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
