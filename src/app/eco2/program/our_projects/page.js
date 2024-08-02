"use client"
import React from "react";
import ProgramNavBar from "../components/ProgramNavBar";
import styles from "../page.module.css";
import { color } from "../../../components/color";
import Image from "next/image";
import { image } from "../../../assets";
import ProgramFooter from "../components/ProgramFooter";
import { useMediaQuery } from "react-responsive";

export default function OurProject() {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 500px) and (max-width: 850px)",
  });
  return (
    <div className={styles.background}>
      <ProgramNavBar />
      <div className="row col-12 mt-5 mb-5">
        <div className="col-12 col-md-5">
          <div
            style={{
              width: "80%",
              height: 250,
              marginLeft: "10%",
            }}
          >
            <p
              style={{
                color: color.pink,
                fontFamily: "san-serif",
                // marginTop: 10,
                fontSize: isMobile ? 45 : 60,
                fontWeight: 'bold',
              }}
            >
              Our Projects
            </p>
            <p style={{ color: color.white, fontSize: 14, lineHeight: isMobile ? 'normal' : 2.5 }}>
              Everything we do is based on our commitment to empower people to
              become advocates for sustainability. Our facilities in Tampines
              and Ang Mo Kio, with more on the way, show how such projects can
              further this goal by involving, educating and inspiring.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div
            style={{
              width: "90%",
              marginLeft: isMobile ? '10%' : 0
            }}
          >
            <h2 style={{ color: color.white }}>BLACK SOLDIER FLY FACILITY</h2>
            <p style={{ color: color.pink }}>
              at Sustainability @ Tampines Park
            </p>
            <p style={{ color: color.white, fontSize: 14, lineHeight: 2.5 }}>
              Otolith&apos;s Black Soldier Fly (BSF) facility is
              Singapore&apos;s first community-based circular ecosystem for
              sustainable food production. At our BSF facility, food waste is
              turned into fertiliser for vegetables and food for aquatic
              animals. Volunteers who contribute their food waste earn Green
              Currency, which can be redeemed for produce from the facility.
            </p>
            <div
              style={{
                width: "100%",
                height: 400,
                position: "relative",
                marginTop: 50,
              }}
            >
              <Image
                alt=""
                src={image.ourProject}
                fill
                style={{ objectFit: "cover" }}
                sizes="100%"
              />
            </div>
          </div>
          <div
            style={{
              width: "90%",
              marginTop: 150,
              marginLeft: isMobile ? '10%' : 0
            }}
          >
            <h3 style={{ color: color.white }}>COMMUNITY AQUAPONIC PROJECT</h3>
            <p style={{ color: color.pink }}>At AMK Industrial park 2</p>
            <p style={{ color: color.white, fontSize: 14, lineHeight: 2.5 }}>
              COMMUNITY AQUAPONIC PROJECT At AMK Industrial park 2 This facility
              utilises advanced agricultural techniques combined with the latest
              aquaponic farming methodologies to benefit low-income residents of
              Ang Mo Kio GRC. It also brings us closer to achieving
              Singapore&apos;s critically important &quot;30 by 30&quot; local
              food production targets.
            </p>
            <div
              style={{
                width: "100%",
                height: 400,
                position: "relative",
                marginTop: 50,
              }}
            >
              <Image
                alt=""
                src={image.programLeft}
                fill
                style={{ objectFit: "cover" }}
                sizes="100%"
              />
            </div>
          </div>
        </div>
      </div>
      <ProgramFooter/>
    </div>
  );
}
