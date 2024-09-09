"use client";
import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { color } from "../../components/color";

export default function AdminPanel() {
  const [tab, setTab] = useState(0);
  const onClickTabs = (value) => {
    setTab(value);
  };
  return (
    <div>
      <NavBar />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          //   justifyContent: "space-evenly",
          margin: "30px 0",
        }}
      >
        <button
          type="button"
          class="btn btn-info"
          style={{
            color: tab == 1 ? color.skyBlue : color.white,
            width: 150,
            backgroundColor: tab == 1 ? color.white : "",
            margin: "5px 10px",
          }}
          onClick={() => onClickTabs(1)}
        >
          Accounts
        </button>
        <button
          type="button"
          class="btn btn-info"
          style={{
            color: tab == 2 ? color.skyBlue : color.white,
            width: 150,
            backgroundColor: tab == 2 ? color.white : "",
            margin: "5px 10px",
          }}
          onClick={() => onClickTabs(2)}
        >
          Category
        </button>
        <button
          type="button"
          class="btn btn-info"
          style={{
            color: tab == 3 ? color.skyBlue : color.white,
            width: 150,
            backgroundColor: tab == 3 ? color.white : "",
            margin: "5px 10px",
          }}
          onClick={() => onClickTabs(3)}
        >
          Product
        </button>
        <button
          type="button"
          class="btn btn-info"
          style={{
            color: tab == 4 ? color.skyBlue : color.white,
            width: 150,
            backgroundColor: tab == 4 ? color.white : "",
            margin: "5px 10px",
          }}
          onClick={() => onClickTabs(4)}
        >
          Inventory
        </button>
        <button
          type="button"
          class="btn btn-info"
          style={{
            color: tab == 5 ? color.skyBlue : color.white,
            width: 150,
            backgroundColor: tab == 5 ? color.white : "",
            margin: "5px 10px",
          }}
          onClick={() => onClickTabs(5)}
        >
          Supplier
        </button>
        <button
          type="button"
          class="btn btn-info"
          style={{
            color: tab == 6 ? color.skyBlue : color.white,
            width: 150,
            backgroundColor: tab == 6 ? color.white : "",
            margin: "5px 10px",
          }}
          onClick={() => onClickTabs(6)}
        >
          Orders
        </button>
        <button
          type="button"
          class="btn btn-info"
          style={{
            color: tab == 7 ? color.skyBlue : color.white,
            width: 150,
            backgroundColor: tab == 7 ? color.white : "",
            margin: "5px 10px",
          }}
          onClick={() => onClickTabs(7)}
        >
          Volunteers
        </button>
        {/* <button type="button" class="btn btn-info" style={{color: "white", width: 100}}>
          Project
        </button>
        <button type="button" class="btn btn-info" style={{color: "white", width: 100}}>
          Search Function
        </button> */}
      </div>
      <div style={{ margin: "0 10px" }}>
        {tab == 1 ? (
          <div>
            <h3>Accounts</h3>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <button className="btn btn-success btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>
                    <button className="btn btn-success btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                  <td>
                    <button className="btn btn-success btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
