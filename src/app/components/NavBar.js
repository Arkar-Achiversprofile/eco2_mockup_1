"use client";
import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { color } from "./color";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import AppContext from "../context/AppContext";

export default function NavBar() {
  const { userInfo, setUserInfo, isMobile, isTablet } = useContext(AppContext);
  const router = useRouter();
  const fontSize = isMobile ? 25 : isTablet ? 30 : 50;

  const onClickLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("password");
    localStorage.removeItem("userName");
    setUserInfo({
      userId: 0,
      qrUrl: "",
      greenCurrencyBalance: 0,
      userName: "",
    });
  };
  return (
    <nav class="navbar bg-dark">
      <div class="container-fluid">
        <div style={{ flex: 1 }}>
          {isMobile ? (
            <h2
            // className={styles.title}
            style={{
              color: "white",
              fontWeight: "bold",
              // marginTop: isMobile ? 10 : 0,
              marginRight: -50,
              textAlign: "center",
              cursor: "pointer",
            }}
            // onClick={() => router.push("/")}
          >
            <a
              href="/"
              style={{
                color: color.white,
                textDecoration: "none",
                fontFamily: "serif",
              }}
            >
              Otolith Enrichment
            </a>
          </h2>
          ) : (
            <h1
            // className={styles.title}
            style={{
              color: "white",
              fontWeight: "bold",
              // marginTop: isMobile ? 10 : 0,
              marginRight: -50,
              textAlign: "center",
              cursor: "pointer",
            }}
            // onClick={() => router.push("/")}
          >
            <a
              href="/"
              style={{
                color: color.white,
                textDecoration: "none",
                fontFamily: "serif",
              }}
            >
              Otolith Enrichment
            </a>
          </h1>
          )}
          
        </div>
        {userInfo.userId == 0 ||
        userInfo.userId == undefined ||
        userInfo.userId == "" ? (
          <div
            style={{
              // width: "13%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              onClick={() => router.push("/login")}
              style={{
                textDecoration: "none",
                fontSize: isMobile ? 9 : isTablet ? 10 : 16,
                color: color.white,
                cursor: "pointer",
              }}
            >
              SignIn/SignUp
            </div>
          </div>
        ) : (
          <>
            <div
              // class="navbar-toggler"
              className={styles.menu}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              // style={{color: color.grey}}
              style={{
                marginRight: 10,
                // fontSize: isMobile ? 22 : isTablet ? 25 : 35,
              }}
            >
              <i className="bi bi-list" style={{ color: color.white }}></i>
            </div>
            <div
              class="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                  Eco2 Balance
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="/"
                      // style={{ cursor: "pointer" }}
                    >
                      Home
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="/eco2/shops"
                      // style={{ cursor: "pointer" }}
                    >
                      Eco2 Shop
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="/eco2/shops/transaction_history"
                      // onClick={() => {}}
                      // style={{ cursor: "pointer" }}
                    >
                      Transaction History
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="/eco2/shops/cart"
                      // onClick={() => {}}
                      // style={{ cursor: "pointer" }}
                    >
                      My Cart
                    </a>
                  </li>
                  {userInfo.role == 1 ? (
                    <>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          href="/eco2/volunteer_management"
                          // style={{ cursor: "pointer" }}
                        >
                          Volunteer Management
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          href="/eco2/admin_panel"
                          // style={{ cursor: "pointer" }}
                        >
                          Admin Panel
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="/eco2/admin_panel/GCadjust">
                          GC Adjustment
                        </a>
                      </li>
                      <li class="nav-item dropdown">
                        <a
                          class="nav-link dropdown-toggle"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          E Shop Product and Category
                        </a>
                        <ul class="dropdown-menu">
                          <li>
                            <a
                              class="dropdown-item"
                              href="/eco2/admin_panel/category"
                            >
                              Category
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              href="/eco2/admin_panel/brand"
                            >
                              Brand
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              href="/eco2/admin_panel/collection"
                            >
                              Collection for Brand
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              href="/eco2/admin_panel/product"
                            >
                              Product
                            </a>
                          </li>
                        </ul>
                      </li>
                    </>
                  ) : null}
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="/"
                      onClick={() => onClickLogout()}
                      style={{ cursor: "pointer" }}
                    >
                      Log out
                    </a>
                  </li>
                </ul>
                {/* <form class="d-flex mt-3" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
