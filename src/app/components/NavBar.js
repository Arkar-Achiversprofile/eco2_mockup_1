"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { color } from "../components/color";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  })
  const isTablet = useMediaQuery({
    query: "(max-width: 770px)",
  });
  return (
    // <nav class="navbar navbar-expand-xl navbar-light bg-dark">
    //   <div
    //     style={{
    //       width: "100%",
    //       height: "100%",
    //       display: "flex",
    //       flexDirection: 'row',
    //       justifyContent: 'space-around',
    //       backgroundColor: "green",
    //     }}
    //   >
    //     <div
    //       style={{
    //         // display: "flex",
    //         // justifyContent: "center",
    //         // alignItems: "center",
    //         backgroundColor: "red",
    //       }}
    //     >
    //       <h1
    //         style={{
    //           fontSize: isTablet ? 30 : 50,
    //           color: "white",
    //           fontWeight: "bold",
    //           alignSelf: "center",
    //           // marginRight: isTablet ? -70 : -150,
    //         }}
    //       >
    //         <a
    //           href="/"
    //           style={{
    //             color: "white",
    //             textDecoration: "none",
    //             fontFamily: "serif",
    //           }}
    //         >
    //           Otolith Enrichment
    //         </a>
    //       </h1>
    //     </div>
    //     {/* <div
    //     style={{
    //       width: "13%",
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <div
    //       onClick={() => router.push("/eco2/shops/scanner")}
    //       style={{ textDecoration: "none", fontSize: isTablet ? 10 : 16, color: color.white, cursor: 'pointer' }}
    //     >
    //       Scan In/Out
    //     </div>
    //   </div> */}
    //     <button
    //       class="btn btn-secondary"
    //       type="button"
    //       data-bs-toggle="offcanvas"
    //       data-bs-target="#offcanvasRight"
    //       aria-controls="offcanvasRight"
    //     >
    //       <i className="bi bi-list"></i>
    //     </button>

    //     <div
    //       className="offcanvas offcanvas-end"
    //       tabindex="2"
    //       id="offcanvasRight"
    //       aria-labelledby="offcanvasRightLabel"
    //     >
    //       <div className="offcanvas-header">
    //         <h5 className="offcanvas-title" id="offcanvasRightLabel">
    //           Offcanvas right
    //         </h5>
    //         <button
    //           type="button"
    //           className="btn-close"
    //           data-bs-dismiss="offcanvas"
    //           aria-label="Close"
    //         ></button>
    //       </div>
    //       <div className="offcanvas-body">...</div>
    //     </div>
    //   </div>

    //   {/* <div class="container-fluid">
    //     <button
    //       class="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarTogglerDemo03"
    //       aria-controls="navbarTogglerDemo03"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span class="navbar-toggler-icon"></span>
    //     </button>
    //     <a class="navbar-brand" href="#">
    //       Navbar
    //     </a>
    //     <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    //       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li class="nav-item">
    //           <a class="nav-link active" aria-current="page" href="#">
    //             Home
    //           </a>
    //         </li>
    //         <li class="nav-item">
    //           <a class="nav-link" href="#">
    //             Link
    //           </a>
    //         </li>
    //         <li class="nav-item">
    //           <a
    //             class="nav-link disabled"
    //             href="#"
    //             tabindex="-1"
    //             aria-disabled="true"
    //           >
    //             Disabled
    //           </a>
    //         </li>
    //       </ul>
    //       <form class="d-flex">
    //         <input
    //           class="form-control me-2"
    //           type="search"
    //           placeholder="Search"
    //           aria-label="Search"
    //         />
    //         <button class="btn btn-outline-success" type="submit">
    //           Search
    //         </button>
    //       </form>
    //     </div>
    //   </div> */}
    // </nav>
    <nav class="navbar bg-dark">
      <div class="container-fluid">
        <div style={{flex: 1}}>
        <h1
          style={{
            fontSize: isMobile ? 25 : isTablet ? 30 : 50,
            color: "white",
            fontWeight: "bold",
            textAlign: 'center',
            marginRight: -50
          }}
        >
          <a
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontFamily: "serif",
            }}
          >
            Otolith Enrichment
          </a>
        </h1>
        </div>
        <div
          // class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          // style={{color: color.grey}}
          style={{marginRight: 10 }}
        >
          <i className="bi bi-list" style={{color: color.white, fontSize: isMobile ? 20 : isTablet ? 25 : 35}}></i>
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
                <a class="nav-link" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Order History
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/eco2/shops">
                  Eco2 Shop
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/eco2/volunteer_management">
                  Volunteer Management
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
      </div>
    </nav>
  );
}
