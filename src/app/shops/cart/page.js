"use client";
import { image } from "@/app/assets";
import ShopNavBar from "@/app/components/ShopNavBar";
import { color } from "@/app/components/color";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useMediaQuery } from "react-responsive";

export default function Cart() {
    const router = useRouter();
    const isMobile = useMediaQuery({
        query: "(max-width: 770px)",
      });
      const isTablet = useMediaQuery({
        query: "(min-width: 770px) and (max-width: 1050px)",
      });

  return (
    <div>
      <ShopNavBar name="Shopping Cart" />
      <div className="row mt-5 mb-5">
        <div className="col-10 col-md-5 d-flex justify-content-center justify-content-md-end mx-auto">
          <div className="col-4">
            <Image
              alt=""
              width={200}
              height={150}
              layout="responsive"
              src={image.fish}
            />
          </div>
          <div className="col-8 border">
            <div className="px-2 pt-2">
                {isMobile || isTablet ? ( <h6>Fish</h6>) : (<h5>Fish</h5>)}
              
              <div className="d-flex flex-row justify-content-between">
                <p style={{color: color.grey, fontSize: isMobile ? 10 : 16}}>QUANTITY: 1</p>
                <p style={{ color: color.green, fontSize: isMobile ? 8 : 12 }}>
                  Green Currency: 199.79
                </p>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                  <p style={{color: color.grey, fontSize: isMobile ? 10 : 16}}>Color: </p>
                  <div style={{width: 10, height: 10, borderRadius: 5, backgroundColor: color.orange, marginTop: 5, marginLeft: 10}}/>
                </div>
                <p style={{ fontWeight: 'bold', fontSize: isMobile ? 8 : 12 }}>
                  SGD: 4
                </p>
              </div>
              <button
                type="button"
                class="btn btn-dark btn-sm"
                style={{ color: color.white, marginTop: isMobile ? 0 : 10, fontSize: isMobile ? 8 : 16}}
                // onClick={() => router.push("/shops/cart")}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="col-10 col-md-5 mx-auto d-flex flex-column align-items-center align-items-md-start">
            <div className="col-12 d-flex flex-row justify-content-between">
                <p>Subtotal:</p>
                <p>SGD: 4</p>
            </div>
            <hr className="col-12"/>
            <div className="col-12 d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-info"
                style={{ color: color.white, width: "80%", fontSize: 18, marginTop: isMobile? 10 : 50 }}    
                onClick={() => router.push("/shops/shipping")}
              >
                Continue
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
