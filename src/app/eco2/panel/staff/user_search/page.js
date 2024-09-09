"use client";
import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../../../components/NavBar";
import Pagination from "../../../../components/Pagination";
import { ManageUserController } from "../../../../controller/admin/ManageUserController";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { color } from "../../../../components/color";

export default function UserSearch() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
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
                width: 220,
                height: 35,
              }}
            >
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search User Name"
                  aria-label="Search User Name"
                  aria-describedby="button-addon2"
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
                      {/* <p
                        data-bs-toggle="modal"
                        data-bs-target="#userSearchModal"
                        onClick={() => onClickView(v.id)}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: color.skyBlue,
                        }}
                      > */}
                        {v.userName}
                      {/* </p> */}
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
    </div>
  );
}
