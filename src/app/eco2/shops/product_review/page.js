"use client";
import React, { useContext, useEffect, useState } from "react";
import ShopNavBar from "../../../components/ShopNavBar";
import Image from "next/image";
import ReactStarsRating from "react-awesome-stars-rating";
import { color } from "../../../components/color";
import { EShopController } from "../../../controller";
import { getLocalStorage } from "../../../api/localStorage";
import AppContext from "../../../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../../controller/baseUrl";

export default function ProductReview() {
  const { userInfo } = useContext(AppContext);
  const [rating, setRating] = useState(0);
  const [productReviewData, setProductReviewData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    getProductListForReview();
  }, []);

  const getProductListForReview = () => {
    const id = getLocalStorage("id");
    EShopController.getProductListForReview(id, (data) => {
      if (data.length > 0) {
        var newArray = [];
        data.map((d, i) => {
          var obj = {};
          var newArray1 = [];
          obj["purchasedBrandId"] = d.purchasedBrandId;
          d.shopGalleryDisplayDtos.map((p, index) => {
            var obj1 = { ...p };
            obj1["rating"] = 0;
            obj1["review"] = "";
            newArray1.push(obj1);
          });
          obj["shopGalleryDisplayDtos"] = newArray1;
          newArray.push(obj);
        });
        setProductReviewData(newArray);
      } else {
        toast.warn("There is no product to give feedbak!", {
          position: 'top-right'
        })
      }
    });
  };

  const onChangeInfo = (index, index1, text, value) => {
    setProductReviewData((prevData) =>
      prevData.map((data, i) => {
        return i !== index
          ? data
          : {
              purchasedBrandId: data.purchasedBrandId,
              shopGalleryDisplayDtos: data.shopGalleryDisplayDtos.map(
                (p, i1) => {
                  return i1 !== index1
                    ? p
                    : {
                        id: p.id,
                        isProduct: p.isProduct,
                        imageUrl: p.imageUrl,
                        name: p.name,
                        unitPrice: p.unitPrice,
                        brandName: p.brandName,
                        inStock: p.inStock,
                        priority: p.priority,
                        rating: text == "rating" ? value : p.rating,
                        review: text == "review" ? value : p.review,
                      };
                }
              ),
            };
      })
    );
  };

  const onClickSubmit = (id) => {
    var filter = productReviewData.filter((v) => v.purchasedBrandId == id);
    var obj = {
      accountItemId: userInfo.userId,
      purchasedBrandId: id,
    };
    var array = [];
    var booleanArray = [];
    filter[0].shopGalleryDisplayDtos.map((j) => {
      if (j.rating == 0 && j.review == "") {
        booleanArray.push(false);
      } else {
        booleanArray.push(true);
      }
    });

    let checker = (arr) => arr.every((v) => v === false);

    if (checker(booleanArray) == false) {
      filter[0].shopGalleryDisplayDtos.map((v) => {
        var data = {};
        data["productId"] = v.id;
        data["rating"] = v.rating;
        data["review"] = v.review;
        array.push(data);
      });
      obj["createProductReviewDtos"] = array;
      EShopController.createProductReview(obj, (data) => {
        // toast.success("Product review is given successfully!", {
        //   position: "top-right",
        // });
        setIsSubmit(true)
        getProductListForReview();
      });
    } else {
      toast.warn("Please set Rating and Review at least for one product!", {
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <ShopNavBar name="Product Review" />
      {isSubmit ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: 20,
          }}
        >
          <i
            className="bi bi-check-circle"
            style={{ fontSize: 30, color: color.green }}
          ></i>
          <h5 style={{color: color.green}}>Thanks for providing your feedback!</h5>
        </div>
      ) : null}
      {productReviewData.map((data, index) => (
        <div
          key={index}
          style={{
            width: "95%",
            margin: "0px auto",
            backgroundColor: color.lightGrey,
            borderRadius: 20,
            padding: "20px 5px",
          }}
        >
          {data.shopGalleryDisplayDtos.map((p, index1) => (
            <div
              key={index1}
              className="row col-12 mx-auto"
              style={{ marginBottom: 30 }}
            >
              <div className="col-md-4 col-12 d-flex justify-content-center align-items-center">
                <Image
                  src={baseUrl + p.imageUrl}
                  alt=""
                  width={280}
                  height={210}
                />
              </div>
              <div className="col-md-8 col-12">
                <div style={{ lineHeight: 1 }}>
                  <p style={{ fontSize: 18, fontWeight: "bold" }}>{p.name}</p>
                  <p>Brand: {p.brandName}</p>
                  {/* <p>Description: blah blah</p> */}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <ReactStarsRating
                    onChange={(v) => onChangeInfo(index, index1, "rating", v)}
                    value={p.rating}
                    size={30}
                    starGap={10}
                    isHalf={false}
                  />
                </div>

                <textarea
                  placeholder="Share your experience with this product!"
                  style={{ width: "100%" }}
                  rows={3}
                  value={p.review}
                  onChange={(v) =>
                    onChangeInfo(index, index1, "review", v.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: 20,
            }}
          >
            <button
              className="btn btn-info"
              type="button"
              style={{
                // marginTop: 10,
                color: color.white,
              }}
              onClick={() => onClickSubmit(data.purchasedBrandId)}
            >
              Submit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
