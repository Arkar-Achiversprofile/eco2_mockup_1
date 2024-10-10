"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../../../components/NavBar";
import { CategoryController } from "../../../controller";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import AppContext from "../../../context/AppContext";
import { color } from "../../../components/color";
import Pagination from "../../../components/Pagination";
import Image from "next/image";
import { baseUrl } from "../../../controller/baseUrl";
import { getLocalStorage } from "../../../api/localStorage";

export default function Category() {
  const { userInfo, isMobile, isTablet } = useContext(AppContext);
  const [categoryData, setCategoryData] = useState({
    parentID: null,
    name: "",
    Priority: null,
    categoryImageUrl: "",
    image: "",
    imagefilename: "",
    isActive: true,
    createdBy: "",
  });
  const [topCategories, setTopCategories] = useState([]);
  const router = useRouter();
  const [allCategories, setAllCategories] = useState([]);
  const [isCategoryNew, setIsCategoryNew] = useState(false);
  const [removeClick, setRemoveClick] = useState({
    text: "",
    id: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  // console.log("category =====>", categoryData);

  useEffect(() => {
    CategoryController.getAllParentCategoriesNameValue((data) => {
      if (data.length > 0) {
        setTopCategories(data);
      } else {
        toast.error("There is no Top Categories!", {
          position: "top-right",
        });
      }
    });
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    CategoryController.getAllCategories((data) => {
      if (data.length > 0) {
        setAllCategories(data);
      } else {
        toast.error("There is no Categories!", {
          position: "top-right",
        });
      }
    });
  };

  const allCategoriesData = useMemo(() => {
    let computedData = allCategories;
    const startIndex = (currentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, allCategories]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onChangeInfo = (text, value) => {
    const data = { ...categoryData };
    if (text == "image") {
      getBase64(value.files, (result) => {
        data.categoryImageUrl = result;
      });
      data.image = value.value;
      data.imagefilename = value.files[0].name;
    } else {
      data[text] = text == "Priority" ? parseInt(value ? value : null) : value;
    }
    setCategoryData(data);
  };

  function arrayBufferToBase64(buffer) {
    let binary = "";
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
          const base64String = arrayBufferToBase64(arrayBuffer);
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
    if (categoryData.parentID == null) {
      toast.warn("Please select Category Parent ID!", {
        position: "top-right",
      });
    } else if (categoryData.name == "") {
      toast.warn("Please fill Category Name!", {
        position: "top-right",
      });
    } else if (
      categoryData.Priority == null ||
      categoryData.Priority == NaN ||
      categoryData.Priority == 0
    ) {
      toast.warn("Please set priority!", {
        position: "top-right",
      });
    } else if (categoryData.categoryImageUrl == "") {
      toast.warn("Please choose Category Image!", {
        position: "top-right",
      });
    } else {
      const userId = getLocalStorage("id")
      categoryData.createdBy = `${userId}`;
      // console.log("data", categoryData)
      CategoryController.createCategory(categoryData, (data) => {
        if (data.id) {
          toast.success("Create category successfully!", {
            position: "top-right",
          });
          setCategoryData({
            parentID: null,
            name: "",
            Priority: null,
            categoryImageUrl: "",
            image: "",
            imagefilename: "",
            createdBy: "",
          });
          setIsCategoryNew(false);
          getAllCategories();
        } else {
          toast.error("Something went wrong! Please try again!", {
            position: "top-right",
          });
        }
      });
    }
  };

  const onClickRemove = (categoryId) => {
    var obj = {
      actorId: userInfo.userId,
      recordId: categoryId,
    };
    CategoryController.deleteCategory(obj, (data) => {
      getAllCategories();
    });
  };

  return (
    <div>
      <ToastContainer />
      <NavBar />
      <div style={{ width: "95%", margin: "0px auto" }}>
        {isMobile ? (
          <h5 style={{ marginTop: 20 }}> Manage Category</h5>
        ) : (
          <h4 style={{ marginTop: 20 }}> Manage Category</h4>
        )}
        {isCategoryNew ? (
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
              onClick={() => setIsCategoryNew(false)}
            >
              Back to List
            </button>
            {isMobile ? (
              <h5 style={{ marginTop: 20, fontSize: "1.1rem" }}>
                Create Category
              </h5>
            ) : (
              <h5 style={{ marginTop: 20 }}>Create Category</h5>
            )}
            <div className="" style={{ paddingTop: 10 }}>
              <label for="parentID" class="form-label">
                Category Parent ID:
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={categoryData.parentID}
                onChange={(e) => onChangeInfo("parentID", e.target.value)}
              >
                <option value={null} selected>
                  Select Category Parent ID
                </option>
                {topCategories.length > 0
                  ? topCategories.map((value, index) => (
                      <option value={value.id} key={index}>
                        {value.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="" style={{ paddingTop: 10 }}>
              <label for="category" class="form-label">
                Category Name:
              </label>
              <input
                type="text"
                class="form-control"
                id="category"
                placeholder="Category"
                value={categoryData.name}
                onChange={(e) => onChangeInfo("name", e.target.value)}
              />
            </div>
            <div className="" style={{ paddingTop: 10 }}>
              <label for="priority" class="form-label">
                Priority:
              </label>
              <input
                type="number"
                class="form-control"
                id="priority"
                placeholder="Priority"
                value={categoryData.Priority}
                onChange={(e) => onChangeInfo("Priority", e.target.value)}
              />
            </div>
            <div className="" style={{ paddingTop: 10 }}>
              <label for="formFile" class="form-label">
                Category Image
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                name="category"
                accept="image/*"
                value={categoryData.image}
                onChange={(e) => onChangeInfo("image", e.target)}
              ></input>
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
              onClick={() => setIsCategoryNew(true)}
            >
              Create New
            </button>

            {allCategoriesData.length > 0 ? (
              <div class="table-responsive" style={{ margin: "30px 0px" }}>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">ID</th>
                      <th scope="col">Category Image</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Parent Name</th>
                      <th scope="col">Priority</th>
                      {userInfo.role == 1 ? <th scope="col">Action</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {allCategoriesData.map((v, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v.id}</td>
                        <td>
                          <Image
                            alt=""
                            src={baseUrl + v.categoryImageUrl}
                            width={50}
                            height={50}
                          />
                        </td>
                        <td>{v.name}</td>
                        <td>{v.parentName ? v.parentName : "-"}</td>
                        <td>{v.priority}</td>
                        {userInfo.role == 1 ? (
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteAdminCategoryModal"
                              style={{ color: color.white, width: 70 }}
                              onClick={() => {
                                setRemoveClick({
                                  text: v.name,
                                  id: v.id,
                                });
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  items={allCategories.length} // 12
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
        id="deleteAdminCategoryModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabelDeleteAdminCategory"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title fs-5"
                id="exampleModalLabelDeleteAdminCategory"
              >
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
