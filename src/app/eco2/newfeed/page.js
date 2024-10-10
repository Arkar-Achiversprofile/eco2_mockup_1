"use client";
import React, { useContext } from "react";
import NavBar from "../../components/NavBar";
import Image from "next/image";
import { image } from "../../assets";
import AppContext from "../../context/AppContext";
import Footer from "../../components/Footer";

export default function NewFeed() {
  const { isTablet } = useContext(AppContext);
  return (
    <div>
      <NavBar />
      <div style={{ width: "100%" }}>
        <Image
          alt=""
          src={image.newFeed}
          width={1500}
          height={550}
          style={{ opacity: 0.8 }}
          layout="responsive"
        />
      </div>

      <div
        className="row col-12"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="col-lg-8 col-11">
          <div
            className="elfsight-app-1ac290fd-3262-4c05-a3fc-0a4363cb012f"
            data-elfsight-app-lazy
          />
        </div>
        <div className="col-lg-3 col-11 mt-3">
          <h4 style={{ textAlign: isTablet ? "center" : null }}>
            #OtolithFacebook
          </h4>
          <div
            class="elfsight-app-66d631e3-2908-4aa1-a736-ab5f58e42a4c"
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
