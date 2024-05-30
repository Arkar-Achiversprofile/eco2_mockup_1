"use client";
import React, { useState, useEffect, useMemo } from "react";
import styles from "./shops.module.css";
import Image from "next/image";
import { image } from "../../assets";
import { tempShopData } from "../../components/TempData";
import Pagination from "../../components/Pagination";
import { useMediaQuery } from "react-responsive";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 500 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 3,
  },
};

function Shops() {
  // const [allData, setAllData] = useState(tempShopData);
  // const [currentData, setCurrentData] = useState([]);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 500px) and (max-width: 1050px)",
  });

  const categoryImage = isMobile ? 100 : 150;

  const [shopPage, setShopPage] = useState("allproduct");
  const [categoryName, setCategoryName] = useState("Seafood");
  const [subCategoryName, setSubCategoryName] = useState("Fish");
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

  const onClickCategory = (id) => {
    setShopPage("category");
  };

  const onClickSubCategory = () => {
    setShopPage("subcategory");
  };

  return (
    <div>
      <NavBar />
      <div className="" style={{ width: "100%" }}>
        <Image
          alt=""
          src={image.shopBack}
          width={"1000"}
          height={"500"}
          layout="responsive"
        />
      </div>

      <Carousel responsive={responsive}>
        <div
          className="d-flex flex-column align-items-center"
          onClick={onClickCategory}
          style={{ cursor: "pointer" }}
        >
          <Image
            alt=""
            src={image.fish}
            width={categoryImage}
            height={categoryImage}
            style={{ borderRadius: 100 }}
          />
          <div>Seafood</div>
        </div>
        <div
          className="d-flex flex-column align-items-center"
          onClick={onClickCategory}
          style={{ cursor: "pointer" }}
        >
          <Image
            alt=""
            src={image.vegetable}
            width={categoryImage}
            height={categoryImage}
            style={{ borderRadius: 100 }}
          />
          <div>Vegetable</div>
        </div>
        <div
          className="d-flex flex-column align-items-center"
          onClick={onClickCategory}
          style={{ cursor: "pointer" }}
        >
          <Image
            alt=""
            src={image.kombucha}
            width={categoryImage}
            height={categoryImage}
            style={{ borderRadius: 100 }}
          />
          <div>Consumable</div>
        </div>
        <div
          className="d-flex flex-column align-items-center"
          onClick={onClickCategory}
          style={{ cursor: "pointer" }}
        >
          <Image
            alt=""
            src={image.blackSoldier}
            width={categoryImage}
            height={categoryImage}
            style={{ borderRadius: 100 }}
          />
          <div>Fertillizer</div>
        </div>
        <div
          className="d-flex flex-column align-items-center"
          onClick={onClickCategory}
          style={{ cursor: "pointer" }}
        >
          <Image
            alt=""
            src={image.dogSmall}
            width={categoryImage}
            height={categoryImage}
            style={{ borderRadius: 100 }}
          />
          <div>Pet Food</div>
        </div>
      </Carousel>

      <div className="d-flex mt-5">
        {/* <form className="d-flex flex-row justify-content-end col-12" onSubmit={{}}> */}
        <div className="d-flex justify-content-center justify-content-md-end col-9">
          <div className="d-flex flex-row col-8">
            <div class="input-group" style={{ height: 30 }}>
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

        <div class="dropdown col-3 d-flex flex-row justify-content-end flex-wrap">
          <button
            className="btn btn-outline-success dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ marginRight: 10, width: 110 }}
          >
            <i className="bi bi-funnel-fill"></i>
            Sorting
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
                Price (Lower to Higher)
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                Price (Higher to Lower)
              </button>
            </li>
          </ul>

          <button
            className="btn btn-outline-success dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ marginRight: 10, width: 110 }}
          >
            <i className="bi bi-funnel-fill"></i>
            Filter
          </button>
          <ul class="dropdown-menu">
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

      {shopPage === "allproduct" ? (
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
                  <div
                  style={{cursor: 'pointer'}}
                    onClick={() => {
                      router.push(`/eco2/shops/productsdetail`);
                    }}
                  >
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
                  </div>
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
      ) : shopPage === "category" ? (
        <div>
          <nav
            aria-label="breadcrumb"
            style={{ marginLeft: 20, marginTop: 20 }}
          >
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a
                  style={{
                    textDecoration: "none",
                    fontSize: 22,
                    cursor: "pointer",
                  }}
                  onClick={() => setShopPage("allproduct")}
                >
                  eShop
                </a>
              </li>
              <li
                class="breadcrumb-item active"
                aria-current="page"
                style={{ fontSize: 22 }}
              >
                {categoryName}
              </li>
            </ol>
          </nav>
          <div
            className="d-flex flex-row justify-content-evenly flex-wrap card-group"
            style={{ width: "100%", marginBottom: 50 }}
          >
            <div
              style={{
                width: isMobile ? "90%" : isTablet ? "40%" : "30%",
                marginLeft: 10,
                marginRight: 10,
                marginTop: 30,
              }}
              onClick={() => {
                onClickSubCategory();
              }}
            >
              <div class="card" style={{ width: "100%" }}>
                <Image
                  alt=""
                  className={styles.image}
                  src={image.fish}
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
                    Fish
                  </h5>
                </div>
              </div>
            </div>
            <div
              style={{
                width: isMobile ? "90%" : isTablet ? "40%" : "30%",
                marginLeft: 10,
                marginRight: 10,
                marginTop: 30,
              }}
              onClick={() => {
                onClickSubCategory();
              }}
            >
              <div class="card" style={{ width: "100%" }}>
                <Image
                  alt=""
                  className={styles.image}
                  src={image.prawn}
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
                    Prawn
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <nav
            aria-label="breadcrumb"
            style={{ marginLeft: 20, marginTop: 20 }}
          >
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a
                  style={{
                    textDecoration: "none",
                    fontSize: 22,
                    cursor: "pointer",
                  }}
                  onClick={() => setShopPage("allproduct")}
                >
                  eShop
                </a>
              </li>
              <li class="breadcrumb-item" style={{ fontSize: 22 }}>
                <a
                  style={{
                    textDecoration: "none",
                    fontSize: 22,
                    cursor: "pointer",
                  }}
                  onClick={() => setShopPage("category")}
                >
                  {categoryName}
                </a>
              </li>
              <li
                class="breadcrumb-item active"
                aria-current="page"
                style={{ fontSize: 22 }}
              >
                {subCategoryName}
              </li>
            </ol>
          </nav>
          <div
            className="d-flex flex-row justify-content-evenly flex-wrap card-group"
            style={{ width: "100%", marginBottom: 50 }}
          >
            <div
              style={{
                width: isMobile ? "90%" : isTablet ? "40%" : "30%",
                marginLeft: 10,
                marginRight: 10,
                marginTop: 30,
              }}
            >
              <div class="card" style={{ width: "100%", minHeight: 680 }}>
                <div
                  onClick={() => {
                    router.push(`/eco2/shops/productsdetail`);
                  }}
                >
                  <Image
                    alt=""
                    className={styles.image}
                    src={image.fish}
                    layout="responsive"
                    width={383}
                    height={450}
                    // onMouseOut={(e) => {
                    //   e.target.style.transform = "scale(1)";
                    // }}
                  />
                </div>
                <div class="card-body d-flex flex-column align-items-center">
                  <h5
                    class="card-title"
                    // style={{ fontSize: v.productName.length > 32 ? 18 : 22 }}
                  >
                    Locally Farmed Tilapia
                  </h5>
                  <p class="card-text">Retail Price: $6.00</p>
                  <p class="card-text">By: Otolith Enrichment</p>
                  <div
                    style={{
                      width: "90%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() => router.push("/login")}
                      class="btn btn-outline-primary mt-2"
                    >
                      <i className="bi bi-cart-fill"></i>
                      Add to Cart
                    </button>
                    <button
                      onClick={() => router.push("/login")}
                      class="btn btn-outline-success mt-2"
                    >
                      <i className="bi bi-heart"></i>
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Shops;
