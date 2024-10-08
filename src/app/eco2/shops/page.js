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
  BrandController,
} from "../../controller";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../context/AppContext";
import { baseUrl } from "../../controller/baseUrl";
import { color } from "../../components/color";
import { getLocalStorage } from "../../api/localStorage";

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
  const [allProductTemp, setAllProductTemp] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [subCategoryOrProduct, setSubCategoryOrProduct] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getAllProduct();
    getTopCategories();
    getBrandList();
    
  }, []);
  

  const getBrandList = () => {
    BrandController.getBrandIdList((data) => {
      setBrandList(data);
    });
  };

  const getAllProduct = () => {
    ProductController.getLandingProducts((data) => {
      if (data.length > 0) {
        var filtered = data.filter((v) => v.isProduct == true);
        setAllProduct(filtered);
        setAllProductTemp(filtered);
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
    if (userInfo.userName == "") {
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

  const onClickAddToWishlist = (productId, brandName, productName, brandEmail) => {
    if (userInfo.userName == "") {
      router.push("/login");
    } else {
      const userName = getLocalStorage("userName")
      var obj = {};
      obj["accountItemId"] = userInfo.userId;
      obj["productId"] = productId;
      EShopController.addToWishlist(obj, (data) => {
        if (data.id) {
          toast.success("Add to wishlist successful!", {
            position: "top-right",
          });
          try {
            fetch(`${baseUrl}/api/Email/send`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;",
              },
              body: JSON.stringify({
                toEmail: `${brandEmail}`,
                subject: ` Your ${productName} has been wishlisted!`,
                body: `<html><body><h4>Dear <b>${
                  brandName
                }</b>,</h4>
                      <p>${productName} has been wishlisted by ${userName}! .</p>
                      <p>${userName} will be informed that ${productName} is available for purchase once its status is updated to ‘In Stock’.</p>
                      </body></html>`,
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
              .then((res) => {})
              .catch((err) => console.log("email error =====>", err));
          } catch (err) {
            console.error(err);
            toast.error("Something went wrond!");
          }
        } else {
          toast.error("Something went wrong!", {
            position: "top-right",
          });
        }
      });
    }
  };

  const onClickSorting = (type) => {
    var newArray = [...allProductTemp];
    if (type == "low to high") {
      newArray.sort(function (a, b) {
        return parseFloat(a.unitPrice) - parseFloat(b.unitPrice);
      });
    } else if (type == "high to low") {
      newArray.sort(function (a, b) {
        return parseFloat(b.unitPrice) - parseFloat(a.unitPrice);
      });
    } 
    // else if (type == "a to z") {
    //   newArray.sort(function (a, b) {
    //     if (a.name.toLowerCase() < b.name.toLowerCase()) {
    //       return -1;
    //     }
    //     if (a.name.toLowerCase() > b.name.toLowerCase()) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    // } else if (type == "z to a") {
    //   newArray.sort(function (a, b) {
    //     if (a.name.toLowerCase() < b.name.toLowerCase()) {
    //       return 1;
    //     }
    //     if (a.name.toLowerCase() > b.name.toLowerCase()) {
    //       return -1;
    //     }
    //     return 0;
    //   });
    // }
    setAllProduct(newArray);
  };

  const onClickFilter = (brandName) => {
    var productArray = [...allProductTemp];
    if (brandName == "All") {
      setAllProduct(productArray);
    } else {
      var filter = productArray.filter((v) => v.brandName == brandName);
      setAllProduct(filter);
    }
  };

  const onChangeSearchText = (text) => {
    setSearchText(text);
    var productArray = allProductTemp.filter((v) => v.name.toLowerCase().includes(text.toLowerCase()));
    setAllProduct(productArray);
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
                src={baseUrl + cData.categoryImageUrl}
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
                value={searchText}
                onChange={(v) => onChangeSearchText(v.target.value)}
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
              <button
                class="dropdown-item"
                type="button"
                onClick={() => onClickSorting("default")}
              >
                Default
              </button>
            </li>
            {/* <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => onClickSorting("a to z")}
              >
                Name (A to Z)
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => onClickSorting("z to a")}
              >
                Name (Z to A)
              </button>
            </li> */}
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => onClickSorting("low to high")}
              >
                Price (Lower to Higher)
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => onClickSorting("high to low")}
              >
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
              <button
                class="dropdown-item"
                type="button"
                onClick={() => onClickFilter("All")}
              >
                All product
              </button>
            </li>
            {brandList.map((v, i) => (
              <li key={i}>
                <button
                  class="dropdown-item"
                  type="button"
                  onClick={() => onClickFilter(v.name)}
                >
                  Supplier ({v.name})
                </button>
              </li>
            ))}
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
                      src={baseUrl + v.imageUrl}
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
                      Retail Price: {"$"}
                      {v.unitPrice}
                    </p>
                    {v.discountedUnitPrice != null ? (
                      <p
                        class="card-text"
                        style={{ fontSize: 16, color: color.red }}
                      >
                        Discount Price: {"$"}
                        {v.discountedUnitPrice}
                      </p>
                    ) : null}

                    <p class="card-text" style={{ fontSize: 16 }}>
                      By: {v.brandName}
                      <Image
                        alt=""
                        src={baseUrl + v.brandLogoUrl}
                        width={20}
                        height={20}
                        style={{ borderRadius: 10, marginLeft: 5 }}
                      />
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
                          onClick={() => {
                            onClickAddToWishlist(v.id, v.brandName, v.name, v.brandEmail);
                          }}
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
                        src={baseUrl + data.imageUrl}
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
                      {data.discountedUnitPrice != null ? (
                        <p class="card-text" style={{ color: color.red }}>
                          Discount Price: ${data.discountedUnitPrice}
                        </p>
                      ) : null}

                      <p class="card-text">
                        By: {data.brandName}
                        <Image
                          alt=""
                          src={baseUrl + data.brandLogoUrl}
                          width={20}
                          height={20}
                          style={{ borderRadius: 10, marginLeft: 5 }}
                        />
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
                            onClick={() => onClickAddToWishlist(data.id, data.brandName, data.name, data.brandEmail)}
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
                      src={baseUrl + data.imageUrl}
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
