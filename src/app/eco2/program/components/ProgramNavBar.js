"use client"
import Image from "next/image";
import React from "react";
import { image } from "../../../assets";
import { color } from "../../../components/color";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

export default function ProgramNavBar() {
  const isMobile = useMediaQuery({
    query: "(min-width: 500px) and (max-width: 800px)",
  });
  const tabColor = { color: color.pink, cursor: "pointer" }
  const router = useRouter();
  return (
    <nav class="navbar navbar-expand-lg" style={{height: 100}}>
      <div class="container-fluid" style={{marginLeft: isMobile ? "5%" :"15%"}}>
        <a class="navbar-brand" href="#">
          
          <div style={{ width: isMobile ? 150 : 200, height: isMobile ? 40 : 50, position: "relative"}}>
        <Image
          alt=""
          src={image.logo}
          fill
          style={{ objectFit: "cover" }}
          sizes="300px"
        />
      </div>
          
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav" style={{fontSize: 14, color: color.pink}}>
            <li class="nav-item">
              <div class="nav-link" aria-current="page" onClick={() => router.push("/eco2/program")} style={tabColor}>
                PROGRAM
              </div>
            </li>
            <li class="nav-item">
              <div class="nav-link" onClick={() => router.push("/eco2/program/our_projects")} style={tabColor}>
                OUR PROJECTS
              </div>
            </li>
            <li class="nav-item">
              <div class="nav-link" onClick={() => router.push("/eco2/program/educational_programmes")} style={tabColor}>
                EDUCATIONAL PROGRAMMES
              </div>
            </li>
            <li class="nav-item">
              <div class="nav-link" onClick={() => router.push("/eco2/program/tours")} style={tabColor}>TOURS</div>
            </li>
            <li class="nav-item">
              <div class="nav-link" onClick={() => router.push("/eco2/program/contact")} style={tabColor}>CONTACT</div>
            </li>
            <li class="nav-item">
              <div class="nav-link" onClick={() => router.push("/eco2/program/about")} style={tabColor}>ABOUT</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
