/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
import ShopNavBar from "../../../components/ShopNavBar";
import AppContext from "../../../context/AppContext";
import { EShopController } from "../../../controller";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Wishlist() {
  const { userInfo } = useContext(AppContext);
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    getWishlistData();
  }, [userInfo.userId]);

  const getWishlistData = () => {
    EShopController.getWishlistByAccountId(userInfo.userId, (data) => {
      if (data.length > 0) {
        setWishlistData(data);
      }
    });
  };

  const removeWishlist = (id) => {
    EShopController.removeWishlistByUser(id, data => {
      getWishlistData();
    })
  }

  return (
    <div>
      <ToastContainer />
      <ShopNavBar name="Wishlist" />
      <div class="row col-12 mx-auto">
        {wishlistData.map((w, i) => (
            <div class="col-md-4 col-sm-6 mt-3" key={i}>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{w.productName}</h5>
                <div class="card-text">
                  <div className="d-flex flex-row justify-content-between">
                    <p>brand:</p>
                    <p>{w.brandName}</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p>Category:</p>
                    <p>{w.categoryName}</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p>Price:</p>
                    <p>{w.unitPrice}</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                {/* <button class="btn btn-primary" style={{marginRight: 10, fontSize: 14}}>
                    Add to Cart
                </button> */}
                <button class="btn btn-dark" style={{fontSize: 14}} onClick={() => removeWishlist(w.wishListId)}>
                    Remove
                </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      
      </div>
    </div>
  );
}
