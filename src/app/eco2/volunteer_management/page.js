"use client"
import React from "react";
import NavBar from "../../components/NavBar";
import { color } from "../../components/color";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

export default function VolunteerManagement() {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 850px)",
  });
  return (
    <div>
      <NavBar />
      <h4 style={{ textAlign: "center", marginTop: 30 }}>
        Volunteer Management
      </h4>
      <div
        style={{
          width: isMobile ? "80%" : "50%",
          marginTop: 30,
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          justifyContent: "space-evenly",
        }}
      >
        <button
          className="btn btn-info"
          type="button"
          style={{ color: color.white, width: 100 }}
          onClick={() => router.push("/eco2/volunteer_management/scanner")}
        >
          {" "}
          Scan In
        </button>
        <button
          className="btn btn-info"
          type="button"
          style={{ color: color.white, width: 100 }}
          onClick={() => router.push("/eco2/volunteer_management/scanner")}
        >
          {" "}
          Scan Out
        </button>
      </div>
    </div>
  );
}
