"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../../../../components/NavBar";
import Pagination from "../../../../components/Pagination";
import { ManageUserController } from "../../../../controller/admin/ManageUserController";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { color } from "../../../../components/color";
import Image from "next/image";
import { imageUrl } from "../../../../controller/baseUrl";
import AppContext from "../../../../context/AppContext";

export default function UserSearch() {
  const { isMobile } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [userDetail, setUserDetail] = useState(null);
  const pageSize = 10;

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

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const onClickSearch = () => {
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
  const userData = useMemo(() => {
    let computedData = users;
    const startIndex = (currentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, users]);

  const onClickView = (id) => {
    ManageUserController.getUserDetail(id, (data) => {
      setUserDetail(data);
    });
  };

  return (
    <div>
      <ToastContainer />
      <NavBar />
      <h2 style={{ marginTop: 20, marginLeft: 30 }}>User Search</h2>
      <div style={{ width: "95%", margin: "0px auto" }}>
        <div className="d-flex flex-column">
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              marginTop: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // width: 220,
                height: 35,
              }}
            >
              <button
                type="button"
                className="btn btn-info"
                style={{ width: isMobile ? 100 : 150, fontSize: isMobile ? 13 : 14, color: color.white, marginRight: 10 }}
                onClick={getAccountItems}
              >
                All User
              </button>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search User Name"
                  aria-label="Search User Name"
                  aria-describedby="button-addon2"
                  style={{ width: isMobile ? 150 : 220 , fontSize: isMobile ? 13 : 14}}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon3"
                  onClick={() => onClickSearch()}
                >
                  <i class="bi bi-search"></i>
                </button>
              </div>
              {/* <input
                className="form-control"
                type="text"
                placeholder="Search User Name"
                
              />
              <button className="btn btn-light" onClick={() => onClickSearch()}>
                
              </button> */}
            </div>
          </div>

          <div class="table-responsive" style={{ margin: "30px 0px" }}>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Role</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Address</th>
                  <th scope="col">GC Amount</th>
                  <th scope="col">Box Donated</th>
                  <th scope="col">Box Status</th>
                  {/* <th scope="col">Actions</th> */}
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
                      <p
                        data-bs-toggle="modal"
                        data-bs-target="#userSearchModal"
                        onClick={() => onClickView(v.id)}
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
                    {/* <td>
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
                  </td> */}
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
      </div>
      <div
        class="modal fade"
        id="userSearchModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabelUserSearch"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabelUserSearch">
                User Detail
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {}}
              ></button>
            </div>
            <div class="modal-body">
              <div style={{ width: "95%", margin: "0px auto" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ flex: 2 }}>QR Code:</p>
                  <div style={{ flex: 3 }}>
                    <Image
                      alt=""
                      src={imageUrl + userDetail?.qrUrl}
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ flex: 2 }}>User Role:</p>
                  <p style={{ flex: 3 }}>
                    {userDetail?.role == 0
                      ? "User"
                      : userDetail?.role == 1
                      ? "Admin"
                      : userDetail?.role == 2
                      ? "Supplier"
                      : "Staff"}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ flex: 2 }}>User Name:</p>
                  <p style={{ flex: 3 }}>{userDetail?.userName}</p>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ flex: 2 }}>Email:</p>
                  <p style={{ flex: 3 }}>{userDetail?.email}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ flex: 2 }}>Mobile:</p>
                  <p style={{ flex: 3 }}>{userDetail?.mobile}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ flex: 2 }}>Postal Code:</p>
                  <p style={{ flex: 3 }}>{userDetail?.postalCode}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ flex: 2 }}>Street:</p>
                  <p style={{ flex: 3 }}>{userDetail?.street}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ flex: 2 }}>Unit No:</p>
                  <p style={{ flex: 3 }}>{userDetail?.unitNo}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ flex: 2 }}>Type of Housing:</p>
                  <p style={{ flex: 3 }}>
                    {userDetail?.housingType == 1
                      ? "Public Housing (HOB flats)"
                      : userDetail?.housingType == 2
                      ? "Private Condominiums / Apartments"
                      : userDetail?.housingType == 3
                      ? "Landed Housing"
                      : null}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ flex: 2 }}>Collection Box Type:</p>
                  <p style={{ flex: 3 }}>
                    {userDetail?.halalBox ? "Halal" : "Non-Halal"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
