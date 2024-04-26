import Image from "next/image";
import React from "react";
import { image } from "../assets";
import { useRouter } from "next/navigation";

export default function ShopNavBar({name = ''}) {
  const router = useRouter();
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <div className="col-1 d-flex justify-content-center align-items-center">
          <i
          onClick={() => {router.back()}}
            className="bi bi-arrow-left-circle-fill"
            style={{ fontSize: 25, cursor: 'pointer' }}
          ></i>
        </div>
        <div className="col-10 d-flex flex-column justify-content-center align-items-center">
          <Image alt="" src={image.mainLogo} width={180} height={60} onClick={() => {router.replace("/")}} />
          <h5 style={{marginTop: 10}}>{name}</h5>
        </div>
        <div className="col-1 d-flex justify-content-center align-items-center">
          <i className="bi bi-bag" style={{fontSize: 25}}></i>
        </div>
      </div>
    </nav>
  );
}
