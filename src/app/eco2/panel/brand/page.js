"use client";
import React, { use, useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../../../components/NavBar";
import AppContext from "../../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrandController } from "../../../controller";
import Image from "next/image";
import { color } from "../../../components/color";
import Pagination from "../../../components/Pagination";
import { baseUrl } from "../../../controller/baseUrl";

export default function Brand() {
  const { userInfo, isMobile, isTablet } = useContext(AppContext);
  const [brandData, setBrandData] = useState({
    name: "",
    companyUEN: "",
    brandEmail: "",
    logoPath: "",
    imageName: '',
    logoFileName: "",
    deliveryFee: null,
    freeShoppingAmount: null,
    createdBy: "",
    isActive: true,
  });
  const [allBrand, setAllBrand] = useState([]);
  const [logoChange, setLogoChange] = useState(false);
  const [editBrandData, setEditBrandData] = useState({
    id: 0,
    name: "",
    companyUEN: "",
    brandEmail: "",
    logoPath: "",
    newImage: "",
    logoFileName: "",
    deliveryFee: null,
    freeShoppingAmount: null,
    createdBy: "",
    editedBy: "",
    isActive: null,
  });
  const [isBrandNew, setIsBrandNew] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [removeClick, setRemoveClick] = useState({
    text: "",
    id: 0
  })
  const pageSize = 10;

  useEffect(() => {
    getAllBrands();
  }, []);

  const getAllBrands = () => {
    BrandController.getAllBrands((data) => {
      if (data.length > 0) {
        setAllBrand(data);
      } else {
        toast.warn("There is no brand!", {
          position: "top-right",
        });
      }
    });
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

  const allBrandData = useMemo(() => {
    let computedData = allBrand;
    const startIndex = (currentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, allBrand]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onChangeInfo = (text, value) => {
    const data = { ...brandData };
    if (text == "imageName") {
      getBase64(value.files, (result) => {
        data.logoPath = result;
      });
      data.imageName = value.value;
      data.logoFileName = value.files[0].name;
    } else {
      data[text] =
        text == "deliveryFee" || text == "freeShoppingAmount"
          ? value == NaN || value == undefined || value == ""
          ? null
          : parseInt(value)
          : value;
    }
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
      brandData.createdBy = `${userInfo.userId}`;
      BrandController.createBrand(brandData, (data) => {
        if (data.name) {
          toast.success("Create brand successfully!", {
            position: "top-right",
          });
          getAllBrands();
          setBrandData({
            name: "",
            companyUEN: "",
            brandEmail: "",
            logoPath: "",
            deliveryFee: null,
            freeShoppingAmount: null,
            createdBy: "",
            isActive: true,
          });
          setIsBrandNew(false)
        } else {
          toast.error("Something went wrong! Please try again!", {
            position: "top-right",
          });
        }
      });
    }
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
          ? value == NaN || value == undefined || value == ""
            ? null
            : parseInt(value)
          : value;
    }
    setEditBrandData(data);
  };

  const onClickEdit = () => {
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
    BrandController.updateBrand(obj, (data) => {
      if (data.id) {
        toast.success("Update your brand successfully!", {
          position: "top-right",
        });
        getAllBrands()
        setLogoChange(false);
        setEditBrandData({
          id: 0,
          name: "",
          companyUEN: "",
          brandEmail: "",
          logoPath: "",
          newImage: "",
          logoFileName: "",
          deliveryFee: null,
          freeShoppingAmount: null,
          collectionLocationQueryDtos: [],
          createdBy: "",
          isActive: null,
        });
      }
    });
  };

  const onClickRemoveBrand = (brandId) => {
    var obj = {
      actorId: userInfo.userId,
      recordId: brandId,
    };
    BrandController.deleteBrand(obj, (data) => {
      getAllBrands()
    });
  };
  return (
    <div>
      <ToastContainer />
      <NavBar />
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
            {isMobile ? (
              <h5 style={{ marginTop: 20, fontSize: "1.1rem" }}>
                Create Brand
              </h5>
            ) : (
              <h5 style={{ marginTop: 20 }}>Create Brand</h5>
            )}
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
                value={brandData.imageName}
                onChange={(e) => onChangeInfo("imageName", e.target)}
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
                onChange={(e) =>
                  onChangeInfo("freeShoppingAmount", e.target.value)
                }
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
        ) : (
          <div className="d-flex flex-column">
            <button
              className="btn btn-info"
              style={{ color: color.white, alignSelf: "flex-end" }}
              onClick={() => setIsBrandNew(true)}
            >
              Create New
            </button>

            {allBrandData.length > 0 ? (
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
                    {allBrandData.map((v, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v.id}</td>
                        <td>
                          <Image
                            alt=""
                            src={baseUrl + v.logoPath}
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
                            data-bs-target="#brandAdminModal"
                            onClick={() => {
                              onClickEditBrand(v);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            data-bs-toggle="modal"
                          data-bs-target="#deleteAdminBrandModal"
                            style={{ color: color.white, width: 70 }}
                            onClick={() => {
                              setRemoveClick({
                                text: v.name,
                                id: v.id,
                              })
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
                  items={allBrand.length} // 12
                  currentPage={currentPage} // 1
                  setCurrentPage={setCurrentPage}
                  pageSize={pageSize}
                  onPageChange={onPageChange}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div
        class="modal fade"
        id="brandAdminModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabelBrand"
        aria-hidden="true"
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
                    deliveryFee: null,
                    freeShoppingAmount: null,
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
                  <label for="BrandEdit" class="form-label">
                    Brand Name:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="BrandEdit"
                    placeholder="Brand"
                    value={editBrandData.name}
                    defaultValue={editBrandData.name}
                    onChange={(e) =>
                      onChangeEditBrandInfo("name", e.target.value)
                    }
                  />
                </div>
                <div className="" style={{ paddingTop: 10 }}>
                  <label for="CompanyEdit" class="form-label">
                    Company UEN:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="CompanyEdit"
                    placeholder="Company UEN"
                    value={editBrandData.companyUEN}
                    defaultValue={editBrandData.companyUEN}
                    onChange={(e) =>
                      onChangeEditBrandInfo("companyUEN", e.target.value)
                    }
                  />
                </div>
                <div className="" style={{ paddingTop: 10 }}>
                  <label for="BrandEmailEdit" class="form-label">
                    Brand Email:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="BrandEmailEdit"
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
                    <label for="LogoEdit" class="form-label">
                      Brand Logo
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      id="LogoEdit"
                      accept="image/*"
                      value={editBrandData.newImage}
                      onChange={(e) =>
                        onChangeEditBrandInfo("newImage", e.target)
                      }
                    ></input>
                  </div>
                ) : (
                  <div style={{ paddingTop: 10 }}>
                    <label for="LogoEdit" class="form-label">
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
                        src={baseUrl + editBrandData.logoPath}
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
                  <label for="DeliveryFeeEdit" class="form-label">
                    Delivery Fee:
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="DeliveryFeeEdit"
                    placeholder="Delivery Fee"
                    value={editBrandData.deliveryFee}
                    defaultValue={editBrandData.deliveryFee}
                    onChange={(e) =>
                      onChangeEditBrandInfo("deliveryFee", e.target.value)
                    }
                  />
                </div>
                <div className="" style={{ paddingTop: 10 }}>
                  <label for="AmountEdit" class="form-label">
                    Free Shipping Amount:
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="AmountEdit"
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
                onClick={() => onClickEdit()}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="deleteAdminBrandModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabelDeleteAdminBrand"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabelDeleteAdminBrand">
                Brand
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
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
                onClick={() => onClickRemoveBrand(removeClick.id)}
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
