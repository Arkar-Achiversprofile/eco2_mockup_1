"use client";
import React, { useState } from "react";
import NavBar from "../../../../components/NavBar";
import { color } from "../../../../components/color";
import { ReportsController } from "../../../../controller";

export default function Reports() {
  const [tab, setTab] = useState(0);
  const [top5Products, setTop5Products] = useState([]);
  const [top5Categories, setTop5Categories] = useState([]);
  const [top5Donator, setTop5Donator] = useState([]);
  const [donatorByAddress, setDonatorByAddress] = useState([]);

  const onClickTabs = (value) => {
    if (value == 1) {
      getTop5SellingProducts();
    } else if (value == 2) {
      getTop5SellingCategories();
    } else if (value == 3) {
      getTop5Donator();
    } else if (value == 4) {
      getDonationByAddress();
    }
    setTab(value);
  };

  const getTop5SellingProducts = () => {
    ReportsController.getTop5SellingProducts((data) => {
      if (data.length > 0) {
        setTop5Products(data);
      }
    });
  };

  const getTop5SellingCategories = () => {
    ReportsController.getTop5SellingCategories((data) => {
      if (data.length > 0) {
        setTop5Categories(data);
      }
    });
  };

  const getTop5Donator = () => {
    ReportsController.getTop5Donator((data) => {
      if (data.length > 0) {
        setTop5Donator(data);
      }
    });
  };

  const getDonationByAddress = () => {
    ReportsController.getDonationByAddress((data) => {
      if (data.length > 0) {
        setDonatorByAddress(data);
      }
    });
  };
  return (
    <div>
      <NavBar />
      <h2 style={{ marginTop: 20, marginLeft: 30 }}>Reports</h2>
      <div className="row mt-3">
        <div className="col-md-3 col-8">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
            }}
          >
            <button
              type="button"
              class="btn btn-info"
              style={{
                color: tab == 1 ? color.skyBlue : color.white,
                fontSize: 14,
                padding: 10,
                backgroundColor: tab == 1 ? color.white : "",
                margin: "5px 10px",
              }}
              onClick={() => onClickTabs(1)}
            >
              Get Top 5 Selling Products
            </button>
            <button
              type="button"
              class="btn btn-info"
              style={{
                color: tab == 2 ? color.skyBlue : color.white,
                fontSize: 14,
                padding: 10,
                backgroundColor: tab == 2 ? color.white : "",
                margin: "5px 10px",
              }}
              onClick={() => onClickTabs(2)}
            >
              Get Top 5 Product Categories
            </button>
            <button
              type="button"
              class="btn btn-info"
              style={{
                color: tab == 3 ? color.skyBlue : color.white,
                fontSize: 14,
                padding: 10,
                backgroundColor: tab == 3 ? color.white : "",
                margin: "5px 10px",
              }}
              onClick={() => onClickTabs(3)}
            >
              Top 5 Food Waste Donor
            </button>
            <button
              type="button"
              class="btn btn-info"
              style={{
                color: tab == 4 ? color.skyBlue : color.white,
                fontSize: 14,
                padding: 10,
                backgroundColor: tab == 4 ? color.white : "",
                margin: "5px 10px",
              }}
              onClick={() => onClickTabs(4)}
            >
              Sum Food Waste Contribution by postal code
            </button>
          </div>
        </div>
        <div className="col-md-9 col-12">
          {tab == 1 ? (
            <div class="table-responsive" style={{ padding: "0px 20px" }}>
              {top5Products.length > 0 ? (
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Total Quantity Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top5Products.map((v, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v.productDescription}</td>
                        <td>{v.totalQuantitySold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          ) : tab == 2 ? (
            <div class="table-responsive" style={{ padding: "0px 20px" }}>
              {top5Categories.length > 0 ? (
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Total Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top5Categories.map((v, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v.categoryName}</td>
                        <td>{v.totalQuantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          ) : tab == 3 ? (
            <div class="table-responsive" style={{ padding: "0px 20px" }}>
              {top5Donator.length > 0 ? (
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Donator Name</th>
                      <th scope="col">Total Donation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top5Donator.map((v, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v.userName}</td>
                        <td>{v.totalDonation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          ) : tab == 4 ? (
            <div class="table-responsive" style={{ padding: "0px 20px" }}>
              {donatorByAddress.length > 0 ? (
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Address</th>
                      <th scope="col">Total Donation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donatorByAddress.map((v, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v.address}</td>
                        <td>{v.totalDonation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
