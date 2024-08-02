'use client'
import React from "react";
import styles from "./page.module.css";
import ProgramNavBar from "./components/ProgramNavBar";
import ProgramFooter from "./components/ProgramFooter";
import { color } from "../../components/color";
import Image from "next/image";
import { image } from "../../assets";
import { useMediaQuery } from "react-responsive";

export default function Program() {
    const isMobile = useMediaQuery({
        query: "(max-width: 500px)",
      });
      const isTablet = useMediaQuery({
        query: "(min-width: 500px) and (max-width: 850px)",
      });
  return (
    <div>
      <div className={styles.background}>
        <ProgramNavBar />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <div
            style={{
              width: isMobile ? '90%' : isTablet ? '70%' : "60%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <video
              autoPlay
              muted
              loop
              className={styles.mainVideo}
              style={{ margin: "0px auto" }}
            >
              <source src="/ProgramVideo.mp4" type="video/mp4" />
            </video>
            <p
              style={{
                fontSize: isMobile ? 40 : isTablet ? 50 : 55,
                marginTop: 30,
                marginBottom: 20,
                color: color.white,
                fontWeight: 'bolder',
                fontFamily: 'serif'
              }}
            >
              The architect for sustainability{" "}
            </p>
            <p style={{ textAlign: "center", color: color.gold }}>
              Otolith is social enterprise that advocates for circular
              ecosystems and sustainability. We are active in the areas of
              aquaculture, agriculture and environmental science. We are
              committed to facilitating the building of infrastructure to bring
              to fruition our vision for a better, cleaner world. We believe in
              the importance going beyond just imparting knowledge and
              technological skills; we are committed enabling others to become
              active participants in the green movement.
            </p>
          </div>
          <div className="row col-12 d-flex justify-content-evenly pb-5 mt-5">
            <div
              className="col-12 col-md-3"
              style={{
                // height: 1000,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", height: 400, position: "relative" }}>
                <Image
                  alt=""
                  src={image.programLeft}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="300px"
                />
              </div>
              <h3
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: color.pink,
                  textAlign: "center",
                  marginTop: 30,
                }}
              >
                Sustainability Projects
              </h3>
              <h6
                style={{
                  textAlign: "center",
                  color: color.white,
                  marginTop: 50,
                }}
              >
                COMMUNITY AQUAPONICS FARM AMK Industrial Park 2 Community Farm
              </h6>
              <p
                style={{
                  textAlign: "center",
                  color: color.white,
                  fontSize: 12,
                }}
              >
                Where volunteers come together to farm for the benefit of
                low-income families.
              </p>
              <h6
                style={{
                  textAlign: "center",
                  color: color.white,
                  marginTop: 30,
                }}
              >
                BLACK SOLDIER FLY FACILITY Sustainability @ Tampines Park
              </h6>
              <p
                style={{
                  textAlign: "center",
                  color: color.white,
                  fontSize: 12,
                }}
              >
                Turn food waste into treasure. Give your food waste to us and
                get rewarded with &quot;Green Currency&quot;.​
              </p>
            </div>
            <div
              className="col-12 col-md-3"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", height: 400, position: "relative" }}>
                <Image
                  alt=""
                  src={image.programMiddle}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="300px"
                />
              </div>
              <h3
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: color.pink,
                  textAlign: "center",
                  marginTop: 30,
                }}
              >
                Educational Workshops/ Programs
              </h3>
              <h6
                style={{
                  textAlign: "center",
                  color: color.white,
                  marginTop: 50,
                }}
              >
                MODERN FARMING TECHNOLOGY
              </h6>
              <p
                style={{
                  textAlign: "center",
                  color: color.white,
                  fontSize: 12,
                }}
              >
                Learn about high-tech sustainable farming and its role in
                ensuring food security in Singapore
              </p>
              <h6
                style={{
                  textAlign: "center",
                  color: color.white,
                  marginTop: 30,
                }}
              >
                FOOD WASTE MANAGEMENT
              </h6>
              <p
                style={{
                  textAlign: "center",
                  color: color.white,
                  fontSize: 12,
                }}
              >
                Close the loop through little critters, known as Black Soldier
                Fly and learn how it can contribute to circularity in urban
                farming,
              </p>
              <h6
                style={{
                  textAlign: "center",
                  color: color.white,
                  marginTop: 30,
                }}
              >
                LEARNING JOURNEY
              </h6>
              <p
                style={{
                  textAlign: "center",
                  color: color.white,
                  fontSize: 12,
                }}
              >
                Experience and learn about our Sustainable project through a
                guided tour - physically or virtually
              </p>
            </div>
            <div
              className="col-12 col-md-3"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", height: 400, position: "relative" }}>
                <Image
                  alt=""
                  src={image.programRight}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="300px"
                />
              </div>
              <h3
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: color.pink,
                  textAlign: "center",
                  marginTop: 30,
                }}
              >
                Farm Tours & Public Programs
              </h3>
              <h6
                style={{
                  textAlign: "center",
                  color: color.white,
                  marginTop: 50,
                }}
              >
                CARE FARM TOUR
              </h6>
              <p
                style={{
                  textAlign: "center",
                  color: color.white,
                  fontSize: 12,
                }}
              >
                Come for a fun day out and do good for the community by planting
                and harvesting at our Aquaponic farm. All produce are donated to
                the underprivileged group
              </p>
              <h6
                style={{
                  textAlign: "center",
                  color: color.white,
                  marginTop: 30,
                }}
              >
                BLACK SOLDIER FLIES ECO FARM TOUR
              </h6>
              <p
                style={{
                  textAlign: "center",
                  color: color.white,
                  fontSize: 12,
                }}
              >
                Visit Singapore &apos;s first community-based circular ecosystem
                for sustainable food production. Witness, first hand, the magic
                of the Black Soldier Fly.
              </p>
              <h6
                style={{
                  textAlign: "center",
                  color: color.white,
                  marginTop: 30,
                }}
              >
                LITTLE ADVENTURE MAKER
              </h6>
              <p
                style={{
                  textAlign: "center",
                  color: color.white,
                  fontSize: 12,
                  fontWeight: "bold",
                  marginTop: -10,
                }}
              >
                Singa Tribe Camp
              </p>
              <p
                style={{
                  textAlign: "center",
                  color: color.white,
                  fontSize: 12,
                  marginTop: -20,
                }}
              >
                Enjoy five hours of pure outdoor fun and learning while you trek
                through the forest, cross a stream, catch your own fish and
                setup your own fire for marshmallow toasting! It&apos;s perfect
                for the whole family!
              </p>
            </div>
          </div>

          <div className={styles.background1}>
            <div style={{ width: isMobile ? "100%" : isTablet ? "70%" : '60%', margin: '120px auto', textAlign: 'center'}}>
            <div style={{ width: isMobile ? '100' : isTablet ? '70%' : "60%", height: isMobile ? 40 : 100, position: "relative", margin: '0px auto' }}>
                <Image
                  alt=""
                  src={image.programText}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="100%"
                />
              </div>
              {/* <h1 style={{color: color.white, fontFamily: 'seriff', fontSize: 50}}>ECO <span style={{color: color.green1}}>2</span> BALANCE</h1> */}
              <p style={{ fontWeight: "bold", fontSize: 18, color: color.white }}>
                Earn Green Currency by participating in our projects to purchase
                items from our Eco²Balance Shop
              </p>
              <button className="btn btn-light">Shop Now</button>
            </div>
          </div>

          <ProgramFooter/>
        </div>
      </div>
    </div>
  );
}
