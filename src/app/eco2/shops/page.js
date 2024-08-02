"use client";
import React, { useState, useEffect, useMemo, useContext } from "react";
import styles from "./shops.module.css";
import Image from "next/image";
import { image } from "../../assets";
import Pagination from "../../components/Pagination";
import { useMediaQuery } from "react-responsive";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  CategoryController,
  ProductController,
  EShopController,
} from "../../controller";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../context/AppContext";

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
  const { setContextBreadCrumb, userInfo } = useContext(AppContext);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [subCurrentPage, setSubCurrentPage] = useState(1);
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 500px) and (max-width: 1050px)",
  });

  const categoryImage = isMobile ? 100 : 150;

  const [shopPage, setShopPage] = useState("allproduct");
  const [isCategoryClick, setIsCategoryClick] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [subCategoryOrProduct, setSubCategoryOrProduct] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    getAllProduct();
    getTopCategories();
  }, []);

  const getAllProduct = () => {
    ProductController.getLandingProducts((data) => {
      if (data.length > 0) {
        var filtered = data.filter((v) => v.isProduct == true);
        setAllProduct(filtered);
      } else {
        toast.error("There are no product!", {
          position: "top-right",
        });
      }
    });
  };

  const getTopCategories = () => {
    CategoryController.getTopCategory((data) => {
      if (data.length > 0) {
        setTopCategories(data);
      }
    });
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onSubPageChange = (page) => {
    setSubCurrentPage(page);
  };

  const productData = useMemo(() => {
    let computedData = allProduct;
    const startIndex = (currentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, allProduct]);

  const subProduct = useMemo(() => {
    let computedData = subCategoryOrProduct;
    const startIndex = (subCurrentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [subCurrentPage, subCategoryOrProduct]);

  console.log("=====>", subProduct);

  const onClickCategory = (id, name) => {
    setShopPage("categoryClicked");
    setIsCategoryClick(true);
    var array = [];
    var obj = {};
    obj["id"] = id;
    obj["name"] = name;
    array.push(obj);
    setBreadcrumb(array);
    setContextBreadCrumb(array);
    EShopController.getSubCategoryOrProduct(id, (data) => {
      if (data.length > 0) {
        setSubCategoryOrProduct(data);
      } else {
        setSubCategoryOrProduct([]);
        toast.error("There are no product!", {
          position: "top-right",
        });
      }
    });
  };

  const onClickSubCategory = (id, name) => {
    var newBread = [...breadcrumb];
    var obj = {};
    obj["id"] = id;
    obj["name"] = name;
    newBread.push(obj);
    setBreadcrumb(newBread);
    setContextBreadCrumb(newBread);
    EShopController.getSubCategoryOrProduct(id, (data) => {
      if (data.length > 0) {
        setSubCategoryOrProduct(data);
      } else {
        setSubCategoryOrProduct([]);
        toast.error("There are no product!", {
          position: "top-right",
        });
      }
    });
  };

  const onClickBreadCrumb = (id, name) => {
    var index = breadcrumb.findIndex((v) => v.id == id);

    var newBread = [...breadcrumb];

    newBread.splice(index + 1);
    setBreadcrumb(newBread);
    setContextBreadCrumb(newBread);
    EShopController.getSubCategoryOrProduct(id, (data) => {
      if (data.length > 0) {
        setSubCategoryOrProduct(data);
      } else {
        setSubCategoryOrProduct([]);
        toast.error("There are no product!", {
          position: "top-right",
        });
      }
    });
  };

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const onClickProduct = (id, name) => {
    var newBread = [...breadcrumb];
    var obj = {};
    obj["id"] = id;
    obj["name"] = name;
    newBread.push(obj);
    setContextBreadCrumb(newBread);
    router.push(
      `/eco2/shops/productsdetail` + "?" + createQueryString("productId", id)
    );
  };

  const onClickAddToCart = (productId) => {
    if (userInfo.userNam == "") {
      router.push("/login");
    } else {
      var obj = {};
      obj["accountItemID"] = userInfo.userId;
      obj["productID"] = productId;
      obj["quantity"] = 1;
      EShopController.addToCart(obj, (data) => {
        if (data.accountItemID) {
          toast.success("Add to cart successful!", {
            position: "top-right",
          });
        } else {
          toast.error("Something went wrong!", {
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
      <div className="" style={{ width: "100%" }}>
        <Image
          alt=""
          src={image.shopBack}
          width={"1000"}
          height={"500"}
          layout="responsive"
        />
      </div>
      {!isCategoryClick ? (
        <Carousel responsive={responsive}>
          {topCategories.map((cData, index) => (
            <div
              key={index}
              className="d-flex flex-column align-items-center"
              onClick={() => onClickCategory(cData.id, cData.name)}
              style={{ cursor: "pointer" }}
            >
              <Image
                alt=""
                src={cData.categoryImageUrl}
                width={categoryImage}
                height={categoryImage}
                style={{ borderRadius: 100 }}
              />
              <div>{cData.name}</div>
            </div>
          ))}
        </Carousel>
      ) : null}

      <div className="d-flex mt-5">
        {/* <form className="d-flex flex-row justify-content-end col-12" onSubmit={{}}> */}
        <div className="d-flex justify-content-center justify-content-md-end col-9">
          <div className="d-flex flex-row col-9">
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
            style={{
              marginRight: 10,
              width: isMobile ? 75 : 110,
              // height: 30,
              fontSize: isMobile ? 10 : 14,
            }}
          >
            <i className="bi bi-funnel-fill"></i>
            Sorting
          </button>
          <ul class="dropdown-menu" style={{ fontSize: isMobile ? 12 : 14 }}>
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
            style={{
              marginRight: 10,
              width: isMobile ? 75 : 110,
              // height: 30,
              fontSize: isMobile ? 10 : 14,
            }}
          >
            <i className="bi bi-funnel-fill"></i>
            Filter
          </button>
          <ul class="dropdown-menu" style={{ fontSize: isMobile ? 12 : 14 }}>
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
                  width: 350,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 30,
                }}
              >
                <div class="card" style={{ width: "100%", minHeight: 650 }}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      onClickProduct(v.id, v.name);
                    }}
                  >
                    <Image
                      alt=""
                      className={styles.image}
                      src={v.imageUrl}
                      // layout="responsive"
                      width={350}
                      height={420}
                      // onMouseOut={(e) => {
                      //   e.target.style.transform = "scale(1)";
                      // }}
                    />
                  </div>
                  <div class="card-body d-flex flex-column align-items-center">
                    <h5
                      class="card-title"
                      style={{ fontSize: v.name.length > 32 ? 20 : 22 }}
                    >
                      {v.name}
                    </h5>
                    <p class="card-text" style={{ fontSize: 16 }}>
                      Retail Price: {v.unitPrice}
                      {"$"}
                    </p>
                    <p class="card-text" style={{ fontSize: 16 }}>
                      By: {v.brandName}
                    </p>
                    <div
                      style={{
                        width: "90%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                      }}
                    >
                      {v.inStock ? (
                        <a
                          // href="/login"
                          class="btn btn-outline-primary mt-2"
                          style={{ width: "70%" }}
                          onClick={() => {
                            onClickAddToCart(v.id);
                          }}
                        >
                          <i className="bi bi-cart-fill"></i>
                          Add to Cart
                        </a>
                      ) : (
                        <a
                          // href="/login"
                          class="btn btn-outline-success mt-2"
                          style={{ width: "70%" }}
                        >
                          <i className="bi bi-heart"></i>
                          Add to Wishlist
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            items={allProduct.length} // 12
            currentPage={currentPage} // 1
            setCurrentPage={setCurrentPage}
            pageSize={pageSize} // 6
            onPageChange={onPageChange}
          />
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
                  onClick={() => {
                    setShopPage("allproduct");
                    setSubCategoryOrProduct([]);
                    setBreadcrumb([]);
                    setContextBreadCrumb([]);
                    getAllProduct();
                    setIsCategoryClick(false);
                  }}
                >
                  eShop
                </a>
              </li>
              {breadcrumb.map((breadData, index) =>
                index == breadcrumb.length - 1 ? (
                  <li
                    key={index}
                    class="breadcrumb-item active"
                    aria-current="page"
                    style={{ fontSize: 22 }}
                    // onClick={() => {
                    //   onClickBreadCrumb(breadData.id, breadData.name)
                    // }}
                  >
                    {breadData.name}
                  </li>
                ) : (
                  <li
                    key={index}
                    class="breadcrumb-item"
                    aria-current="page"
                    style={{ fontSize: 22, cursor: "pointer" }}
                    onClick={() => {
                      onClickBreadCrumb(breadData.id, breadData.name);
                    }}
                  >
                    {breadData.name}
                  </li>
                )
              )}
            </ol>
          </nav>
          <div
            className="d-flex flex-row justify-content-evenly flex-wrap card-group"
            style={{ width: "100%", marginBottom: 50 }}
          >
            {subProduct.map((data, index) =>
              data.isProduct ? (
                <div
                  key={index}
                  style={{
                    width: 350,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 30,
                  }}
                >
                  <div class="card" style={{ width: "100%", minHeight: 650 }}>
                    <div
                      onClick={() => {
                        onClickProduct(data.id, data.name);
                      }}
                    >
                      <Image
                        alt=""
                        className={styles.image}
                        src={data.imageUrl}
                        // layout="responsive"
                        width={350}
                        height={420}
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
                        {data.name}
                      </h5>
                      <p class="card-text">Retail Price: ${data.unitPrice}</p>
                      <p class="card-text">By: {data.brandName}</p>
                      <div
                        style={{
                          width: "90%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          flexWrap: "wrap",
                        }}
                      >
                        {data.inStock ? (
                          <button
                            onClick={() => onClickAddToCart(data.id)}
                            class="btn btn-outline-primary mt-2"
                            style={{ width: "70%" }}
                          >
                            <i className="bi bi-cart-fill"></i>
                            Add to Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => router.push("/login")}
                            class="btn btn-outline-success mt-2"
                            style={{ width: "70%" }}
                          >
                            <i className="bi bi-heart"></i>
                            Add to Wishlist
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  style={{
                    width: 350,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 30,
                  }}
                  onClick={() => {
                    onClickSubCategory(data.id, data.name);
                  }}
                >
                  <div class="card" style={{ width: "100%" }}>
                    <Image
                      alt=""
                      className={styles.image}
                      src={data.imageUrl}
                      // layout="responsive"
                      width={350}
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
                        {data.name}
                      </h5>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <Pagination
            items={subCategoryOrProduct.length} // 12
            currentPage={subCurrentPage} // 1
            setCurrentPage={setSubCurrentPage}
            pageSize={pageSize} // 6
            onPageChange={onSubPageChange}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Shops;
