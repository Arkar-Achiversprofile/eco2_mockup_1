'use client'
import { useRouter } from "next/navigation";
import React from "react";
import ShopNavBar from "../../../components/ShopNavBar";
import { color } from "../../../components/color";

export default function OrderSuccess() {
    const router = useRouter();

    return (
        <div>
            <ShopNavBar name="Order Complete"/>
            <div className="d-flex flex-column justifu-content-center align-items-center mt-5">
            <i className="bi bi-check-circle" style={{fontSize: 70, color: color.skyBlue}}></i>
            <p style={{color: color.skyBlue, fontSize: 20}}>Congratulations!</p>
            <p>Your order has been accepted</p>
            <p style={{fontSize: 10, color: color.grey}}>Thank you for your purchase. Your items are on the way</p>
            <button className="btn btn-info" onClick={() => router.push("/eco2/shops")} style={{width: 200, color: color.white}}> Home </button>
            </div>
        </div>
    )
}