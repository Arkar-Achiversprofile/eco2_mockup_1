"use client";
import React, { use, useContext, useEffect, useMemo, useState } from "react";
import Navbar from "../../../../components/NavBar";
import Pagination from "../../../../components/Pagination";
import { ManageUserController } from "../../../../controller/admin/ManageUserController";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { color } from "../../../../components/color";
import { getLocalStorage } from "../../../../api/localStorage";
import AppContext from "../../../../context/AppContext";
import { baseUrl, imageUrl } from "../../../../controller/baseUrl";
import Image from "next/image";

export default function ManageUser() {
  const { isMobile, isTablet } = useContext(AppContext);
  const [isUserNew, setIsUserNew] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUserData, setNewUserData] = useState({
    userName: "",
    email: "",
    mobile: "",
    password: "",
    retypePassword: "",
    street: "",
    unitNo: "",
    postalCode: "",
    housingType: 1,
    halalBox: false,
    role: null,
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRetypePassword, setIsShowRetypePassword] = useState(false);
  const userRole = [
    { id: 0, name: "User" },
    { id: 1, name: "Admin" },
    { id: 2, name: "Supplier" },
    { id: 3, name: "Staff" },
  ];
  const [isEditUser, setIsEditUser] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [editPassword, setEditPassword] = useState("");
  const [editRetypePassword, setEditRetypePassword] = useState("");
  const [roleNo, setRoleNo] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onSelectUserRole = (id) => {
    console.log("id", id);
    setRoleNo(id);
    if (id == "All" || id == "Select User Role") {
      getAccountItems();
    } else {
      ManageUserController.getAccountItemsByRole(id, (data) => {
        setUsers(data);
        if (data.length < 1) {
          toast.warn("There is no user data!", {
            position: "top-right",
          });
        }
      });
    }
  };

  const onClickSearch = () => {
    setRoleNo("Select User Role");
    if (searchText == "") {
      getAccountItems();
    } else {
      ManageUserController.getUserByUserName(searchText, (data) => {
        if (data.length > 0) {
          setUsers(data);
        } else {
          toast.warn("There is no User for the search name!", {
            position: "top-right",
          });
        }
      });
    }
  };

  useEffect(() => {
    getAccountItems();
  }, []);

  const getAccountItems = () => {
    ManageUserController.getAccountItems((data) => {
      if (data.length > 0) {
        setUsers(data);
      } else {
        toast.warn("There is no User.", {
          position: "top-right",
        });
      }
    });
  };

  const userData = useMemo(() => {
    let computedData = users;
    const startIndex = (currentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, users]);

  const onChangeInfo = (text, value, isEdit = null) => {
    if (isEdit == null) {
      const data = { ...newUserData };
      data[text] = value;
      setNewUserData(data);
    } else {
      const newData = { ...editUserData };
      newData[text] = value;
      setEditUserData(newData);
    }
  };

  const getStreet = async () => {
    if (newUserData.postalCode == "") {
      toast.warn("Please fill the Postal Code And Press 'Get Street'");
    } else {
      const response = await fetch(
        `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${parseInt(
          newUserData.postalCode
        )}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
        { method: "GET" }
      );
      const data = response.json();
      data.then(async (res) => {
        if (res.results.length > 0) {
          const data = { ...newUserData };
          data["street"] = res.results[0].ROAD_NAME;
          setNewUserData(data);
        } else {
          toast.warn(
            "Postal Code is invalid. Please change to actual postal code!"
          );
        }
      });
    }
  };

  const getStreetEdit = async () => {
    if (editUserData.postalCode == "") {
      toast.warn("Please fill the Postal Code And Press 'Get Street'");
    } else {
      const response = await fetch(
        `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${parseInt(
          editUserData.postalCode
        )}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
        { method: "GET" }
      );
      const data = response.json();
      data.then(async (res) => {
        if (res.results.length > 0) {
          const data = { ...editUserData };
          data["street"] = res.results[0].ROAD_NAME;
          setEditUserData(data);
        } else {
          toast.warn(
            "Postal Code is invalid. Please change to actual postal code!"
          );
        }
      });
    }
  };

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const onClickCreate = () => {
    if (newUserData.password != newUserData.retypePassword) {
      toast.warn("Password and Retype Password must be the same!", {
        position: "top-right",
      });
    } else if (newUserData.email == "") {
      toast.warn("Please fill Email!", {
        position: "top-right",
      });
    } else if (newUserData.userName == "") {
      toast.warn("Please fill User Name!", {
        position: "top-right",
      });
    } else if (newUserData.password == "") {
      toast.warn("Please fill password!", {
        position: "top-right",
      });
    } else if (newUserData.retypePassword == "") {
      toast.warn("Please fill Retype password!", {
        position: "top-right",
      });
    } else if (newUserData.mobile == "") {
      toast.warn("Please fill mobile number!", {
        position: "top-right",
      });
    } else if (newUserData.street == "") {
      toast.warn("Please fill street!", {
        position: "top-right",
      });
    } else if (newUserData.unitNo == "") {
      toast.warn("Please fill Unit no!", {
        position: "top-right",
      });
    } else if (newUserData.postalCode == "") {
      toast.warn("Please fill postal code!", {
        position: "top-right",
      });
    } else if (newUserData.role == null) {
      toast.warn("Please choose User Role!", {
        position: "top-right",
      });
    } else {
      let obj = {
        userName: newUserData.userName,
        email: newUserData.email,
        mobile: newUserData.mobile,
        password: newUserData.password,
        street: newUserData.street,
        unitNo: newUserData.unitNo,
        postalCode: newUserData.postalCode,
        housingType: newUserData.housingType,
        halalBox: newUserData.halalBox,
        role: parseInt(newUserData.role),
      };
      //   <a href="https://feak.achieversprofile.com/login/reset_password?resetCode=${data.passwordResetCode}">https://feak.achieversprofile.com/login/reset_password?resetCode=${data.passwordResetCode}</a>
      ManageUserController.createUser(obj, (data) => {
        if (data.id) {
          try {
            fetch(`${baseUrl}Email/send`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;",
              },
              body: JSON.stringify({
                toEmail: `${data.email}`,
                subject: "Eco2Balance Email verification",
                body: `<html><body><p>Email Verification Code is <b>${
                  data.verificationCode
                }</b> </p>
                    <br/>
                    <p>Here is the link to enter the verification code.</p>
                    <a href="http://localhost:3000/login/verification?${createQueryString(
                      "id",
                      data.id
                    )}">http://localhost:3000/login/verification?${createQueryString(
                  "id",
                  data.id
                )}</a></body></html>`,
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
                toast.success("User is created. Email is sent to user.", {
                  position: "top-right",
                });
                setIsUserNew(false);
                getAccountItems();
                setNewUserData({
                  userName: "",
                  email: "",
                  mobile: "",
                  password: "",
                  retypePassword: "",
                  street: "",
                  unitNo: "",
                  postalCode: "",
                  housingType: 1,
                  halalBox: false,
                  role: null,
                });
              })
              .catch((err) => console.log("email error =====>", err));
          } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
          }
        } else {
          toast.error("Something went wrong!", {
            position: "top-right",
          });
        }
      });
    }
  };

  const onClickEdit = (id, isEdit) => {
    setIsEditUser(isEdit);
    ManageUserController.getUserDetail(id, (data) => {
      setEditUserData(data);
    });
  };

  const onClickEditModal = () => {
    const id = getLocalStorage("id");
    if (editPassword != editRetypePassword) {
      toast.warn("Password and Retype Password must be the same!", {
        position: "top-right",
      });
    } else {
      var obj = {
        userName: editUserData.userName,
        email: editUserData.email,
        mobile: editUserData.mobile,
        password: editPassword == "" ? "" : editPassword,
        street: editUserData.street,
        unitNo: editUserData.unitNo,
        postalCode: editUserData.postalCode,
        housingType: editUserData.housingType,
        halalBox: editUserData.halalBox,
        role: parseInt(editUserData.role),
        id: editUserData.id,
        createdBy: `${id}`,
      };
      ManageUserController.updateUser(obj, (data) => {
        if (data.id) {
          toast.success("Update user successful!", {
            position: "top-right",
          });
          setEditUserData(null);
          getAccountItems();
        }
      });
    }
    setEditPassword("");
    setEditRetypePassword("");
  };

  const onClickRemove = (id) => {
    const userId = getLocalStorage("id");
    let obj = {
      actorId: userId,
      recordId: id,
    };
    ManageUserController.deleteUser(obj, (data) => {
      getAccountItems();
    });
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <h2 style={{ marginTop: 20, marginLeft: 30 }}>Manage User</h2>
      <div style={{ width: "95%", margin: "0px auto" }}>
        {isUserNew ? (
          <div
            style={{
              width: "100%",
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
              onClick={() => {
                setIsUserNew(false);
                setNewUserData({
                  userName: "",
                  email: "",
                  mobile: "",
                  password: "",
                  retypePassword: "",
                  street: "",
                  unitNo: "",
                  postalCode: "",
                  housingType: 1,
                  halalBox: false,
                  role: null,
                });
              }}
            >
              Back to List
            </button>
            {isMobile ? (
              <h5 style={{ marginTop: 20, fontSize: "1.1rem" }}>Create User</h5>
            ) : (
              <h5 style={{ marginTop: 20 }}>Create User</h5>
            )}
            <div className="row">
              <div
                className="col-md-6 col-12 px-3 mx-auto"
                style={{ paddingTop: 10 }}
              >
                <label for="adminUsername" class="form-label">
                  User Name:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="adminUsername"
                  placeholder="Username"
                  value={newUserData.userName}
                  onChange={(e) => onChangeInfo("userName", e.target.value)}
                />
              </div>
              <div
                className="col-md-6 col-12 px-3 mx-auto"
                style={{ paddingTop: 10 }}
              >
                <label for="adminEmail" class="form-label">
                  Email address:
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="adminEmail"
                  placeholder="name@example.com"
                  value={newUserData.email}
                  onChange={(e) => onChangeInfo("email", e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-6 col-12 px-3 mx-auto"
                style={{ paddingTop: 10 }}
              >
                <div className="col-12" style={{ paddingTop: 10 }}>
                  <label for="adminMobile" class="form-label">
                    Mobile No:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="adminMobile"
                    placeholder="Your Mobile No."
                    value={newUserData.mobile}
                    onChange={(e) => onChangeInfo("mobile", e.target.value)}
                  />
                </div>
                <div className="col-12" style={{ paddingTop: 10 }}>
                  <label for="adminUnitNumber" class="form-label">
                    Unit Number:{" "}
                    <span style={{ fontSize: 10 }}>
                      {
                        "(Accepted format: #01-123 & only one account is allowed per household)"
                      }
                    </span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="adminUnitNumber"
                    placeholder="Unit number"
                    value={newUserData.unitNo}
                    onChange={(e) => onChangeInfo("unitNo", e.target.value)}
                  />
                </div>
              </div>
              <div
                className="col-md-6 col-12 px-3 mx-auto"
                style={{ paddingTop: 10 }}
              >
                <div className="col-12" style={{ paddingTop: 10 }}>
                  <div className="row">
                    <div className="col-9">
                      <label for="adminPostalCode" class="form-label">
                        Postal Code:{" "}
                        <span style={{ fontSize: 10 }}>{"{eg. 123456}"}</span>
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="adminPostalCode"
                        placeholder="Your Postal Code"
                        value={newUserData.postalCode}
                        onChange={(e) =>
                          onChangeInfo("postalCode", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-3 d-flex align-items-end">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => getStreet()}
                        style={{ fontSize: isTablet ? 11 : 14 }}
                      >
                        Get Street
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12" style={{ paddingTop: 10 }}>
                  <label for="adminStreet" class="form-label">
                    Street:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="adminStreet"
                    placeholder="Street"
                    value={newUserData.street}
                    // onChange={(e) => onChangeInfo("street", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="col-12 px-1 mx-auto" style={{ paddingTop: 10 }}>
                  <label for="adminPassword" class="form-label">
                    Password {"(8 characters minimum)"}:
                  </label>
                  <div class="input-group">
                    <input
                      type={isShowPassword ? "text" : "password"}
                      class="form-control"
                      id="adminPassword"
                      placeholder="Password"
                      value={newUserData.password}
                      onChange={(e) => onChangeInfo("password", e.target.value)}
                    />
                    <span
                      class="input-group-text"
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      <i
                        class={isShowPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                        id="togglePasswordAdmin"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="col-12 px-1 mx-auto" style={{ paddingTop: 10 }}>
                  <label for="adminRetypePassword" class="form-label">
                    Retype Password:
                  </label>
                  <div class="input-group">
                    <input
                      type={isShowRetypePassword ? "text" : "password"}
                      class="form-control"
                      id="adminRetypePassword"
                      placeholder="Retype password"
                      value={newUserData.retypePassword}
                      onChange={(e) =>
                        onChangeInfo("retypePassword", e.target.value)
                      }
                    />
                    <span
                      class="input-group-text"
                      onClick={() =>
                        setIsShowRetypePassword(!isShowRetypePassword)
                      }
                    >
                      <i
                        class={
                          isShowRetypePassword ? "bi bi-eye-slash" : "bi bi-eye"
                        }
                        id="togglePasswordAdmin"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="col-12 px-1 mx-auto" style={{ paddingTop: 10 }}>
                  <label for="adminUserRole" class="form-label">
                    User Role:
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={newUserData.role}
                    onChange={(e) => onChangeInfo("role", e.target.value)}
                  >
                    <option value={null} selected>
                      Select User Role
                    </option>
                    {userRole.map((value, index) => (
                      <option key={index} value={value.id}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 px-1 mx-auto" style={{ paddingTop: 10 }}>
                  <label>Type of housing:</label>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault0"
                      id="adminPublic"
                      checked={newUserData.housingType == 1 ? true : false}
                      onClick={() => onChangeInfo("housingType", 1)}
                    />
                    <label class="form-check-label" for="adminPublic">
                      Public Housing {"(HOB flats)"}
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault0"
                      id="adminPrivate"
                      checked={newUserData.housingType == 2 ? true : false}
                      onClick={() => onChangeInfo("housingType", 2)}
                    />
                    <label class="form-check-label" for="adminPrivate">
                      Private Condominiums / Apartments
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault0"
                      id="adminLanded"
                      checked={newUserData.housingType == 3 ? true : false}
                      onClick={() => onChangeInfo("housingType", 3)}
                    />
                    <label class="form-check-label" for="adminLanded">
                      Landed Housing
                    </label>
                  </div>
                </div>
                <div className="col-12 px-1 mx-auto" style={{ paddingTop: 10 }}>
                  <label>Food Waste Collection Box Type:</label>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault-1"
                      id="admidHalal"
                      checked={newUserData.halalBox == true ? true : false}
                      onClick={() => onChangeInfo("halalBox", true)}
                    />
                    <label class="form-check-label" for="adminHalal">
                      Halal
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault-1"
                      id="adminNonHalal"
                      checked={newUserData.halalBox == false ? true : false}
                      onClick={() => onChangeInfo("halalBox", false)}
                    />
                    <label class="form-check-label" for="adminNonHalal">
                      Non Halal
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-success"
              style={{ width: 150, marginTop: 20, alignSelf: "flex-end" }}
              onClick={() => onClickCreate()}
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
              onClick={() => setIsUserNew(true)}
            >
              Create New
            </button>

            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignSelf: "flex-end",
                marginTop: 10,
              }}
            >
              <div style={{ marginRight: 10, marginBottom: isMobile ? 10 : 0 }}>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  style={{ width: 200, height: 35 }}
                  value={roleNo}
                  onChange={(e) => onSelectUserRole(e.target.value)}
                >
                  <option value={null} selected>
                    Select User Role
                  </option>
                  <option value={null}>All</option>
                  {userRole.map((value, index) => (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 220,
                  height: 35,
                }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search User Name"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  className="btn btn-light"
                  onClick={() => onClickSearch()}
                >
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>

            <div class="table-responsive" style={{ margin: "30px 0px" }}>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Role</th>
                    <th scope="col">QR Code</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Address</th>
                    <th scope="col">GC Amount</th>
                    <th scope="col">Box Donated</th>
                    <th scope="col">Box Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((v, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>
                        {v.role == 0
                          ? "User"
                          : v.role == 1
                          ? "Admin"
                          : v.role == 2
                          ? "Supplier"
                          : "Staff"}
                      </td>
                      <td>
                        <Image
                          alt=""
                          src={imageUrl + v.qrUrl}
                          width={50}
                          height={50}
                        />
                      </td>
                      <td>
                        <p
                          data-bs-toggle="modal"
                          data-bs-target="#modal"
                          onClick={() => onClickEdit(v.id, false)}
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                            color: color.skyBlue,
                          }}
                        >
                          {v.userName}
                        </p>
                      </td>
                      <td>{v.email}</td>
                      <td>{v.mobile}</td>
                      <td>{v.address}</td>
                      <td>{v.gcAmount}</td>
                      <td>{v.boxDonated}</td>
                      <td>{v.boxStatus}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          style={{
                            color: color.white,
                            marginRight: 10,
                            width: 70,
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#modal"
                          onClick={() => {
                            onClickEdit(v.id, true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          style={{ color: color.white, width: 70 }}
                          onClick={() => {
                            onClickRemove(v.id);
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
                items={users.length} // 12
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
        id="modal"
        tabindex="-1"
        aria-labelledby="exampleModalLabelUserManage"
        aria-hidden="true"
      >
        <div class={isEditUser ? "modal-dialog modal-xl" : "modal-dialog"}>
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabelUserManage">
                {isEditUser ? "Update User" : "User Detail"}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setEditUserData(null);
                  setEditPassword("");
                  setEditRetypePassword("");
                }}
              ></button>
            </div>
            <div class="modal-body">
              {isEditUser ? (
                <div style={{ width: "95%", margin: "0px auto" }}>
                  <div className="row">
                    <div
                      className="col-md-6 col-12 px-3 mx-auto"
                      style={{ paddingTop: 10 }}
                    >
                      <label for="adminUsernameEdit" class="form-label">
                        User Name:
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="adminUsernameEdit"
                        placeholder="Username"
                        value={editUserData?.userName}
                        onChange={(e) => {
                          onChangeInfo("userName", e.target.value, true);
                        }}
                      />
                    </div>
                    <div
                      className="col-md-6 col-12 px-3 mx-auto"
                      style={{ paddingTop: 10 }}
                    >
                      <label for="adminEmailEdit" class="form-label">
                        Email address:
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="adminEmailEdit"
                        placeholder="name@example.com"
                        value={editUserData?.email}
                        onChange={(e) => {
                          onChangeInfo("email", e.target.value, true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-md-6 col-12 px-3 mx-auto"
                      style={{ paddingTop: 10 }}
                    >
                      <div className="col-12" style={{ paddingTop: 10 }}>
                        <label for="adminMobileEdit" class="form-label">
                          Mobile No:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="adminMobileEdit"
                          placeholder="Your Mobile No."
                          value={editUserData?.mobile}
                          onChange={(e) => {
                            onChangeInfo("mobile", e.target.value, true);
                          }}
                        />
                      </div>
                      <div className="col-12" style={{ paddingTop: 10 }}>
                        <label for="adminUnitNumberEdit" class="form-label">
                          Unit Number:{" "}
                          <span style={{ fontSize: 10 }}>
                            {
                              "(Accepted format: #01-123 & only one account is allowed per household)"
                            }
                          </span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="adminUnitNumberEdit"
                          placeholder="Unit number"
                          value={editUserData?.unitNo}
                          onChange={(e) => {
                            onChangeInfo("unitNo", e.target.value, true);
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="col-md-6 col-12 px-3 mx-auto"
                      style={{ paddingTop: 10 }}
                    >
                      <div className="col-12" style={{ paddingTop: 10 }}>
                        <div className="row">
                          <div className="col-9">
                            <label for="adminPostalCodeEdit" class="form-label">
                              Postal Code:{" "}
                              <span style={{ fontSize: 10 }}>
                                {"{eg. 123456}"}
                              </span>
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="adminPostalCodeEdit"
                              placeholder="Your Postal Code"
                              value={editUserData?.postalCode}
                              onChange={(e) => {
                                onChangeInfo(
                                  "postalCode",
                                  e.target.value,
                                  true
                                );
                              }}
                            />
                          </div>
                          <div className="col-3 d-flex align-items-end">
                            {isEditUser ? (
                              <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={() => getStreetEdit()}
                                style={{ fontSize: isTablet ? 11 : 14 }}
                              >
                                Get Street
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="col-12" style={{ paddingTop: 10 }}>
                        <label for="adminStreetEdit" class="form-label">
                          Street:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="adminStreetEdit"
                          placeholder="Street"
                          value={editUserData?.street}
                          // onChange={(e) => onChangeInfo("street", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div
                        className="col-12 px-1 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="adminPasswordEdit" class="form-label">
                          Password {"(8 characters minimum)"}:
                        </label>
                        <div class="input-group">
                          <input
                            type={isShowPassword ? "text" : "password"}
                            class="form-control"
                            id="adminPasswordEdit"
                            placeholder="Password"
                            //   disabled={isEditUser}
                            value={editPassword}
                            onChange={(e) => {
                              setEditPassword(e.target.value);
                            }}
                          />
                          <span
                            class="input-group-text"
                            onClick={() => setIsShowPassword(!isShowPassword)}
                          >
                            <i
                              class={
                                isShowPassword ? "bi bi-eye-slash" : "bi bi-eye"
                              }
                              id="togglePasswordAdminEdit"
                              style={{ cursor: "pointer" }}
                            ></i>
                          </span>
                        </div>
                      </div>
                      <div
                        className="col-12 px-1 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="adminRetypePasswordEdit" class="form-label">
                          Retype Password:
                        </label>
                        <div class="input-group">
                          <input
                            type={isShowRetypePassword ? "text" : "password"}
                            class="form-control"
                            id="adminRetypePasswordEdit"
                            placeholder="Retype password"
                            //   disabled={isEditUser}
                            value={editRetypePassword}
                            onChange={(e) => {
                              setEditRetypePassword(e.target.value);
                            }}
                          />
                          <span
                            class="input-group-text"
                            onClick={() =>
                              setIsShowRetypePassword(!isShowRetypePassword)
                            }
                          >
                            <i
                              class={
                                isShowRetypePassword
                                  ? "bi bi-eye-slash"
                                  : "bi bi-eye"
                              }
                              id="togglePasswordAdminEdit"
                              style={{ cursor: "pointer" }}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div
                        className="col-12 px-1 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label for="adminUserRoleEdit" class="form-label">
                          User Role:
                        </label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          value={editUserData?.role}
                          onChange={(e) => {
                            onChangeInfo("role", e.target.value, true);
                          }}
                        >
                          <option value={null} selected>
                            Select User Role
                          </option>
                          {userRole.map((value, index) => (
                            <option key={index} value={value.id}>
                              {value.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        className="col-12 px-1 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label>Type of housing:</label>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault-2"
                            id="adminPublicEdit"
                            checked={
                              editUserData?.housingType == 1 ? true : false
                            }
                            onClick={() => {
                              onChangeInfo("housingType", 1, true);
                            }}
                          />
                          <label class="form-check-label" for="adminPublicEdit">
                            Public Housing {"(HOB flats)"}
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault-2"
                            id="adminPrivateEdit"
                            checked={
                              editUserData?.housingType == 2 ? true : false
                            }
                            onClick={() => {
                              onChangeInfo("housingType", 2, true);
                            }}
                          />
                          <label
                            class="form-check-label"
                            for="adminPrivateEdit"
                          >
                            Private Condominiums / Apartments
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault-2"
                            id="adminLandedEdit"
                            checked={
                              editUserData?.housingType == 3 ? true : false
                            }
                            onClick={() => {
                              onChangeInfo("housingType", 3, true);
                            }}
                          />
                          <label class="form-check-label" for="adminLandedEdit">
                            Landed Housing
                          </label>
                        </div>
                      </div>
                      <div
                        className="col-12 px-1 mx-auto"
                        style={{ paddingTop: 10 }}
                      >
                        <label>Food Waste Collection Box Type:</label>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault-3"
                            id="admidHalalEdit"
                            checked={
                              editUserData?.halalBox == true ? true : false
                            }
                            onClick={() => {
                              onChangeInfo("halalBox", true, true);
                            }}
                          />
                          <label class="form-check-label" for="adminHalalEdit">
                            Halal
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault-3"
                            id="adminNonHalalEdit"
                            checked={
                              editUserData?.halalBox == false ? true : false
                            }
                            onClick={() => {
                              onChangeInfo("halalBox", false, true);
                            }}
                          />
                          <label
                            class="form-check-label"
                            for="adminNonHalalEdit"
                          >
                            Non Halal
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ width: "95%", margin: "0px auto" }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ flex: 2 }}>QR Code:</p>
                    <div style={{ flex: 3 }}>
                      <Image
                        alt=""
                        src={imageUrl + editUserData?.qrUrl}
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ flex: 2 }}>User Role:</p>
                    <p style={{ flex: 3 }}>
                      {editUserData?.role == 0
                        ? "User"
                        : editUserData?.role == 1
                        ? "Admin"
                        : editUserData?.role == 2
                        ? "Supplier"
                        : "Staff"}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ flex: 2 }}>User Name:</p>
                    <p style={{ flex: 3 }}>{editUserData?.userName}</p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ flex: 2 }}>Email:</p>
                    <p style={{ flex: 3 }}>{editUserData?.email}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ flex: 2 }}>Mobile:</p>
                    <p style={{ flex: 3 }}>{editUserData?.mobile}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ flex: 2 }}>Postal Code:</p>
                    <p style={{ flex: 3 }}>{editUserData?.postalCode}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ flex: 2 }}>Street:</p>
                    <p style={{ flex: 3 }}>{editUserData?.street}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ flex: 2 }}>Unit No:</p>
                    <p style={{ flex: 3 }}>{editUserData?.unitNo}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ flex: 2 }}>Type of Housing:</p>
                    <p style={{ flex: 3 }}>
                      {editUserData?.housingType == 1
                        ? "Public Housing (HOB flats)"
                        : editUserData?.housingType == 2
                        ? "Private Condominiums / Apartments"
                        : editUserData?.housingType == 3
                        ? "Landed Housing"
                        : null}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ flex: 2 }}>Collection Box Type:</p>
                    <p style={{ flex: 3 }}>
                      {editUserData?.halalBox ? "Halal" : "Non-Halal"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {isEditUser ? (
              <div class="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  style={{ width: 120, marginTop: 20, alignSelf: "flex-end" }}
                  onClick={() => onClickEditModal()}
                >
                  Edit
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
