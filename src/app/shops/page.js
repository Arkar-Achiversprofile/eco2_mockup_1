"use client";
import React, { useState, useEffect, useMemo } from "react";
import styles from "./shops.module.css";
import Image from "next/image";
import { image } from "../assets";
import { tempShopData } from "../components/TempData";
import Pagination from "../components/Pagination";
import { useMediaQuery } from "react-responsive";
import Footer from "../components/Footer";

function Shops() {
  // const [allData, setAllData] = useState(tempShopData);
  // const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 500px) and (max-width: 1050px)",
  });
  // console.log("=====>", isMobile, isTablet);

  // useEffect(() => {
  // let tempData = [];
  // for (let i = 0; i < 6; i++) {
  //   tempData.push(tempShopData[i]);
  // }
  // setCurrentData(tempData);
  // }, []);

  const onPageChange = (page) => {
    // const data = tempShopData;
    setCurrentPage(page);
    // const paginatedPosts = paginate(data, currentPage, pageSize);
    // setCurrentData(paginatedPosts);
  };

  const productData = useMemo(() => {
    let computedData = tempShopData;
    const startIndex = (currentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage]);

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };
  return (
    <div>
      <div className="" style={{ width: "100%" }}>
        <Image
          alt=""
          src={image.shopBack}
          width={"100%"}
          height={"100%"}
          layout="responsive"
        />
      </div>
      <div className="d-flex mt-5">
        {/* <form className="d-flex flex-row justify-content-end col-12" onSubmit={{}}> */}
        <div className="d-flex justify-content-center col-10">
          <div className="d-flex flex-row col-8">
            <div class="input-group">
              <div class="input-group-text">
                <i className="bi bi-search"></i>
              </div>
              <input
                type="text"
                class="form-control form-control-sm"
                id="autoSizingInputGroup"
                placeholder="Search Products"
              />
            </div>
          </div>
        </div>

        {/* <div className="col-2">
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </div> */}
        {/* </form> */}

        <div class="dropdown col-2 d-flex flex-row justify-content-end">
          <button
            class="btn btn-outline-success dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ marginRight: 10 }}
          >
            <i className="bi bi-funnel-fill"></i>
            Filter
          </button>
          <ul class="dropdown-menu">
            <li>
              <button class="dropdown-item" type="button">
                Date (old to new)
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                Date (new to old)
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                Supplier (Yora)
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                Supplier (Mushroom Buddies)
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                Supplier (The Good Kombucha)
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                Supplier (Otolith Enrichment)
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div
          className="d-flex flex-row justify-content-evenly flex-wrap card-group"
          style={{ width: "100%", marginBottom: 50 }}
        >
          {productData.map((v, i) => (
            <div
              key={i}
              style={{
                width: isMobile ? "90%" : isTablet ? "40%" : "30%",
                marginLeft: 10,
                marginRight: 10,
                marginTop: 30,
              }}
            >
              <div class="card" style={{ width: "100%", minHeight: 680 }}>
                <Image
                  alt=""
                  className={styles.image}
                  src={v.image}
                  layout="responsive"
                  width={383}
                  height={450}
                  // onMouseOut={(e) => {
                  //   e.target.style.transform = "scale(1)";
                  // }}
                />
                <div class="card-body d-flex flex-column align-items-center">
                  <h5
                    class="card-title"
                    // style={{ fontSize: v.productName.length > 32 ? 18 : 22 }}
                  >
                    {v.productName}
                  </h5>
                  <p class="card-text">Retail Price: {v.price}</p>
                  <p class="card-text">By: {v.productBy}</p>
                  <div
                    style={{
                      width: "90%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      flexWrap: "wrap",
                    }}
                  >
                    <a href="/login" class="btn btn-outline-primary mt-2">
                      <i className="bi bi-cart-fill"></i>
                      Add to Cart
                    </a>
                    <a href="/login" class="btn btn-outline-success mt-2">
                      <i className="bi bi-heart"></i>
                      Add to Wishlist
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          items={tempShopData.length} // 12
          currentPage={currentPage} // 1
          setCurrentPage={setCurrentPage}
          pageSize={pageSize} // 6
          onPageChange={onPageChange}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Shops;
