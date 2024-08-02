import React from "react";
import ProgramNavBar from "../components/ProgramNavBar";
import styles from "../page.module.css";
import { color } from "../../../components/color";
import Image from "next/image";
import { image } from "../../../assets";
import ProgramFooter from "../components/ProgramFooter";

export default function Contact() {
  return (
    <div style={{backgroundColor: color.whiteGray, }}>
      <div className={styles.eduAndContactNavBackground} style={{zIndex: 2}}>
        <ProgramNavBar />
      </div>
      {/* <div style={{ zIndex: 1, padding: 100 }}> */}
        <div
            className="row col-11 col-md-9 imageRow"
          style={{
            backgroundColor: color.pink,
            margin: "0px auto",
            marginTop: -60,
            zIndex: 3
          }}
        >
          <div className="col-12 col-md-6" style={{backgroundColor: color.whiteGray}}>
            <div
              style={{
                width: "100%",
                height: 600,
                position: "relative",
                backgroundColor: color.white,
              }}
            >
              <Image
                alt=""
                src={image.contact}
                fill
                style={{ objectFit: "cover" }}
                // sizes="300px"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: color.pink,
                padding: "100px 30px",
              }}
            >
              <p
                style={{
                  color: color.darkGreen,
                  fontSize: 26,
                  fontWeight: "300",
                }}
              >
                STAY IN TOUCH
              </p>
              <div
                style={{
                  height: 2,
                  width: 100,
                  backgroundColor: color.darkGreen,
                }}
              />
              <div class="row mt-5">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    aria-label="Name"
                    style={{
                      backgroundColor: color.pink,
                      borderWidth: "0px 0px 0px 0px",
                      borderBottomColor: color.darkGreen,
                      color: color.darkGreen,
                      fontSize: 14,
                    }}
                  />
                  <div style={{height: 1, backgroundColor: color.darkGreen}}/>
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    style={{
                      backgroundColor: color.pink,
                      borderWidth: "0px 0px 0px 0px",
                      borderBottomColor: color.darkGreen,
                      color: color.darkGreen,
                      fontSize: 14,
                    }}
                  />
                  <div style={{height: 1, backgroundColor: color.darkGreen}}/>
                </div>
              </div>
              <div style={{width: '100%'}}>
              <input
                type="text"
                class="form-control"
                placeholder="Subject"
                aria-label="Subject"
                style={{
                  backgroundColor: color.pink,
                  borderWidth: "0px 0px 0px 0px",
                  borderBottomColor: color.darkGreen,
                  color: color.darkGreen,
                  fontSize: 14,
                  marginTop: 15,
                }}
              />
              <div style={{height: 1, backgroundColor: color.darkGreen}}/>
              </div>
              <div style={{width: '100%'}}>
                <textarea
                rows={5}
                draggable={false}
                type="text"
                class="form-control"
                placeholder="Type your message here"
                aria-label="Subject"
                style={{
                  backgroundColor: color.pink,
                  borderWidth: "0px 0px 0px 0px",
                  borderBottomColor: color.darkGreen,
                  color: color.darkGreen,
                  fontSize: 14,
                  marginTop: 15,
                }}
                />
                <div style={{height: 1, backgroundColor: color.darkGreen}}/>
              </div>
              <div style={{color: color.darkGreen, cursor: 'pointer', marginTop: 20}}>
                Submit
              </div>
            </div>
          </div>
        </div>
        <ProgramFooter />
      {/* </div> */}
    </div>
  );
}
