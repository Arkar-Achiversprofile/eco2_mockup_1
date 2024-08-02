"use client"
import React from "react";
import {color} from "../../../components/color";
import { useMediaQuery } from "react-responsive";

export default function ProgramFooter() {
    const isMobile = useMediaQuery({
        query: "(max-width: 500px)",
      });
    return (
        <div style={{width: '100%', height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
            <div className="d-flex flex-row justify-content-evenly" style={{width: isMobile ? "90%" : '30%', marginBottom: 50}}>
                <p style={{fontSize: 16, color: color.white}}>
                    <i className="bi bi-instagram"></i>
                </p>
                <p style={{fontSize: 16, color: color.white}}>
                    <i className="bi bi-facebook"></i>
                </p>
                <p style={{fontSize: 16, color: color.white}}>
                    <i className="bi bi-pinterest"></i>
                </p>
                <p style={{fontSize: 16, color: color.white}}>
                    <i className="bi bi-twitter"></i>
                </p>
                <p style={{fontSize: 16, color: color.white}}>
                    <i className="bi bi-youtube"></i>
                </p>
            </div>
            <p style={{color: color.white, fontSize: 12}}>© 2023 by Shades of Pink. Proudly created with</p>
        </div>
    )
}