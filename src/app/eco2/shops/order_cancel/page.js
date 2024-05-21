'use client'
import { useRouter } from "next/navigation";
import React from "react";
import ShopNavBar from "../../../components/ShopNavBar";
import { color } from "../../../components/color";

export default function OrderCancel() {
    const router = useRouter();

    return (
        <div>
            <ShopNavBar name="Order Cancel"/>
            <div className="d-flex flex-column justifu-content-center align-items-center mt-5">
            <i className="bi bi-x-circle" style={{fontSize: 70, color: color.red}}></i>
            <p style={{color: color.red, fontSize: 20}}>Payment is canceled!</p>
            <p>Your order has been cancel</p>
            {/* <p style={{fontSize: 10, color: color.grey}}>Thank you for your purchase. Your items are on the way</p> */}
            <button className="btn btn-info" onClick={() => router.push("/eco2/shops")} style={{width: 200, color: color.white}}> Home </button>
            </div>
        </div>
    )
}