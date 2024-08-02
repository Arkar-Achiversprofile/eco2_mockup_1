"use client";
import React, { useState } from "react";
import ProgramNavBar from "../components/ProgramNavBar";
import styles from "../page.module.css";
import { color } from "../../../components/color";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { image } from "../../../assets";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProgramFooter from "../components/ProgramFooter";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 500 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 5,
  },
};

export default function Tours() {
  const [imageArray, setImageArray] = useState([
    { img1: image.educate1, img2: image.educate2 },
    { img1: image.educate3, img2: image.educate4 },
    { img1: image.educate5, img2: image.educate6 },
    { img1: image.educate7, img2: image.educate8 },
    { img1: image.educate9, img2: image.tour1Left },
    {
      img1: image.tour1Middle,
      img2: image.tour1Right,
    },
    { img1: image.tourLeft, img2: image.tourMiddle },
    { img1: image.tourRight, img2: image.tour2Left },
  ]);
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const imageSize = 150;
  return (
    <div className={styles.tourBackground}>
      <div className={styles.tourNavBackground}>
        <ProgramNavBar />
      </div>
      <h1
        style={{
          color: color.yellow,
          textAlign: "center",
          verticalAlign: "bottom",
          marginTop: "100vh",
          fontSize: 100,
        }}
      >
        CARE FARM
      </h1>
      <div style={{ backgroundColor: color.whiteGray, paddingTop: 30 }}>
        <div style={{ width: isMobile ? "80%" : "65%", margin: "0px auto" }}>
          <p
            style={{
              color: color.white,
              fontSize: 25,
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            JOIN US FOR A FUN AND REWARDING JOURNEY OF DISCOVERY AT OUR CARE
            FARM - AND YOU&apos;LL BE DOING GOOD FOR THE COMMUNITY.
          </p>
        </div>
        <div style={{ width: isMobile ? "80%" : "60%", margin: "auto" }}>
          <video
            autoPlay
            muted
            loop
            className={styles.mainVideo}
            style={{ margin: "0px auto" }}
          >
            <source src="/TourVideo.mp4" type="video/mp4" />
          </video>
        </div>

        <div
          className="row imageRow mt-5"
          style={{ backgroundColor: color.ligthGreen }}
        >
          <div className="col-12 col-md">
            <div style={{ width: "100%", height: 650, position: "relative" }}>
              <Image
                alt=""
                src={image.tourLeft}
                fill
                style={{ objectFit: "cover" }}
                sizes="300px"
              />
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                margin: "0px auto",
                textAlign: "center",
                marginTop: 50,
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: 170,
                  position: "relative",
                  margin: "0px auto",
                }}
              >
                <Image
                  alt=""
                  src={image.tourMiddle}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="300px"
                />
              </div>
              <p style={{ color: color.white, fontSize: 25, marginTop: 20 }}>
                ABOUT CARE FARM
              </p>
              <p style={{ color: color.darkGreen, fontSize: 18 }}>
                Community Aquaponics Project @ AMK Industrial Park 2{" "}
              </p>
              <p style={{ color: color.green2, fontSize: 14 }}>
                The Care Farm combines traditional agricultural techniques with
                the latest aquaponics farming methodologies for the benefit of
                low-income residents of Ang Mo Kio GRC. It also brings us closer
                to achieving Singapore&apos;s critically important &quot;30 by
                30&quot; local food production targets.{" "}
              </p>
              <p style={{ color: color.darkPink }}>
                <i>Book a place {">"}</i>
              </p>
            </div>
          </div>
          <div className="col-12 col-md">
            <div style={{ width: "100%", height: 650, position: "relative" }}>
              <Image
                alt=""
                src={image.tourRight}
                fill
                style={{ objectFit: "cover" }}
                sizes="300px"
              />
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 20 }}>
          <div
            style={{ width: "60%", textAlign: "center", margin: "0px auto" }}
          >
            <p style={{ color: color.yellow, fontSize: 30 }}>
              Enjoy an away day at our Care Farm
            </p>
            <p style={{ color: color.white, fontSize: 20 }}>
              Have fun while interacting with our friendly chickens, ducks and
              turtles. Learn about sustainable farming. What&apos;s more, this
              project uses soil-based farming and aquaponics for the benefit of
              low-income residents of Ang Mo Kio GRC. ​
            </p>
            <p style={{ color: color.white, fontSize: 20 }}>
              Come, join us and play a part in this meaningful project.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: color.green2 }}>
          <div className="row">
            <div className="col-11 col-md-4">
              <div
                style={{
                  width: "100%",
                  height: 280,
                  position: "relative",
                  marginLeft: -100,
                }}
              >
                <Image
                  alt=""
                  src={image.tortle}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="300px"
                />
              </div>
            </div>
            <div className="col-11 col-md-6">
              <div
                style={{
                  width: "100%",
                  height: 280,
                  color: color.white,
                  fontSize: 25,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div>Duration: 2 hours per guided tour (max 30 pax)</div>
                <div>Time: 9am to 11am</div>
                <div>Age Group: Children age 3 and above</div>
                <div>Location: AMK Industrial Park 2</div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center pb-5">
          <h1 style={{ color: color.yellow, marginTop: 70 }}>What to expect</h1>
          <div
            style={{
              height: 2,
              width: 30,
              marginTop: 30,
              backgroundColor: color.black,
            }}
          />
          <div className="row col-10 d-flex justify-content-evenly pb-5 mt-5">
            <div
              className="col-12 col-md-3"
              style={{
                // height: 1000,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ width: 250, height: 250, position: "relative" }}>
                <Image
                  alt=""
                  src={image.tour1Left}
                  fill
                  style={{ objectFit: "cover", borderRadius: 150 }}
                  sizes="250px"
                />
              </div>
              <p
                style={{
                  color: color.yellow,
                  textAlign: "center",
                  marginTop: 30,
                  fontSize: 25,
                }}
              >
                Learn about urban farming
              </p>

              <ul>
                <li
                  style={{
                    //   textAlign: "center",
                    color: color.white,
                    fontSize: 12,
                  }}
                >
                  Covers both traditional and modern sustainable aquaponic
                  farming techniques.
                </li>
              </ul>
            </div>
            <div
              className="col-12 col-md-3"
              style={{
                // height: 1000,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ width: 250, height: 250, position: "relative" }}>
                <Image
                  alt=""
                  src={image.tour1Middle}
                  fill
                  style={{ objectFit: "cover", borderRadius: 150 }}
                  sizes="250px"
                />
              </div>
              <p
                style={{
                  color: color.yellow,
                  textAlign: "center",
                  marginTop: 30,
                  fontSize: 25,
                }}
              >
                Help us feed our fish in the farm
              </p>

              <ul>
                <li
                  style={{
                    //   textAlign: "center",
                    color: color.white,
                    fontSize: 12,
                  }}
                >
                  Learn about hi-tech fish farming and the symbiotic
                  relationship between aquaculture and hydroponics.
                </li>
              </ul>
            </div>
            <div
              className="col-12 col-md-3"
              style={{
                // height: 1000,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ width: 250, height: 250, position: "relative" }}>
                <Image
                  alt=""
                  src={image.tour1Right}
                  fill
                  style={{ objectFit: "cover", borderRadius: 150 }}
                  sizes="250px"
                />
              </div>
              <p
                style={{
                  color: color.yellow,
                  textAlign: "center",
                  marginTop: 30,
                  fontSize: 25,
                }}
              >
                Interact with our farm animal
              </p>

              <ul>
                <li
                  style={{
                    //   textAlign: "center",
                    color: color.white,
                    fontSize: 12,
                  }}
                >
                  Feed our free-roaming chickens and ducks
                </li>
                <li
                  style={{
                    //   textAlign: "center",
                    color: color.white,
                    fontSize: 12,
                  }}
                >
                  Meet Tommy the Tortoise and Francis the Goose
                </li>
              </ul>
            </div>
          </div>
          <button className="btn btn-outline-secondary">Join Tour {">"}</button>
        </div>

        <div className={styles.tourBackground1}>
          <div style={{ fontSize: 80, fontWeight: "bold" }}>HELLO.</div>
          <div style={{ fontSize: 50 }}>I can turn trash into treasure!</div>
        </div>

        <div
          style={{
            width: isMobile ? "80%" : "60%",
            margin: "auto",
            paddingTop: 50,
            paddingBottom: 30,
          }}
        >
          <video
            autoPlay
            muted
            loop
            className={styles.mainVideo}
            style={{ margin: "0px auto" }}
          >
            <source src="/TourVideo1.mp4" type="video/mp4" />
          </video>
          <div
            style={{
              fontSize: 40,
              fontWeight: "500",
              color: color.white,
              textAlign: "center",
            }}
          >
            Join The Sustainability Tour !
          </div>
        </div>

        <div
          className="row imageRow mt-5"
          style={{ backgroundColor: color.lightGrey }}
        >
          <div className="col-12 col-md">
            <div style={{ width: "100%", height: 650, position: "relative" }}>
              <Image
                alt=""
                src={image.tour2Left}
                fill
                style={{ objectFit: "cover" }}
                sizes="300px"
              />
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div
              style={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                margin: "0px auto",
                textAlign: "center",
                marginTop: 50,
              }}
            >
              <h1 style={{ color: color.red, fontSize: 50, marginTop: 20 }}>
                MEET THE SUPER BUG!
              </h1>
              <p style={{ color: color.green2, fontSize: 14 }}>
                Now&apos;s the time to visit our Sustainability @Tampines Park
                facility. You&apos;ll discover the innovative ways our food
                waste problems can be solved and see how the Black Soldier Fly
                (BSF) uses its magic to turn trash into treasure.
              </p>
              <p style={{ color: color.green2, fontSize: 14 }}>
                You&apos;ll also learn about the importance of various stages of
                the Black Solder Fly&apos;s life cycle, and how it can play an
                important role in creating a more sustainable future for all.
              </p>
              <p style={{ color: color.green2, fontSize: 14 }}>
                In addition, you can visit our community farm, help fertilise
                plants with frass (BSF excrement) and, finally, feed fish and
                our cute chickens with Black Soldier Fly larvae.
              </p>
              <p style={{ color: color.darkPink }}>
                <i>Book a place {">"}</i>
              </p>
            </div>
          </div>
          <div className="col-12 col-md">
            <div style={{ width: "100%", height: 650, position: "relative" }}>
              <Image
                alt=""
                src={image.tour2Right}
                fill
                style={{ objectFit: "cover" }}
                sizes="300px"
              />
            </div>
          </div>
        </div>

        <div style={{ width: "90%", margin: "10px auto", paddingBottom: 20 }}>
          <Carousel swipeable infinite responsive={responsive}>
            {imageArray.map((v, i) => (
              <div
                key={i}
                style={{
                  width: 160,
                  height: 315,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: imageSize,
                    height: imageSize,
                    position: "relative",
                  }}
                >
                  <Image
                    alt=""
                    src={v.img1}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100px"
                  />
                </div>
                <div
                  style={{
                    width: imageSize,
                    height: imageSize,
                    position: "relative",
                  }}
                >
                  <Image
                    alt=""
                    src={v.img2}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100px"
                  />
                </div>
              </div>
            ))}
          </Carousel>
          <div
            style={{
              width: isMobile ? "90%" : "60%",
              margin: "0px auto",
              color: color.white,
              fontSize: 25,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: color.white,
                marginTop: 10,
              }}
            />
            <div style={{ marginTop: 10 }}>
              Visit the Black Soldier Fly facility.
            </div>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: color.white,
                marginTop: 10,
              }}
            />
            <div style={{ marginTop: 10 }}>Visit our community farm.</div>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: color.white,
                marginTop: 10,
              }}
            />
            <div style={{ marginTop: 10 }}>Feed our Tilapia fish.</div>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: color.white,
                marginTop: 10,
              }}
            />
            <div style={{ marginTop: 10 }}>Feed our cute chickens.</div>
          </div>
        </div>

        <div className={styles.tourBackground2}>
            <div style={{width: isMobile ? "90%" : '60%', textAlign: 'center', color: color.white}}>
          <div style={{ fontSize: 80, fontWeight: "900" }}>
            Little Adventure Maker
          </div>
          <div style={{ fontSize: 45 }}>
            For curious and confident future leaders
          </div>
          </div>
        </div>

        <div
          style={{
            width: isMobile ? "80%" : "60%",
            margin: "auto",
            paddingTop: 50,
            paddingBottom: 30,
          }}
        >
          <video
            autoPlay
            muted
            loop
            className={styles.mainVideo}
            style={{ margin: "0px auto" }}
          >
            <source src="/TourVideo2.mp4" type="video/mp4" />
          </video>
        </div>

        <div
          className="row imageRow mt-5"
          style={{ backgroundColor: color.lightGrey }}
        >
          <div className="col-12 col-md">
            <div style={{ width: "100%", height: 650, position: "relative" }}>
              <Image
                alt=""
                src={image.tour3Right}
                fill
                style={{ objectFit: "cover" }}
                sizes="300px"
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                margin: "0px auto",
                // textAlign: "center",
                marginTop: 50,
              }}
            >
              <h1 style={{ color: color.red, fontSize: 40, marginTop: 20 }}>
                Singa-Tribe
              </h1>
              <div style={{ color: color.green2, fontSize: 14, marginTop: 10 }}>
              Designed for children age 5 and above, as well as the family, young adventurers become resilient, competent and eco-conscious changemakers of outstanding character.
              </div>
              <div style={{color: color.darkGreen, marginTop: 30, fontSize: 18}}>5 hours of pure adventure!</div>
              <div style={{ color: color.darkGreen, fontSize: 14 }}>
              - Start your adventure by decorating your own hiking stick.
              </div>
              <div style={{ color: color.darkGreen, fontSize: 14 }}>
              - Journey through our nature trail and meet our friendly animals.
              </div>
              <div style={{ color: color.darkGreen, fontSize: 14 }}>
              - Cross the stream and discover interesting organisms.
              </div>
              <div style={{ color: color.darkGreen, fontSize: 14 }}>
              - Catch your fish using insect bait.
              </div>
              <div style={{ color: color.darkGreen, fontSize: 14 }}>
              - Be rewarded with some smores!
              </div>
              <button className="btn btn-outline-secondary" style={{width: 200, marginTop: 30}}>Book Now {">"}</button>
            </div>
          </div>
          <div className="col-12 col-md">
            <div style={{ width: "100%", height: 650, position: "relative" }}>
              <Image
                alt=""
                src={image.tour3Left}
                fill
                style={{ objectFit: "cover" }}
                sizes="300px"
              />
            </div>
          </div>
        </div>
        <ProgramFooter/>
      </div>
    </div>
  );
}
