"use client";
import React, { useEffect } from "react";
import ProgramNavBar from "../components/ProgramNavBar";
import styles from "../page.module.css";
import { color } from "../../../components/color";
import Image from "next/image";
import { image } from "../../../assets";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useMediaQuery } from "react-responsive";
import ProgramFooter from "../components/ProgramFooter";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 500 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 2,
  },
};

export default function EducationalProgrammes() {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 500px) and (max-width: 850px)",
  });
  // console.log("size", isMobile, isTablet);
  const imageSize = isMobile ? 120 : 200;
  useEffect(() => {}, [isMobile, isTablet]);
  return (
    <div style={{ width: "100%" }}>
      <div className={styles.eduAndContactNavBackground}>
        <ProgramNavBar />
        <p
          style={{
            textAlign: "center",
            color: color.white,
            fontSize: isMobile? 18 : 50,
            marginTop: isMobile ? 30 : -10,
          }}
        >
          Toward a more sustainable Singapore
        </p>
      </div>

      <div style={{ width: "100%", height: 420, position: "relative" }}>
        <Image
          alt=""
          src={image.educate1}
          fill
          style={{ objectFit: "cover" }}
          sizes="300px"
        />
      </div>

      <div style={{ backgroundColor: color.green2, padding: "50px 0px" }}>
        <div
          className="col-12 col-md-8"
          style={{ margin: "0px auto", textAlign: "center" }}
        >
          <p style={{ fontSize: isMobile ? 18 : 24, color: color.white }}>
            Students learn about circular agriculture from the industry experts.
          </p>
          <p style={{ marginTop: -13, fontSize: isMobile ? 18 : 24, color: color.white }}>
            With this comprehensive programme, system rental and maintenance
            costs are provided so that teachers can focus on inspiring and
            imparting knowledge to students.
          </p>
        </div>
      </div>

      <div className="row imageRow">
        <div className="col-12 col-md-7">
          <div style={{ width: "100%", height: 800, position: "relative" }}>
            <Image
              alt=""
              src={image.educate2}
              fill
              style={{ objectFit: "cover" }}
              sizes="300px"
            />
          </div>
        </div>
        <div
          className="col-12 col-md-5"
          style={{ backgroundColor: color.ligthGreen  }}
        >
          <div
            style={{
              width: isMobile ? "80%" : "60%",
              margin: "0px auto",
              color: color.darkGreen,
            }}
          >
            <p
              style={{
                fontSize: 40,
                textAlign: "center",
                marginTop: 60,
                fontWeight: "bolder",
              }}
            >
              Hydroponics Programmes
            </p>
            <p style={{ marginTop: 50, fontSize: 14 }}>
              From theory lessons to field experience on high-tech sustainable
              farming, learn about the science of aquaculture and agriculture,
              as well as geographical concepts. Students engage in hands-on
              farming activities so they can grow their own produce and even
              formulate potential solutions for resolving the global food supply
              crisis through application of their newfound knowledge. In the
              final session, a Young Farmers&apos; Market will be organised for
              students to sell their organic produce to fellow schoolmates,
              faculty and school vendors.
            </p>
            <p style={{ marginTop: 50, fontSize: 14 }}>Topics Covered :</p>
            <p style={{ fontSize: 14 }}>
              Nutrient cycle, water and soil quality measurements, recirculating
              aquaculture system, hydroponic and aquaponic systems, fish
              husbandry, disease management, feeding management, basic
              fish/shrimp physiology and anatomy, nutrition, post-harvest
              practices, basic Mendelian genetics, Punnett Square predictions
              and, lastly, recording and comparison of data.
            </p>
          </div>
        </div>
      </div>

      <div className="row imageRow">
        <div className="col-12 col-md-7">
          <div style={{ width: "100%", height: 600, position: "relative" }}>
            <Image
              alt=""
              src={image.educate3}
              fill
              style={{ objectFit: "cover" }}
              sizes="300px"
            />
          </div>
        </div>
        <div
          className="col-12 col-md-5"
          style={{ backgroundColor: color.ligthGreen }}
        >
          <div style={{ width: isMobile ? "80%" : "60%", margin: "0px auto" }}>
            <p
              style={{
                fontSize: 40,
                textAlign: "center",
                marginTop: 60,
                fontWeight: "bolder",
                color: color.darkGreen,
              }}
            >
              Sustainability Programmes
            </p>
            <p style={{ marginTop: 20, fontSize: 16 }}>
              WITNESS THE MAGIC OF THE BLACK SOLDIER FLY
            </p>
            <p style={{ fontSize: 14 }}>
              In our Black Soldier Fly (BSF) facility, programme participants
              learn how food waste can be turned into nutrients, which can then
              be used in vegetable and fish farming. BSF larvae and frass
              (&quot;poop&quot;) are tiny, but they represent a giant step
              forward in food circularity and in meeting Singapore&apos;s goal
              of supplying 30% of our nutritional needs by 2030.
            </p>
          </div>
        </div>
      </div>

      <div className="row imageRow">
        <div className="col-12 col-md-7">
          <div style={{ width: "100%", height: 600, position: "relative" }}>
            <Image
              alt=""
              src={image.educate4}
              fill
              style={{ objectFit: "cover" }}
              sizes="300px"
            />
          </div>
        </div>
        <div
          className="col-12 col-md-5"
          style={{ backgroundColor: color.ligthGreen }}
        >
          <div style={{ width: isMobile ? "80%" : "60%", margin: "0px auto" }}>
            <p
              style={{
                fontSize: 35,
                // textAlign: "center",
                marginTop: 100,
                fontWeight: "bolder",
                color: color.darkGreen,
              }}
            >
              Learning Journey at Our Farms
            </p>
            <p style={{ marginTop: 20, fontSize: 14 }}>
              Our Eco and Care Farms showcase what can be done when
              environmentally-friendly food production systems combining
              aquaculture, hydroponics, microgreens and permaculture are put
              into practice.
            </p>
            <p style={{ marginTop: 20, fontSize: 14 }}>
              They are also good case studies of how community involvement can
              play in critical role in the success of such facilities.
            </p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: color.pink, padding: "100px 0px" }}>
        <div
          className="row justify-content-md-center"
          style={{ color: color.white }}
        >
          <div className="col-12 col-md-3" style={{ textAlign: "center" }}>
            <i style={{ fontSize: 18, fontWeight: "bold" }}>Character</i>
            <p>
              Character building through hands-on teamwork in sustainable
              farming practices
            </p>
          </div>
          <div className="col-12 col-md-3" style={{ textAlign: "center" }}>
            <i style={{ fontSize: 18, fontWeight: "bold" }}>Meta-learning</i>
            <p>Become a more efficient learner through games and role-play.</p>
          </div>
          <div className="col-12 col-md-3" style={{ textAlign: "center" }}>
            <i style={{ fontSize: 18, fontWeight: "bold" }}>Cognitive Skills</i>
            <p>
              Active learning through data gathering, analysis and evaluation.
            </p>
          </div>
        </div>

        <div style={{ width: "70%", margin: "0px auto" }}>
          <Carousel swipeable infinite responsive={responsive}>
            <div
              style={{
                width: imageSize,
                height: imageSize,
                position: "relative",
              }}
            >
              <Image
                alt=""
                src={image.educate3}
                fill
                style={{ objectFit: "cover", borderRadius: 100 }}
                sizes="300px"
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
                src={image.educate4}
                fill
                style={{ objectFit: "cover", borderRadius: 100 }}
                sizes="300px"
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
                src={image.educate5}
                fill
                style={{ objectFit: "cover", borderRadius: 100 }}
                sizes="300px"
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
                src={image.educate6}
                fill
                style={{ objectFit: "cover", borderRadius: 100 }}
                sizes="300px"
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
                src={image.educate7}
                fill
                style={{ objectFit: "cover", borderRadius: 100 }}
                sizes="300px"
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
                src={image.educate8}
                fill
                style={{ objectFit: "cover", borderRadius: 100 }}
                sizes="300px"
              />
            </div>
          </Carousel>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: color.whiteGray,
          paddingTop: 100
        }}
      >
        <div
          className={styles.eduBackground1}
        >
          <p style={{ fontSize: 50, fontWeight: "bold", color: color.white }}>
            VISIT OUR FARM
          </p>
          <p style={{ fontSize: 25, fontWeight: "bold", color: color.white }}>
            Enjoy a fun leaning journey and meet our cute farm animals.
          </p>
        </div>
        <ProgramFooter/>
      </div>
    </div>
  );
}
