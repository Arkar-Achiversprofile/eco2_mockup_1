"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../../components/NavBar";
import { ManageProjectController } from "../../controller";
import Image from "next/image";
import { image } from "../../assets";
import Pagination from "../../components/Pagination";
import { baseUrl } from "../../controller/baseUrl";
import AppContext from "../../context/AppContext";
import Footer from "../../components/Footer";
import moment from "moment";
import { color } from "../../components/color";
import { useRouter } from "next/navigation";

export default function Project() {
  const { isMobile, isTablet } = useContext(AppContext);
  const router = useRouter();
  const [allProjects, setAllProjects] = useState([]);
  const [allProjectsTemp, setAllProjectsTemp] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  useEffect(() => {
    ManageProjectController.getAllProject((data) => {
      setAllProjects(data);
      setAllProjectsTemp(data);
    });
  }, []);

  const projectData = useMemo(() => {
    let computedData = allProjects;
    const startIndex = (currentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, allProjects]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const onClickProjectDetail = (id) => {
    router.push(
      "/eco2/project/project_detail" + "?" + createQueryString("projectId", id)
    );
  };

  const onChangeSearchText = (text) => {
    setSearchText(text);
    var projectArray = allProjectsTemp.filter((v) =>
      v.projectTitle.toLowerCase().includes(text.toLowerCase())
    );
    setAllProjects(projectArray);
  };

  const onClickSorting = (type) => {
    var newArray = [...allProjectsTemp];
    if (type == "old to new") {
      newArray.sort(function (a, b) {
        return new Date(a.createdDatetime) - new Date(b.createdDatetime);
      });
    } else if (type == "new to old") {
      newArray.sort(function (a, b) {
        return new Date(b.createdDatetime) - new Date(a.createdDatetime);
      });
    }
    setAllProjects(newArray);
  };

  return (
    <div>
      <NavBar />
      <div className="" style={{ width: "100%" }}>
        <Image
          alt=""
          src={image.background1}
          width={1500}
          height={550}
          style={{ opacity: 0.8 }}
          layout="responsive"
        />
        <h1
          style={{
            position: "absolute",
            top: isMobile ? "18%" : isTablet ? "25%" : "50%",
            left: isMobile ? "35%" : isTablet ? "42%" : "44%",
            color: color.white,
          }}
        >
          Projects
        </h1>
      </div>

      <div className="d-flex mt-5">
        {/* <form className="d-flex flex-row justify-content-end col-12" onSubmit={{}}> */}
        <div className="d-flex justify-content-center justify-content-md-end col-9">
          <div className="d-flex flex-row col-9">
            <div class="input-group" style={{ height: 30 }}>
              <div class="input-group-text">
                <i className="bi bi-search"></i>
              </div>
              <input
                type="text"
                class="form-control form-control-sm"
                id="autoSizingInputGroup1"
                placeholder="Search Projects"
                value={searchText}
                onChange={(v) => onChangeSearchText(v.target.value)}
              />
            </div>
          </div>
        </div>

        <div class="dropdown col-3 d-flex flex-row justify-content-end flex-wrap">
          <button
            className="btn btn-outline-success dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              marginRight: 10,
              width: isMobile ? 75 : 110,
              // height: 30,
              fontSize: isMobile ? 10 : 14,
            }}
          >
            <i className="bi bi-funnel-fill"></i>
            Filter
          </button>
          <ul class="dropdown-menu" style={{ fontSize: isMobile ? 12 : 14 }}>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => onClickSorting("new to old")}
              >
                Date (new to old)
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => onClickSorting("old to new")}
              >
                Date (old to new)
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div
          className="d-flex flex-row justify-content-evenly flex-wrap card-group"
          style={{ width: "98%", marginBottom: 50, margin: "0px auto" }}
        >
          {projectData.map((v, i) => (
            <div
              key={i}
              style={{
                width: 400,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 30,
                cursor: "pointer",
              }}
              onClick={() => {
                onClickProjectDetail(v.id);
              }}
            >
              <div
                class="card border-light"
                style={{ width: "100%", minHeight: 550 }}
              >
                <div>
                  <Image
                    alt=""
                    //   className={styles.image}
                    src={baseUrl + v.projectImagePath}
                    // layout="responsive"
                    width={370}
                    height={420}
                    // onMouseOut={(e) => {
                    //   e.target.style.transform = "scale(1)";
                    // }}
                  />
                </div>
                <div class="card-body d-flex flex-column">
                  <h5
                    class="card-title"
                    style={{ fontSize: v.projectTitle.length > 32 ? 20 : 22 }}
                  >
                    {v.projectTitle}
                  </h5>
                  <p class="card-text" style={{ fontSize: 16 }}>
                    Date Published:{" "}
                    {moment(v.createdDatetime).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          items={allProjects.length} // 12
          currentPage={currentPage} // 1
          setCurrentPage={setCurrentPage}
          pageSize={pageSize} // 6
          onPageChange={onPageChange}
        />
      </div>
      <Footer />
    </div>
  );
}
