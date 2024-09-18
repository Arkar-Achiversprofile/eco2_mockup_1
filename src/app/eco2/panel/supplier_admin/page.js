"use client";
import React, { useContext, useMemo, useState } from "react";
import NavBar from "../../../components/NavBar";
import { color } from "../../../components/color";
import AppContext from "../../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrandController,
  CategoryController,
  ProductController,
  SupplierAdminController,
} from "../../../controller";
import moment from "moment";
import Pagination from "../../../components/Pagination";
import { getLocalStorage } from "../../../api/localStorage";
import Image from "next/image";
import { baseUrl, imageUrl } from "../../../controller/baseUrl";

export default function SupplierAdminPanel() {
  const { isMobile, isTablet, userInfo } = useContext(AppContext);
  const [tab, setTab] = useState(0);
  const [removeClick, setRemoveClick] = useState({
    title: "",
    text: "",
    id: 0,
  });

  //Brand
  const [brandData, setBrandData] = useState([]);
  const [newBrandData, setNewBrandData] = useState({
    name: "",
    companyUEN: "",
    brandEmail: "",
    logoPath: "",
    deliveryFee: 0,
    freeShoppingAmount: 0,
    createdBy: "",
    isActive: true,
  });
  const [logoChange, setLogoChange] = useState(false);
  const [editBrandData, setEditBrandData] = useState({
    id: 0,
    name: "",
    companyUEN: "",
    brandEmail: "",
    logoPath: "",
    newImage: "",
    logoFileName: "",
    deliveryFee: 0,
    freeShoppingAmount: 0,
    createdBy: "",
    editedBy: "",
    isActive: null,
  });
  const [isBrandNew, setIsBrandNew] = useState(false);
  //Brand

  //Collection
  const [collection, setCollection] = useState([]);
  const [brandNameForCollection, setBrandNameForCollection] = useState({});
  const [collectionCurrentPage, setCollectionCurrentpage] = useState(1);
  const [isCollectionNew, setIsCollectionNew] = useState(false);
  const [newCollectionData, setNewCollectionData] = useState({
    brandID: 0,
    address: "",
    instructions: "",
    createdBy: "",
    isActive: true,
  });
  const [editCollectionData, setEditCollectionData] = useState(null);
  //Collection

  //Product
  const [productList, setProductList] = useState([]);
  const [isProductNew, setIsProductNew] = useState(false);
  const [brandNameAndIdForProduct, setBrandNameAndIdForProduct] = useState({});
  const [productCurrentPage, setProductCurrentpage] = useState(1);
  const [newProductData, setNewProductData] = useState({
    categoryID: 0,
    brandID: 0,
    name: "",
    description: "",
    unitPrice: null,
    maxDiscountValue: 0,
    maxGreenCredit: 0,
    categoryImageUrl: null,
    discountedUnitPrice: null,
    maxPurchaseNo: null,
    productImageUrl: "",
    imageName: "",
    imageFileName: "",
    priority: null,
    inStock: true,
    isActive: true,
    createdBy: "",
  });
  const [maxPurchase, setMaxPurchase] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [isProductImageChange, setIsProductImageChange] = useState(false);
  const [category, setCategory] = useState([]);
  const [previousInStock, setPreviousInStock] = useState(true);
  //Product

  //Transaction
  const [transaction, setTransaction] = useState([]);
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [closedTransaction, setClosedTransaction] = useState([]);
  const [closedCurrentPage, setClosedCurrentPage] = useState(1);
  //Transaction
  const pageSize = 10;

  const getTransactionBySupplierId = () => {
    const id = getLocalStorage("id");
    SupplierAdminController.getTransactionBySupplierId(id, (data) => {
      if (data.length > 0) {
        data.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
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

  const getCategories = () => {
    CategoryController.getLowestCategories((data) => {
      if (data.length > 0) {
        setCategory(data);
      }
    });
  };

  const onClickTabs = (value) => {
    if (value == 1) {
      getBrandRecord();
      setIsProductNew(false);
      setIsCollectionNew(false);
    } else if (value == 2) {
      getCollectionRecord();
      setIsBrandNew(false);
      setIsProductNew(false);
    } else if (value == 3) {
      getProductBySupplierId();
      getCategories();
      setIsBrandNew(false);
      setIsCollectionNew(false);
    } else if (value == 4) {
      getTransactionBySupplierId();
    } else if (value == 5) {
      getClosedTransaction();
    }
    setTab(value);
  };

  const onChangeBrandInfo = (text, value) => {
    const data = { ...newBrandData };
    data[text] =
      text == "deliveryFee" || text == "freeShoppingAmount"
        ? parseInt(value)
        : value;
    setNewBrandData(data);
  };

  const onChangeEditBrandInfo = (text, value) => {
    const data = { ...editBrandData };
    if (text == "newImage") {
      getBase64(value.files, (result) => {
        data.logoPath = result;
      });
      data.newImage = value.value;
      data.logoFileName = value.files[0].name;
    } else {
      data[text] =
        text == "deliveryFee" || text == "freeShoppingAmount"
          ? parseInt(value)
          : value;
    }
    setEditBrandData(data);
  };

  const onClickCreate = (type) => {
    if (type == "brand") {
      if (newBrandData.name == "") {
        toast.warn("Please write Brand Name!", {
          position: "top-right",
        });
      } else if (newBrandData.companyUEN == "") {
        toast.warn("Please write Company UEN!", {
          position: "top-right",
        });
      } else if (newBrandData.brandEmail == "") {
        toast.warn("Please write Email!", {
          position: "top-right",
        });
      } else if (newBrandData.logoPath == "") {
        toast.warn("Please choose Brand Logo!", {
          position: "top-right",
        });
      } else if (newBrandData.deliveryFee == null) {
        toast.warn("Please set Delivery Fee!", {
          position: "top-right",
        });
      } else if (newBrandData.freeShoppingAmount == null) {
        toast.warn("Please set Free Shopping Amount!", {
          position: "top-right",
        });
      } else {
        newBrandData.createdBy = userInfo.userName;
        BrandController.createBrand(newBrandData, (data) => {
          if (data.id) {
            toast.success("Create brand successfully!", {
              position: "top-right",
            });
            setIsBrandNew(false);
            setNewBrandData({
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
    } else if (type == "collection") {
      if (newCollectionData.address == "") {
        toast.warn("Please fill Address!", {
          position: "top-right",
        });
      } else if (newCollectionData.instructions == "") {
        toast.warn("Please fill Instructions!", {
          position: "top-right",
        });
      } else {
        newCollectionData.createdBy = `${userInfo.userId}`;
        SupplierAdminController.createCollectionBySupplier(
          newCollectionData,
          (data) => {
            if (data.brandID) {
              toast.success("Creating Collection for Brand successfully!", {
                position: "top-right",
              });
              getCollectionRecord();
              setIsCollectionNew(false);
              setNewCollectionData({
                brandID: newCollectionData.brandID,
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
          }
        );
      }
    } else if (type == "product") {
      if (newProductData.name == "") {
        toast.warn("Please enter Product Name!", {
          position: "top-right",
        });
      } else if (newProductData.unitPrice == null) {
        toast.warn("Please set Unit Price!", {
          position: "top-right",
        });
      } else if (newProductData.productImageUrl == "") {
        toast.warn("Please choose Product Image!", {
          position: "top-right",
        });
      } else if (
        newProductData.priority == 0 ||
        newProductData.priority == null
      ) {
        toast.warn("Please set Priority!", {
          position: "top-right",
        });
      } else if (newProductData.categoryID == 0) {
        toast.warn("Please choose Category!", {
          position: "top-right",
        });
      } else {
        newProductData.createdBy = userInfo.userName;
        newProductData.brandID = brandNameAndIdForProduct.id;
        // console.log("product", newProductData);
        ProductController.createProduct(newProductData, (data) => {
          if (data.id) {
            toast.success("Creating Product successfully!", {
              position: "top-right",
            });
            setIsProductNew(false);
            setNewProductData({
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
              imageName: "",
              imageFileName: "",
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
    }
  };

  const onClickEdit = (type) => {
    if (type == "brand") {
      const obj = {
        id: editBrandData.id,
        name: editBrandData.name,
        brandEmail: editBrandData.brandEmail,
        companyUEN: editBrandData.companyUEN,
        logoPath: editBrandData.logoPath,
        logoFileName: editBrandData.logoFileName,
        deliveryFee: editBrandData.deliveryFee,
        freeShoppingAmount: editBrandData.freeShoppingAmount,
        createdBy: `${userInfo.userId}`,
        // editedBy: userInfo.userName,
        isActive: true,
      };
      SupplierAdminController.updateBrandBySupplier(obj, (data) => {
        if (data.id) {
          toast.success("Update your brand successfully!", {
            position: "top-right",
          });
          setLogoChange(false);
          setEditBrandData({
            id: 0,
            name: "",
            companyUEN: "",
            brandEmail: "",
            logoPath: "",
            newImage: "",
            logoFileName: "",
            deliveryFee: 0,
            freeShoppingAmount: 0,
            collectionLocationQueryDtos: [],
            createdBy: "",
            isActive: null,
          });
          setTab(0);
        }
      });
    } else if (type == "collection") {
      editCollectionData.createdBy = `${userInfo.userId}`;
      editCollectionData.brandID = brandNameForCollection.id;
      SupplierAdminController.editCollectionBySupplier(
        editCollectionData,
        (data) => {
          if (data.id) {
            toast.success("Updating Collection for Brand successfully!", {
              position: "top-right",
            });
            getCollectionRecord();
            setEditCollectionData(null);
          } else {
            toast.error("Something went wrong!", {
              position: "top-right",
            });
          }
        }
      );
    } else if (type == "product") {
      var obj = {
        id: editProductData.id,
        categoryID: parseInt(editProductData.categoryId),
        brandID: brandNameAndIdForProduct.id,
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
        editBy: `${userInfo.userId}`,
        isActive: true,
      };
      SupplierAdminController.updateProductBySupplier(obj, (data) => {
        toast.success("Update Successfully!", {
          position: "top-right",
        });
        setIsProductImageChange(false);
        setEditProductData(null);
        getProductBySupplierId();
        if (data.length > 0) {
          if (previousInStock == false && obj.inStock == true) {
            SupplierAdminController.getUserListWhoWishlistTheProduct(
              obj.id,
              async (userList) => {
                if (userList.length > 0) {
                  await userList.map((u) => {
                    try {
                      fetch(`${baseUrl}Email/send`, {
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
    }
  };

  const getBrandRecord = () => {
    const id = getLocalStorage("id");
    SupplierAdminController.getBrandRecord(id, (data) => {
      if (data.name) {
        var array = [];
        array.push(data);
        setBrandData(array);
      } else {
        toast.warn("You don't have your brand created yet. Please create one", {
          position: "top-right",
        });
      }
    });
  };

  const onClickEditBrand = (data) => {
    var newData = { ...editBrandData };
    newData.id = data.id;
    newData.name = data.name;
    newData.companyUEN = data.companyUEN;
    newData.brandEmail = data.brandEmail;
    newData.logoPath = data.logoPath;
    newData.deliveryFee = data.deliveryFee;
    newData.freeShoppingAmount = data.freeShoppingAmount;
    setEditBrandData(newData);
  };

  const onClickRemoveBrand = (brandId) => {
    var obj = {
      actorId: userInfo.userId,
      recordId: brandId,
    };
    SupplierAdminController.deleteBrandBySupplier(obj, (data) => {
      getBrandRecord();
    });
  };

  const getCollectionRecord = () => {
    const id = getLocalStorage("id");
    SupplierAdminController.getBrandRecord(id, (data) => {
      if (data.id) {
        var newC = { ...newCollectionData };
        newC.brandID = data.id;
        var array = [];

        data.collectionLocationQueryDtos.length > 0 &&
          data.collectionLocationQueryDtos.map((v) => {
            var obj = {};
            obj.id = v.id;
            obj.address = v.address;
            obj.instructions = v.instructions;
            obj.isActive = true;
            array.push(obj);
          });
        console.log("data", data);
        setNewCollectionData(newC);
        setBrandNameForCollection({ id: data.id, name: data.name });
        setCollection(array);
      }
    });
  };

  const onChangeNewCollectionInfo = (text, value) => {
    const data = { ...newCollectionData };
    data[text] = value;
    setNewCollectionData(data);
  };

  const onChangeEditCollectionInfo = (text, value) => {
    const newData = { ...editCollectionData };
    newData[text] = value;
    setEditCollectionData(newData);
  };

  const onClickRemoveCollection = (collectionId) => {
    var obj = {
      actorId: userInfo.userId,
      recordId: collectionId,
    };
    SupplierAdminController.deleteCollectionBySupplier(obj, (data) => {
      getCollectionRecord();
    });
  };

  const collectionData = useMemo(() => {
    let computedData = collection;
    const startIndex = (collectionCurrentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [collectionCurrentPage, collection]);

  const onPageChangeCollection = (page) => {
    setCollectionCurrentpage(page);
  };

  const getProductBySupplierId = () => {
    const id = getLocalStorage("id");
    SupplierAdminController.getBrandRecord(id, (data) => {
      if (data.name) {
        setBrandNameAndIdForProduct({ id: data.id, name: data.name });
        SupplierAdminController.getProductBySupplierId(id, (data) => {
          if (data.length > 0) {
            setProductList(data);
          } else {
            toast.warn("There is no product created yet.", {
              position: "top-right",
            });
          }
        });
      } else {
        toast.warn(
          "You have to create your brand to make product. Please create your brand in 'Manage Brand'",
          {
            position: "top-right",
          }
        );
      }
    });
  };

  const productData = useMemo(() => {
    let computedData = productList;
    const startIndex = (productCurrentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [productCurrentPage, productList]);

  const onChangeProductInfo = (text, value, isNew = true) => {
    if (isNew) {
      const data = { ...newProductData };
      if (
        text == "unitPrice" ||
        text == "maxDiscountValue" ||
        text == "maxGreenCredit" ||
        text == "maxPurchaseNo" ||
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

      setNewProductData(data);
    } else {
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
    }
  };

  const getBase64 = (files, cb) => {
    const filePromises = Object.entries(files).map((item) => {
      return new Promise((resolve, reject) => {
        const [index, file] = item;
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = function (event) {
          const arrayBuffer = event.target.result;
          const uint8Array = new Uint8Array(arrayBuffer);
          const base64String = btoa(String.fromCharCode(...uint8Array));
          // cb(`data:${file.type};base64,${btoa(event.target.result)}`);

          resolve(`${base64String}`);
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
        cb(res[0]);
      })
      .catch((error) => {
        console.log(error);
        console.log("something wrong happened");
      });
  };

  const onClickEditProduct = (id, isEdit) => {
    setIsEditProduct(isEdit);
    SupplierAdminController.getProductDetailBySupplierId(id, (data) => {
      if (data.id) {
        var obj = { ...data };
        obj.imageName = "";
        obj.imageFileName = "";
        setPreviousInStock(obj.inStock);
        setEditProductData(obj);
      }
    });
  };

  const onClickRemove = (id, type) => {
    if (type == "product") {
      var obj = {
        actorId: userInfo.userId,
        recordId: id,
      };
      SupplierAdminController.deleteProductBySupplier(obj, (data) => {
        getProductBySupplierId();
      });
    }
  };

  const onPageChangeProduct = (page) => {
    setProductCurrentpage(page);
  };

  const onClickDetail = (id) => {
    SupplierAdminController.getTransactionDetailByPurchasedBrandId(
      id,
      (data) => {
        setTransactionDetail(data);
      }
    );
  };

  const onClickNextStage = (transactionHistoryId, status, detail) => {
    SupplierAdminController.updateTransactionStatusBySupplier(
      transactionHistoryId,
      (data) => {
        if (data.transactionHistoryId > 0) {
          toast.success("Status update successful!", {
            position: "top-right",
          });
          getTransactionBySupplierId();
          if (status == "Fulfilled") {
            try {
              fetch(`${baseUrl}Email/send`, {
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
                  try {
                    fetch(`${baseUrl}Email/send`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json;",
                      },
                      body: JSON.stringify({
                        toEmail: `${detail.buyerEmail}`,
                        subject: "Please give us your feedback!",
                        body: `<html><body><h4>Dear <b>${detail.buyerName}</b>,</h4>
                                <p>We hope you are happy your purchase/s. Do share your feedback with us:</p>
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
      {isMobile ? (
        <h5 style={{ marginTop: 20, marginLeft: 20, fontWeight: "bold" }}>
          Supplier Admin Panel
        </h5>
      ) : (
        <h4 style={{ marginTop: 20, marginLeft: 20, fontWeight: "bold" }}>
          Supplier Admin Panel
        </h4>
      )}

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
          Manage Brand
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
          Manage Collection
        </button>
        <button
          type="button"
          class="btn btn-info"
          style={{
            color: tab == 3 ? color.skyBlue : color.white,
            width: 180,
            fontSize: 14,
            backgroundColor: tab == 3 ? color.white : "",
            margin: "5px 10px",
          }}
          onClick={() => onClickTabs(3)}
        >
          Manage Product
        </button>
        <button
          type="button"
          class="btn btn-info"
          style={{
            color: tab == 4 ? color.skyBlue : color.white,
            width: 180,
            fontSize: 14,
            backgroundColor: tab == 4 ? color.white : "",
            margin: "5px 10px",
          }}
          onClick={() => onClickTabs(4)}
        >
          Manage Transaction
        </button>
        <button
          type="button"
          class="btn btn-info"
          style={{
            color: tab == 5 ? color.skyBlue : color.white,
            width: 180,
            fontSize: 14,
            backgroundColor: tab == 5 ? color.white : "",
            margin: "5px 10px",
          }}
          onClick={() => onClickTabs(5)}
        >
          Closed Transaction
        </button>
      </div>
      {tab == 1 ? (
        <div style={{ width: "95%", margin: "0px auto" }}>
          {isMobile ? (
            <h5 style={{ marginTop: 20 }}> Manage Brand</h5>
          ) : (
            <h4 style={{ marginTop: 20 }}> Manage Brand</h4>
          )}
          {isBrandNew ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: isMobile ? "90%" : isTablet ? "60%" : "50%",
                margin: "30px auto",
              }}
            >
              <button
                className="btn btn-info"
                style={{
                  color: color.white,
                  width: 120,
                  alignSelf: "flex-end",
                }}
                onClick={() => setIsBrandNew(false)}
              >
                Back to List
              </button>
              <div className="" style={{ paddingTop: 10 }}>
                <label for="supplierBrand" class="form-label">
                  Brand Name:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="supplierBrand"
                  placeholder="Brand"
                  value={newBrandData.name}
                  onChange={(e) => onChangeBrandInfo("name", e.target.value)}
                />
              </div>
              <div className="" style={{ paddingTop: 10 }}>
                <label for="supplierCompany" class="form-label">
                  Company UEN:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="supplierCompany"
                  placeholder="Company UEN"
                  value={newBrandData.companyUEN}
                  onChange={(e) =>
                    onChangeBrandInfo("companyUEN", e.target.value)
                  }
                />
              </div>
              <div className="" style={{ paddingTop: 10 }}>
                <label for="supplierBrandEmail" class="form-label">
                  Brand Email:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="supplierBrandEmail"
                  placeholder="Email"
                  value={newBrandData.brandEmail}
                  onChange={(e) =>
                    onChangeBrandInfo("brandEmail", e.target.value)
                  }
                />
              </div>
              <div className="" style={{ paddingTop: 10 }}>
                <label for="supplierLogo" class="form-label">
                  Brand Logo
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="supplierLogo"
                  accept="image/*"
                  value={newBrandData.logoPath}
                  onChange={(e) =>
                    onChangeBrandInfo("logoPath", e.target.value)
                  }
                ></input>
              </div>
              <div className="" style={{ paddingTop: 10 }}>
                <label for="supplierDeliveryFee" class="form-label">
                  Delivery Fee:
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="supplierDeliveryFee"
                  placeholder="Delivery Fee"
                  value={newBrandData.deliveryFee}
                  onChange={(e) =>
                    onChangeBrandInfo("deliveryFee", e.target.value)
                  }
                />
              </div>
              <div className="" style={{ paddingTop: 10 }}>
                <label for="supplierAmount" class="form-label">
                  Free Shipping Amount:
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="supplierAmount"
                  placeholder="Amount"
                  value={newBrandData.freeShoppingAmount}
                  onChange={(e) =>
                    onChangeBrandInfo("freeShoppingAmount", e.target.value)
                  }
                />
              </div>
              <div className="" style={{ paddingTop: 10 }}>
                <label>Is Active:</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault10"
                    id="Yes10"
                    checked={newBrandData.isActive == true ? true : false}
                    onClick={() => onChangeBrandInfo("isActive", true)}
                  />
                  <label class="form-check-label" for="Yes10">
                    Yes
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault10"
                    id="No10"
                    checked={newBrandData.isActive == false ? true : false}
                    onClick={() => onChangeBrandInfo("isActive", false)}
                  />
                  <label class="form-check-label" for="No10">
                    No
                  </label>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-success"
                style={{ width: 150, marginTop: 20, alignSelf: "flex-end" }}
                onClick={() => onClickCreate("brand")}
              >
                Create
              </button>

              {/* <div className="" style={{ paddingTop: 10 }}>
                      <label>Is Active:</label>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault11"
                          id="Yes11"
                          checked={brandData.isActive == true ? true : false}
                          onClick={() => onChangeEditBrandInfo("isActive", true)}
                        />
                        <label class="form-check-label" for="Yes11">
                          Yes
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault11"
                          id="No11"
                          checked={brandData.isActive == false ? true : false}
                          onClick={() => onChangeEditBrandInfo("isActive", false)}
                        />
                        <label class="form-check-label" for="No11">
                          No
                        </label>
                      </div>
                    </div> */}
              {/*  */}
            </div>
          ) : (
            <div className="d-flex flex-column">
              {brandData.length < 1 ? (
                <button
                  className="btn btn-info"
                  style={{ color: color.white, alignSelf: "flex-end" }}
                  onClick={() => setIsBrandNew(true)}
                >
                  Create New
                </button>
              ) : null}

              {brandData.length > 0 ? (
                <div class="table-responsive" style={{ margin: "30px 0px" }}>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">ID</th>
                        <th scope="col">Brand Logo</th>
                        <th scope="col">Brand Name</th>
                        <th scope="col">Company UEN</th>
                        <th scope="col">Email</th>
                        <th scope="col">Delivery Fee</th>
                        <th scope="col">Free Shipping Amount</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brandData.map((v, i) => (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{v.id}</td>
                          <td>
                            <Image
                              alt=""
                              src={imageUrl + v.logoPath}
                              width={50}
                              height={50}
                            />
                          </td>
                          <td>{v.name}</td>
                          <td>{v.companyUEN}</td>
                          <td>{v.brandEmail}</td>
                          <td>{v.deliveryFee}</td>
                          <td>{v.freeShoppingAmount}</td>
                          <td>
                            <button
                              className="btn btn-success btn-sm"
                              style={{
                                color: color.white,
                                marginRight: 10,
                                width: 70,
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#brandModal"
                              onClick={() => {
                                onClickEditBrand(v);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              style={{ color: color.white, width: 70 }}
                              onClick={() => {
                                onClickRemoveBrand(v.id);
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : tab == 2 ? (
        <div style={{ width: "95%", margin: "0px auto" }}>
          {isMobile ? (
            <h5 style={{ marginTop: 20 }}>Manage Collection</h5>
          ) : (
            <h4 style={{ marginTop: 20 }}>Manage Collection</h4>
          )}
          {isCollectionNew ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: isMobile ? "90%" : isTablet ? "60%" : "50%",
                margin: "30px auto",
              }}
            >
              <button
                className="btn btn-info"
                style={{
                  color: color.white,
                  width: 120,
                  alignSelf: "flex-end",
                }}
                onClick={() => setIsCollectionNew(false)}
              >
                Back to List
              </button>
              <h4 style={{ marginTop: 20 }}> Create Collection for Brand</h4>
              <div className="" style={{ paddingTop: 10 }}>
                <label for="supplierCollectionBrandId" class="form-label">
                  Brand Name:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="supplierCollectionBrandId"
                  defaultValue={brandNameForCollection?.name}
                  value={brandNameForCollection?.name}
                />
              </div>
              <div className="" style={{ paddingTop: 10 }}>
                <label for="supplierCollectionAddress" class="form-label">
                  Address:
                </label>
                <textarea
                  type="text"
                  class="form-control"
                  id="supplierCollectionAddress"
                  placeholder="Address"
                  value={newCollectionData.address}
                  onChange={(e) =>
                    onChangeNewCollectionInfo("address", e.target.value)
                  }
                />
              </div>
              <div className="" style={{ paddingTop: 10 }}>
                <label for="supplierCollectionInstructions" class="form-label">
                  Instructions:
                </label>
                <textarea
                  type="text"
                  class="form-control"
                  id="supplierCollectionInstructions"
                  placeholder="Instructions"
                  value={newCollectionData.instructions}
                  onChange={(e) =>
                    onChangeNewCollectionInfo("instructions", e.target.value)
                  }
                />
              </div>

              <div className="" style={{ paddingTop: 10 }}>
                <label>Is Active:</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault20"
                    id="Yes20"
                    checked={newCollectionData.isActive == true ? true : false}
                    onClick={() => onChangeNewCollectionInfo("isActive", true)}
                  />
                  <label class="form-check-label" for="Yes20">
                    Yes
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault20"
                    id="No20"
                    checked={newCollectionData.isActive == false ? true : false}
                    onClick={() => onChangeNewCollectionInfo("isActive", false)}
                  />
                  <label class="form-check-label" for="No20">
                    No
                  </label>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-success"
                style={{ width: 150, marginTop: 20, alignSelf: "flex-end" }}
                onClick={() => onClickCreate("collection")}
              >
                Create
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <button
                className="btn btn-info"
                style={{ color: color.white, alignSelf: "flex-end" }}
                onClick={() => setIsCollectionNew(true)}
              >
                Create New
              </button>
              <div class="table-responsive" style={{ margin: "30px 0px" }}>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">ID</th>
                      <th scope="col">Address</th>
                      <th scope="col">Instructions</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collectionData.map((v, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v.id}</td>
                        <td>{v.address}</td>
                        <td>{v.instructions}</td>
                        <td>
                          <button
                            className="btn btn-success btn-sm"
                            style={{
                              color: color.white,
                              marginRight: 10,
                              width: 70,
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#collectionModal"
                            onClick={() => {
                              setEditCollectionData(v);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            style={{ color: color.white, width: 70 }}
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            onClick={() => {
                              setRemoveClick({
                                title: "collection",
                                text: v.address,
                                id: v.id,
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
                  items={collection.length} // 12
                  currentPage={collectionCurrentPage} // 1
                  setCurrentPage={setCollectionCurrentpage}
                  pageSize={pageSize}
                  onPageChange={onPageChangeCollection}
                />
              </div>
            </div>
          )}
        </div>
      ) : tab == 3 ? (
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
                  <label for="supplierProductName" class="form-label">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="supplierProductName"
                    placeholder="Product Name"
                    value={newProductData.name}
                    onChange={(e) =>
                      onChangeProductInfo("name", e.target.value)
                    }
                  />
                </div>
                <div
                  className="col-md-6 col-12 px-3 mx-auto"
                  style={{ paddingTop: 10 }}
                >
                  <label for="supplierPrice" class="form-label">
                    Unit Price:
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="supplierPrice"
                    placeholder="Unit Price"
                    value={newProductData.unitPrice}
                    onChange={(e) =>
                      onChangeProductInfo("unitPrice", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div
                  className="col-md-6 col-12 px-3 mx-auto"
                  style={{ paddingTop: 10 }}
                >
                  <label for="supplierDiscount" class="form-label">
                    Max Discount Value:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="supplierDiscount"
                    placeholder="Max Discount Value"
                    value={newProductData.maxDiscountValue}
                    onChange={(e) =>
                      onChangeProductInfo("maxDiscountValue", e.target.value)
                    }
                  />
                </div>
                <div
                  className="col-md-6 col-12 px-3 mx-auto"
                  style={{ paddingTop: 10 }}
                >
                  <label for="supplierDiscountPrice" class="form-label">
                    Discount Price:
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="supplierDiscountPrice"
                    placeholder="Discount Price"
                    value={newProductData.discountedUnitPrice}
                    onChange={(e) =>
                      onChangeProductInfo("discountedUnitPrice", e.target.value)
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
                      <label for="supplierMaxPurchaseNo" class="form-label">
                        Max Purchase No:
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="supplierMaxPurchaseNo"
                        placeholder="Number"
                        value={newProductData.maxPurchaseNo}
                        onChange={(e) =>
                          onChangeProductInfo("maxPurchaseNo", e.target.value)
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
                          var newData = { ...newProductData };
                          newData["maxPurchaseNo"] = null;
                          setNewProductData(newData);
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
                      <label for="supplierMaxPurchaseNo1" class="form-label">
                        Max Purchase No:
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="supplierMaxPurchaseNo1"
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
                          var newData = { ...newProductData };
                          newData["maxPurchaseNo"] = null;
                          setNewProductData(newData);
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
                  <label for="supplierCredit" class="form-label">
                    Max Green Credit:
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="supplierCredit"
                    placeholder="Max Green Credit"
                    value={newProductData.maxGreenCredit}
                    onChange={(e) =>
                      onChangeProductInfo("maxGreenCredit", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="row">
                <div
                  className="col-md-6 col-12 px-3 mx-auto"
                  style={{ paddingTop: 10 }}
                >
                  <label for="supplierCategory" class="form-label">
                    Category:
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={newProductData.categoryID}
                    onChange={(e) =>
                      onChangeProductInfo("categoryID", e.target.value)
                    }
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
                  <label for="supplierPriority" class="form-label">
                    Priority:
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="supplierPriority"
                    placeholder="Priority"
                    value={newProductData.priority}
                    onChange={(e) =>
                      onChangeProductInfo("priority", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div
                  className="col-md-6 col-12 px-3 mx-auto"
                  style={{ paddingTop: 10 }}
                >
                  <label for="supplierFormFile" class="form-label">
                    Product Image
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="supplierFormFile"
                    // name={newProductData.imageFileName.split(/(\\|\/)/g).pop()}
                    value={newProductData.imageName}
                    onChange={(e) =>
                      onChangeProductInfo("productImageUrl", e.target)
                    }
                  ></input>
                </div>
                <div
                  className="col-md-6 col-12 px-3 mx-auto"
                  style={{ paddingTop: 10 }}
                >
                  <label for="supplierBrandProduct" class="form-label">
                    Brand:
                  </label>
                  <input
                    class="form-control"
                    type="text"
                    id="supplierBrandProduct"
                    value={brandNameAndIdForProduct?.name}
                    defaultValue={brandNameAndIdForProduct?.name}
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
                        name="flexRadioDefault11"
                        id="Yes11"
                        checked={newProductData.inStock == true ? true : false}
                        onClick={() => onChangeProductInfo("inStock", true)}
                      />
                      <label class="form-check-label" for="Yes11">
                        Yes
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault11"
                        id="No11"
                        checked={newProductData.inStock == false ? true : false}
                        onClick={() => onChangeProductInfo("inStock", false)}
                      />
                      <label class="form-check-label" for="No11">
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
                        name="flexRadioDefault12"
                        id="Yes12"
                        checked={newProductData.isActive == true ? true : false}
                        onClick={() => onChangeProductInfo("isActive", true)}
                      />
                      <label class="form-check-label" for="Yes12">
                        Yes
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault12"
                        id="No12"
                        checked={
                          newProductData.isActive == false ? true : false
                        }
                        onClick={() => onChangeProductInfo("isActive", false)}
                      />
                      <label class="form-check-label" for="No12">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 col-12 px-3 mx-auto"
                  style={{ paddingTop: 10 }}
                >
                  <label for="supplierDescription" class="form-label">
                    Description:
                  </label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="supplierDescription"
                    placeholder="Description"
                    value={newProductData.description}
                    onChange={(e) =>
                      onChangeProductInfo("description", e.target.value)
                    }
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn btn-success"
                style={{ width: 150, marginTop: 20, alignSelf: "flex-end" }}
                onClick={() => onClickCreate("product")}
              >
                Create
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <button
                className="btn btn-info"
                style={{
                  color: color.white,
                  width: 120,
                  alignSelf: "flex-end",
                }}
                onClick={() => setIsProductNew(true)}
              >
                Create New
              </button>

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
                    {productData.map((v, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v.id}</td>
                        <td>
                          <Image
                            alt=""
                            src={imageUrl + v.imageUrl}
                            width={50}
                            height={50}
                          />
                        </td>
                        <td>
                          <p
                            data-bs-toggle="modal"
                            data-bs-target="#productModal"
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
                            data-bs-target="#productModal"
                            onClick={() => {
                              onClickEditProduct(v.id, true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            style={{ color: color.white, width: 70 }}
                            onClick={() => {
                              onClickRemove(v.id, "product");
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
                  items={productList.length} // 12
                  currentPage={productCurrentPage} // 1
                  setCurrentPage={setProductCurrentpage}
                  pageSize={pageSize}
                  onPageChange={onPageChangeProduct}
                />
              </div>
            </div>
          )}
        </div>
      ) : tab == 4 ? (
        <div style={{ width: "95%", margin: "0px auto" }}>
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
                        data-bs-target="#transactionModal"
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
        </div>
      ) : tab == 5 ? (
        <div style={{ width: "95%", margin: "0px auto" }}>
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
                        data-bs-target="#transactionModal"
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
        </div>
      ) : null}
      <div
        class="modal fade"
        id="brandModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabelBrand"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabelBrand">
                Update Your Brand
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() =>
                  setEditBrandData({
                    id: 0,
                    name: "",
                    companyUEN: "",
                    brandEmail: "",
                    logoPath: "",
                    newImage: "",
                    logoFileName: "",
                    deliveryFee: 0,
                    freeShoppingAmount: 0,
                    createdBy: "",
                    editedBy: "",
                    isActive: null,
                  })
                }
              ></button>
            </div>
            <div class="modal-body">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: isMobile || isTablet ? "100%" : "80%",
                  margin: "0px auto",
                }}
              >
                <div className="" style={{ paddingTop: 10 }}>
                  <label for="supplierBrandEdit" class="form-label">
                    Brand Name:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="supplierBrandEdit"
                    placeholder="Brand"
                    value={editBrandData.name}
                    defaultValue={editBrandData.name}
                    onChange={(e) =>
                      onChangeEditBrandInfo("name", e.target.value)
                    }
                  />
                </div>
                <div className="" style={{ paddingTop: 10 }}>
                  <label for="supplierCompanyEdit" class="form-label">
                    Company UEN:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="supplierCompanyEdit"
                    placeholder="Company UEN"
                    value={editBrandData.companyUEN}
                    defaultValue={editBrandData.companyUEN}
                    onChange={(e) =>
                      onChangeEditBrandInfo("companyUEN", e.target.value)
                    }
                  />
                </div>
                <div className="" style={{ paddingTop: 10 }}>
                  <label for="supplierBrandEmailEdit" class="form-label">
                    Brand Email:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="supplierBrandEmailEdit"
                    placeholder="Email"
                    value={editBrandData.brandEmail}
                    defaultValue={editBrandData.brandEmail}
                    onChange={(e) =>
                      onChangeEditBrandInfo("brandEmail", e.target.value)
                    }
                  />
                </div>
                {logoChange ? (
                  <div className="" style={{ paddingTop: 10 }}>
                    <label for="supplierLogoEdit" class="form-label">
                      Brand Logo
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      id="supplierLogoEdit"
                      accept="image/*"
                      value={editBrandData.newImage}
                      onChange={(e) =>
                        onChangeEditBrandInfo("newImage", e.target)
                      }
                    ></input>
                  </div>
                ) : (
                  <div style={{ paddingTop: 10 }}>
                    <label for="supplierLogoEdit" class="form-label">
                      Brand Logo
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
                        src={imageUrl + editBrandData.logoPath}
                        width={120}
                        height={120}
                      />
                      <button
                        className="btn btn-info"
                        style={{ color: color.white, marginLeft: 20 }}
                        onClick={() => setLogoChange(true)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}

                <div className="" style={{ paddingTop: 10 }}>
                  <label for="supplierDeliveryFeeEdit" class="form-label">
                    Delivery Fee:
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="supplierDeliveryFeeEdit"
                    placeholder="Delivery Fee"
                    value={editBrandData.deliveryFee}
                    defaultValue={editBrandData.deliveryFee}
                    onChange={(e) =>
                      onChangeEditBrandInfo("deliveryFee", e.target.value)
                    }
                  />
                </div>
                <div className="" style={{ paddingTop: 10 }}>
                  <label for="supplierAmountEdit" class="form-label">
                    Free Shipping Amount:
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="supplierAmountEdit"
                    placeholder="Amount"
                    value={editBrandData.freeShoppingAmount}
                    defaultValue={editBrandData.freeShoppingAmount}
                    onChange={(e) =>
                      onChangeEditBrandInfo(
                        "freeShoppingAmount",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                style={{ width: 150, marginTop: 20, alignSelf: "flex-end" }}
                onClick={() => onClickEdit("brand")}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="collectionModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabelCollection"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabelCollection">
                Update Collection for Brand
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEditCollectionData(null)}
              ></button>
            </div>
            <div class="modal-body">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: isMobile || isTablet ? "100%" : "80%",
                  margin: "0px auto",
                }}
              >
                <div className="" style={{ paddingTop: 10 }}>
                  <label for="supplierEditCollectionBrandId" class="form-label">
                    Brand Name:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="supplierEditCollectionBrandId"
                    defaultValue={brandNameForCollection?.name}
                    value={brandNameForCollection?.name}
                  />
                </div>
                <div className="" style={{ paddingTop: 10 }}>
                  <label for="supplierEditCollectionAddress" class="form-label">
                    Address:
                  </label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="supplierEditCollectionAddress"
                    placeholder="Address"
                    value={editCollectionData?.address}
                    onChange={(e) =>
                      onChangeEditCollectionInfo("address", e.target.value)
                    }
                  />
                </div>
                <div className="" style={{ paddingTop: 10 }}>
                  <label
                    for="supplierEditCollectionInstructions"
                    class="form-label"
                  >
                    Instructions:
                  </label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="supplierEditCollectionInstructions"
                    placeholder="Instructions"
                    value={editCollectionData?.instructions}
                    onChange={(e) =>
                      onChangeEditCollectionInfo("instructions", e.target.value)
                    }
                  />
                </div>

                <div className="" style={{ paddingTop: 10 }}>
                  <label>Is Active:</label>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault21"
                      id="Yes21"
                      checked={
                        editCollectionData?.isActive == true ? true : false
                      }
                      onClick={() =>
                        onChangeEditCollectionInfo("isActive", true)
                      }
                    />
                    <label class="form-check-label" for="Yes21">
                      Yes
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault21"
                      id="No21"
                      checked={
                        editCollectionData?.isActive == false ? true : false
                      }
                      onClick={() =>
                        onChangeEditCollectionInfo("isActive", false)
                      }
                    />
                    <label class="form-check-label" for="No21">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                style={{ width: 150, marginTop: 20, alignSelf: "flex-end" }}
                onClick={() => onClickEdit("collection")}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="productModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabelProduct"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div class={isEditProduct ? "modal-dialog modal-xl" : "modal-dialog"}>
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabelProduct">
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
                        <label for="supplierProductNameEdit" class="form-label">
                          Product Name:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="supplierProductNameEdit"
                          placeholder="Product Name"
                          value={editProductData?.name}
                          onChange={(e) => {
                            onChangeProductInfo("name", e.target.value, false);
                          }}
                        />
                      </div>
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="supplierPriceEdit" class="form-label">
                          Unit Price:
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="supplierPriceEdit"
                          placeholder="Unit Price"
                          value={editProductData?.unitPrice}
                          onChange={(e) => {
                            onChangeProductInfo(
                              "unitPrice",
                              e.target.value,
                              false
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
                        <label for="supplierDiscountEdit" class="form-label">
                          Max Discount Value:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="supplierDiscountEdit"
                          placeholder="Max Discount Value"
                          value={editProductData?.maxDiscountValue}
                          onChange={(e) => {
                            onChangeProductInfo(
                              "maxDiscountValue",
                              e.target.value,
                              false
                            );
                          }}
                        />
                      </div>
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label
                          for="supplierDiscountUnitPriceEdit"
                          class="form-label"
                        >
                          Discount Unit Price:
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="supplierDiscountUnitPriceEdit"
                          placeholder="Discount Unit Price"
                          value={editProductData?.discountedUnitPrice}
                          onChange={(e) => {
                            onChangeProductInfo(
                              "discountedUnitPrice",
                              e.target.value,
                              false
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
                        <label
                          for="supplierMaxPurchaseNoEdit"
                          class="form-label"
                        >
                          Max Purchase No:
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="supplierMaxPurchaseNoEdit"
                          placeholder="Number"
                          value={editProductData?.maxPurchaseNo}
                          onChange={(e) => {
                            onChangeProductInfo(
                              "maxPurchaseNo",
                              e.target.value,
                              false
                            );
                          }}
                        />
                      </div>
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="supplierCreditEdit" class="form-label">
                          Max Green Credit:
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="supplierCreditEdit"
                          placeholder="Max Green Credit"
                          value={editProductData?.maxGreenCredit}
                          onChange={(e) => {
                            onChangeProductInfo(
                              "maxGreenCredit",
                              e.target.value,
                              false
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
                        <label for="supplierCategoryEdit" class="form-label">
                          Category:
                        </label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          value={editProductData?.categoryId}
                          onChange={(e) => {
                            onChangeProductInfo(
                              "categoryId",
                              e.target.value,
                              false
                            );
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
                        <label
                          for="supplierBrandProductEdit"
                          class="form-label"
                        >
                          Brand:
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          id="supplierBrandProduct"
                          value={brandNameAndIdForProduct?.name}
                          defaultValue={brandNameAndIdForProduct?.name}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="supplierPriorityEdit" class="form-label">
                          Priority:
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="supplierPriorityEdit"
                          placeholder="Priority"
                          value={editProductData?.priority}
                          onChange={(e) => {
                            onChangeProductInfo(
                              "priority",
                              e.target.value,
                              false
                            );
                          }}
                        />
                      </div>
                      <div
                        className="col-md-6 col-12 px-3 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="supplierDescriptionEdit" class="form-label">
                          Description:
                        </label>
                        <textarea
                          type="text"
                          class="form-control"
                          id="supplierDescriptionEdit"
                          placeholder="Description"
                          value={editProductData?.description}
                          onChange={(e) => {
                            onChangeProductInfo(
                              "description",
                              e.target.value,
                              false
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
                        {!isEditProduct ? (
                          <>
                            <label
                              for="supplierProductImageView"
                              class="form-label"
                            >
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
                                src={imageUrl + editProductData?.imageUrl}
                                width={120}
                                height={120}
                              />
                            </div>
                          </>
                        ) : isProductImageChange ? (
                          <div>
                            <label
                              for="supplierFormFileEdit"
                              class="form-label"
                            >
                              Product Image
                            </label>
                            <input
                              class="form-control"
                              type="file"
                              id="supplierFormFileEdit"
                              value={editProductData?.imageName}
                              onChange={(e) => {
                                onChangeProductInfo(
                                  "imageName",
                                  e.target,
                                  false
                                );
                              }}
                            ></input>
                          </div>
                        ) : (
                          <>
                            <label
                              for="supplierProductImageEdit"
                              class="form-label"
                            >
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
                                src={imageUrl + editProductData?.imageUrl}
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
                              name="flexRadioDefault23"
                              id="Yes23"
                              checked={
                                editProductData?.inStock == true ? true : false
                              }
                              onClick={() => {
                                onChangeProductInfo("inStock", true, false);
                              }}
                            />
                            <label class="form-check-label" for="Yes23">
                              Yes
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault23"
                              id="No23"
                              checked={
                                editProductData?.inStock == false ? true : false
                              }
                              onClick={() => {
                                onChangeProductInfo("inStock", false, false);
                              }}
                            />
                            <label class="form-check-label" for="No23">
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
                          src={imageUrl + editProductData?.imageUrl}
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
                      <p style={{ flex: 3 }}>
                        {brandNameAndIdForProduct?.name}
                      </p>
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
                  onClick={() => onClickEdit("product")}
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
        id="transactionModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
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
              {/* <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setTransactionDetail(null)}
              >
                Close
              </button> */}
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

      <div
        class="modal fade"
        id="deleteModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabelDelete"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabelDelete">
                {removeClick.title == "collection" ? "Collection" : ""}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setEditProductData(null);
                  setIsProductImageChange(false);
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
                onClick={() => onClickRemoveCollection(removeClick.id)}
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
