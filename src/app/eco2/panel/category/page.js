"use client";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import { CategoryController } from "../../../controller";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import AppContext from "../../../context/AppContext";
import { color } from "../../../components/color";

export default function Category() {
  const { userInfo, isMobile, isTablet } = useContext(AppContext);
  const [categoryData, setCategoryData] = useState({
    parentID: null,
    name: "",
    Priority: null,
    categoryImageUrl: "",
    image: "",
    createdBy: "",
  });
  const [topCategories, setTopCategories] = useState([]);
  const router = useRouter();
  // console.log("category =====>", categoryData);

  useEffect(() => {
    CategoryController.getCategoriesWithoutProduct((data) => {
      if (data.length > 0) {
        setTopCategories(data);
      } else {
        toast.error("There is no Top Categories!", {
          position: "top-right",
        });
      }
    });
  }, []);

  const onChangeInfo = (text, value) => {
    const data = { ...categoryData };
    if (text == "categoryImageUrl") {
      getBase64(value.files, (result) => {
        data[text] = result;
      });
      data.image = value.value;
    } else {
      data[text] = text == "Priority" ? parseInt(value ? value : null) : value;
    }
    setCategoryData(data);
  };

  const getBase64 = (files, cb) => {
    const filePromises = Object.entries(files).map((item) => {
      return new Promise((resolve, reject) => {
        const [index, file] = item;
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (event) {
          // cb(`data:${file.type};base64,${btoa(event.target.result)}`);

          resolve(`${btoa(event.target.result)}`);
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
      categoryData.createdBy = userInfo.userName;
      CategoryController.createCategory(categoryData, (data) => {
        if (data.id) {
          toast.success("Create category successfully!", {
            position: "top-right",
            onClose: () => {
              router.back();
            },
          });
          setCategoryData({
            parentID: null,
            name: "",
            Priority: null,
            categoryImageUrl: "",
            createdBy: "",
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
      {/* <h2 style={{ marginTop: 20, marginLeft: 20 }}>Category</h2>
      <div
        className="d-flex flex-row justify-content-end"
        style={{ marginRight: 20 }}
      >
        <button type="button" class="btn btn-success">
          Create New
        </button>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td className="d-flex flex-row">
              <button type="button" class="btn btn-success btn-sm">
                Edit
              </button>
              <button type="button" class="btn btn-danger btn-sm">
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td className="d-flex flex-row">
              <button type="button" class="btn btn-success btn-sm">
                Edit
              </button>
              <button type="button" class="btn btn-danger btn-sm">
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td className="d-flex flex-row">
              <button type="button" class="btn btn-success btn-sm">
                Edit
              </button>
              <button type="button" class="btn btn-danger btn-sm">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table> */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: isMobile ? "90%" : isTablet ? "60%" : "50%",
          margin: "0px auto",
        }}
      >
        <h4 style={{ marginTop: 20 }}> Create Category</h4>
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
            onChange={(e) => onChangeInfo("categoryImageUrl", e.target)}
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
    </div>
  );
}
