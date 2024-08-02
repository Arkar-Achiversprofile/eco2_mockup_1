import React from "react";
import ProgramNavBar from "../components/ProgramNavBar";
import ProgramFooter from "../components/ProgramFooter";
import { color } from "../../../components/color";
import Image from "next/image";
import { image } from "../../../assets";

export default function About() {
  // const isMobile = useMediaQueryy({
  //     query: "(max-width: 500px)",
  //   });
  return (
    <div style={{ backgroundColor: color.darkPink }}>
      <ProgramNavBar />
      <div style={{ width: "100vw" }}>
        <div
          className="col-11 col-md-6"
          style={{
            textAlign: "center",
            margin: "50px auto",
            color: color.white,
          }}
        >
          <p style={{ fontSize: 35 }}>About Us</p>
          <p style={{color: color.pink}}>
            Otolith is a social enterprise that advocates for circular
            ecosystems and sustainability, and we are committed to enabling
            others to become advocates too. We are active in food recycling and
            are involved in aquaculture, agriculture and environmental science.
            We believe in the importance of going beyond just imparting
            knowledge; helping others increase their confidence, enhance their
            cognitive skills, and engage in meta-learning are key priorities. We
            also conduct educational programmes for schools and work to raise
            public awareness of environmental and food security issues.
          </p>
        </div>
        <div className="row imageRow bg-white">
          <div className="col-12 col-md-6">
            <div style={{ width: "100%", height: 500, position: "relative" }}>
              <Image
                alt=""
                src={image.educate9}
                fill
                style={{ objectFit: "cover" }}
                sizes="300px"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div
              style={{
                width: "50%",
                height: 500,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <h1 style={{fontFamily: 'san-serif'}}>Mission</h1>
              <p style={{ textAlign: "center", color: color.darkGreen }}>
                To nurture the heart and mind of every individual, helping them
                find new balance in life.
              </p>
            </div>
          </div>
        </div>
        <div className="row imageRow bg-white">
          <div className="col-12 col-md-6">
            <div
              style={{
                width: "50%",
                height: 500,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <h1 style={{fontFamily: 'san-serif'}}>Vision</h1>
              <p style={{ textAlign: "center", color: color.grey }}>
                To be a leading advocate for circular ecosystems, a reduced
                carbon footprint and enhanced food security. This is done by
                empowering individuals and organisations to advance the cause of
                sustainability, environmental ethics and social responsibility,
                as well as by providing the necessary “hardware” (essential
                applied technology), “software” (educational and training
                programmes), and “heartware” through volunteerism and community
                projects
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div style={{ width: "100%", height: 500, position: "relative" }}>
              <Image
                alt=""
                src={image.educate2}
                fill
                style={{ objectFit: "cover" }}
                sizes="300px"
              />
            </div>
          </div>
        </div>
      </div>

      <ProgramFooter />
    </div>
  );
}
