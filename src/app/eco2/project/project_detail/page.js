/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import { baseUrl } from "../../../controller/baseUrl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ManageProjectController } from "../../../controller";
import moment from "moment";
import AppContext from "../../../context/AppContext";
import { color } from "../../../components/color";
import Footer from "../../../components/Footer";

export default function ProjectDetail() {
  const { isMobile, isTablet } = useContext(AppContext);
  const router = useRouter()
  const [projectDetailData, setProjectDetailData] = useState(null);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  useEffect(() => {
    getProjectDetail();
  }, []);

  const getProjectDetail = () => {
    ManageProjectController.getProjectDetail(projectId, (data) => {
      if (data.id) {
        setProjectDetailData(data);
      } else {
        toast.error("Something went wrong! Please contact admin!", {
          position: "top-right",
        });
      }
    });
  };
  return (
    <div>
      <NavBar />
      <div className="row mb-5" style={{marginTop: 60}}>
        <div className="col-11 col-md-5 d-flex justify-content-center justify-content-md-end mx-auto">
          <Image
            alt=""
            // className={styles.image}
            src={baseUrl + projectDetailData?.projectImagePath}
            width={isTablet ? 370 : 450}
            height={isTablet ? 420 : 500}
            //   layout="responsive"
            // onMouseOut={(e) => {
            //   e.target.style.transform = "scale(1)";
            // }}
          />
        </div>

        <div className="col-11 col-md-5 mx-auto d-flex flex-column align-items-center align-items-md-start">
          <div
            style={{
              width: "100%",
            //   height: ,
              padding: 10,
            }}
          >
            <h2 style={{fontSize: isMobile ? 23 : 42}}>{projectDetailData?.projectTitle}</h2>
            <h5 style={{color: color.grey, fontSize: isMobile ? 18 : 35}}>
              Date Published :{" "}
              {moment(projectDetailData?.createdDatetime).format("DD-MM-YYYY")}
            </h5>
            <h5 style={{color: color.grey, fontSize: isMobile ? 18 : 35 }}>Descriptions : </h5>
            <p>{projectDetailData?.projectDescription}</p>

            <div className="d-flex flex-row mt-3">
              <a
                type="button"
                class="btn btn-outline-success"
                style={{ marginRight: 10}}
                // onClick={() => router.push("www.google.com")}
                href={`//${projectDetailData?.joinUrl}`}
              >
                Join this event
              </a>
              <button
                type="button"
                class="btn btn-outline-primary"
                // style={{ color: color.white}}
                onClick={() => {router.push("/eco2/contactus")}}
              >
                More Information
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
