"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../../../../components/NavBar";
import AppContext from "../../../../context/AppContext";
import Pagination from "../../../../components/Pagination";
import { getLocalStorage } from "../../../../api/localStorage";
import Image from "next/image";
import { baseUrl } from "../../../../controller/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ManageProjectController } from "../../../../controller";
import { color } from "../../../../components/color";
import moment from "moment";

export default function ManageProject() {
  const { isMobile, isTablet, userInfo } = useContext(AppContext);
  const [isProjectNew, setIsProjectNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [projects, setProjects] = useState([]);
  const [newProjectData, setNewProjectData] = useState({
    projectTitle: "",
    projectDescription: "",
    projectImagePath: "",
    imageFileName: "",
    imageNamePath: "",
    joinUrl: "",
    createdBy: "",
    isActive: true,
  });
  const [viewProjectData, setViewProjectData] = useState(null);
  const [editProjectData, setEditProjectData] = useState(null);
  const [projectImageChange, setProjectImageChange] = useState(false);
  const [removeClick, setRemoveClick] = useState({
    text: "",
    id: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    getAllProject();
  }, []);

  const getAllProject = () => {
    ManageProjectController.getAllProject((data) => {
      if (data.length > 0) {
        setProjects(data);
      } else {
        toast.warn("No project is created yet!", {
          position: "top-right",
        });
      }
    });
  };

  const projectData = useMemo(() => {
    let computedData = projects;
    const startIndex = (currentPage - 1) * pageSize;
    return computedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, projects]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onChangeInfo = (text, value) => {
    const data = { ...newProjectData };
    if (text == "imageNamePath") {
      getBase64(value.files, (result) => {
        data.projectImagePath = result;
      });
      data.imageNamePath = value.value;
      data.imageFileName = value.files[0].name;
    } else {
      data[text] = value;
    }
    setNewProjectData(data);
  };

  const onChangeInfoEdit = (text, value) => {
    const data = { ...editProjectData };
    if (text == "imageNamePath") {
      getBase64(value.files, (result) => {
        data.projectImagePath = result;
      });
      data.imageNamePath = value.value;
      data.imageFileName = value.files[0].name;
    } else {
      data[text] = value;
    }
    setEditProjectData(data);
  };

  const getBase64 = (files, cb) => {
    const filePromises = Object.entries(files).map((item) => {
      return new Promise((resolve, reject) => {
        const [index, file] = item;
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = function (event) {
          const arrayBuffer = event.target.result;
          const uint8Array = new Uint8Array(arrayBuffer);
          const base64String = btoa(String.fromCharCode(...uint8Array));
          // cb(`data:${file.type};base64,${btoa(event.target.result)}`);

          resolve(`${base64String}`);
        };
        reader.onerror = function () {
          console.log("can't read the file");
          reject();
        };
      });
    });

    Promise.all(filePromises)
      .then((res) => {
        console.log("ready to submit");
        cb(res[0]);
      })
      .catch((error) => {
        console.log(error);
        console.log("something wrong happened");
      });
  };

  const onClickCreate = () => {
    if (newProjectData.projectTitle == "") {
      toast.warn("Please fill Project Title!", {
        position: "top-right",
      });
    } else if (newProjectData.projectDescription == "") {
      toast.warn("Please fill Project Description!", {
        position: "top-right",
      });
    } else if (newProjectData.projectImagePath == "") {
      toast.warn("Please choose Project Image!", {
        position: "top-right",
      });
    } else if (newProjectData.joinUrl == "") {
      toast.warn("Please fill Project Url!", {
        position: "top-right",
      });
    } else {
      var id = getLocalStorage("id");
      var obj = {
        projectTitle: newProjectData.projectTitle,
        projectDescription: newProjectData.projectDescription,
        projectImagePath: newProjectData.projectImagePath,
        imageFileName: newProjectData.imageFileName,
        joinUrl: newProjectData.joinUrl,
        createdBy: `${id}`,
        isActive: true,
      };
      //   console.log("obj", obj)
      ManageProjectController.createProject(obj, (data) => {
        if (data.id) {
          toast.success("Project create successfully!", {
            position: "top-right",
          });
          setIsProjectNew(false);
          getAllProject();
          setNewProjectData({
            projectTitle: "",
            projectDescription: "",
            projectImagePath: "",
            imageFileName: "",
            imageNamePath: "",
            joinUrl: "",
            createdBy: "",
            isActive: true,
          });
        }
      });
    }
  };

  const onClickViewOrEdit = (id, bool) => {
    ManageProjectController.getProjectDetail(id, (data) => {
      setIsEdit(bool);
      if (bool) {
        setEditProjectData(data);
      } else {
        setViewProjectData(data);
      }
    });
  };

  const onClickEditProject = () => {
    var id = getLocalStorage("id");
    var obj = {
      id: editProjectData.id,
      projectTitle: editProjectData.projectTitle,
      projectDescription: editProjectData.projectDescription,
      projectImagePath: editProjectData.projectImagePath,
      imageFileName: editProjectData.imageFileName
        ? editProjectData.imageFileName
        : "string",
      joinUrl: editProjectData.joinUrl,
      createdBy: `${id}`,
      isActive: true,
    };
    ManageProjectController.updateProject(obj, (data) => {
      if (data.id) {
        toast.success("Edited project successfully!", {
          position: "top-right",
        });
        getAllProject();
        setProjectImageChange(false);
        setEditProjectData(null);
      }
    });
  };

  const onClickRemove = (projectId) => {
    const id = getLocalStorage("id");
    var obj = {
      actorId: id,
      recordId: projectId,
    };
    ManageProjectController.deleteProject(obj, (data) => {
      getAllProject();
    });
  };

  return (
    <div>
      <NavBar />
      <div style={{ width: "95%", margin: "0px auto" }}>
        {isMobile ? (
          <h5 style={{ marginTop: 20 }}> Manage Project</h5>
        ) : (
          <h4 style={{ marginTop: 20 }}> Manage Project</h4>
        )}
        {isProjectNew ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: isMobile ? "90%" : isTablet ? "60%" : "50%",
              margin: "30px auto",
            }}
          >
            <button
              className="btn btn-info"
              style={{
                color: color.white,
                width: 120,
                alignSelf: "flex-end",
              }}
              onClick={() => setIsProjectNew(false)}
            >
              Back to List
            </button>
            <div className="" style={{ paddingTop: 10 }}>
              <label for="projectTitle" class="form-label">
                Project Title:
              </label>
              <input
                type="text"
                class="form-control"
                id="projectTitle"
                placeholder="Title"
                value={newProjectData.projectTitle}
                onChange={(e) => onChangeInfo("projectTitle", e.target.value)}
              />
            </div>
            <div className="" style={{ paddingTop: 10 }}>
              <label for="projectDescription" class="form-label">
                Project Description:
              </label>
              <input
                type="text"
                class="form-control"
                id="projectDescription"
                placeholder="Description"
                value={newProjectData.projectDescription}
                onChange={(e) =>
                  onChangeInfo("projectDescription", e.target.value)
                }
              />
            </div>
            <div className="" style={{ paddingTop: 10 }}>
              <label for="projectImage" class="form-label">
                Project Image:
              </label>
              <input
                class="form-control"
                type="file"
                id="projectImage"
                accept="image/*"
                value={newProjectData.imageNamePath}
                onChange={(e) => onChangeInfo("imageNamePath", e.target)}
              ></input>
            </div>
            <div className="" style={{ paddingTop: 10 }}>
              <label for="projectUrl" class="form-label">
                Project Url:
              </label>
              <input
                type="text"
                class="form-control"
                id="projectUrl"
                placeholder="Project Url"
                value={newProjectData.joinUrl}
                onChange={(e) => onChangeInfo("joinUrl", e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-success"
              style={{ width: 150, marginTop: 20, alignSelf: "flex-end" }}
              onClick={() => onClickCreate()}
            >
              Create
            </button>
          </div>
        ) : (
          <div className="d-flex flex-column">
            <button
              className="btn btn-info"
              style={{ color: color.white, alignSelf: "flex-end" }}
              onClick={() => setIsProjectNew(true)}
            >
              Create New
            </button>

            {projectData.length > 0 ? (
              <div class="table-responsive" style={{ margin: "30px 0px" }}>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">ID</th>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Url</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.map((v, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v.id}</td>
                        <td>
                          <Image
                            alt=""
                            src={baseUrl + v.projectImagePath}
                            width={50}
                            height={50}
                          />
                        </td>
                        <td>
                          <p
                            data-bs-toggle="modal"
                            data-bs-target="#projectModal"
                            onClick={() => {
                              onClickViewOrEdit(v.id, false);
                            }}
                            style={{
                              cursor: "pointer",
                              textDecoration: "underline",
                              color: color.skyBlue,
                            }}
                          >
                            {v.projectTitle}
                          </p>
                        </td>
                        <td>{v.projectDescription}</td>
                        <td>{v.joinUrl}</td>
                        <td>
                          <button
                            className="btn btn-success btn-sm"
                            style={{
                              color: color.white,
                              marginRight: 10,
                              width: 70,
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#projectModal"
                            onClick={() => {
                              onClickViewOrEdit(v.id, true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            style={{ color: color.white, width: 70 }}
                            data-bs-toggle="modal"
                            data-bs-target="#deleteProjectModal"
                            onClick={() => {
                              setRemoveClick({
                                text: v.projectTitle,
                                id: v.id,
                              });
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  items={projects.length} // 12
                  currentPage={currentPage} // 1
                  setCurrentPage={setCurrentPage}
                  pageSize={pageSize}
                  onPageChange={onPageChange}
                />
              </div>
            ) : null}
          </div>
        )}
        <div
          class="modal fade"
          id="projectModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabelProject"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabelProject">
                  {isEdit ? "Project Edit" : "Project Detail"}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    if (isEdit) {
                      setProjectImageChange(false);
                      setEditProjectData(null);
                    } else {
                      setViewProjectData(null);
                    }
                  }}
                ></button>
              </div>
              <div class="modal-body">
                {isEdit ? (
                  <div>
                    <div className="" style={{ paddingTop: 10 }}>
                      <label for="projectTitleEdit" class="form-label">
                        Project Title:
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="projectTitleEdit"
                        placeholder="Title"
                        value={editProjectData?.projectTitle}
                        onChange={(e) =>
                          onChangeInfoEdit("projectTitle", e.target.value)
                        }
                      />
                    </div>
                    <div className="" style={{ paddingTop: 10 }}>
                      <label for="projectDescriptionEdit" class="form-label">
                        Project Description:
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="projectDescriptionEdit"
                        placeholder="Description"
                        value={editProjectData?.projectDescription}
                        onChange={(e) =>
                          onChangeInfoEdit("projectDescription", e.target.value)
                        }
                      />
                    </div>
                    {projectImageChange ? (
                      <div className="" style={{ paddingTop: 10 }}>
                        <label for="projectImageEdit" class="form-label">
                          Project Image:
                        </label>
                        <input
                          class="form-control"
                          type="file"
                          id="projectImageEdit"
                          accept="image/*"
                          value={editProjectData?.imageNamePath}
                          onChange={(e) =>
                            onChangeInfoEdit("imageNamePath", e.target)
                          }
                        ></input>
                      </div>
                    ) : (
                      <div style={{ paddingTop: 10 }}>
                        <label for="projectImageEdit1" class="form-label">
                          Project Image:
                        </label>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            alt=""
                            src={baseUrl + editProjectData?.projectImagePath}
                            width={120}
                            height={120}
                          />
                          <button
                            className="btn btn-info"
                            style={{ color: color.white, marginLeft: 20 }}
                            onClick={() => setProjectImageChange(true)}
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="" style={{ paddingTop: 10 }}>
                      <label for="projectUrlEdit" class="form-label">
                        Project Url:
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="projectUrlEdit"
                        placeholder="Project Url"
                        value={editProjectData?.joinUrl}
                        onChange={(e) =>
                          onChangeInfoEdit("joinUrl", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ width: "95%", margin: "0px auto" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Project Title:</p>
                      <p style={{ flex: 3 }}>{viewProjectData?.projectTitle}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Project Url:</p>
                      <p style={{ flex: 3 }}>{viewProjectData?.joinUrl}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Project Image:</p>
                      <div style={{ flex: 3 }}>
                        <Image
                          alt=""
                          src={baseUrl + viewProjectData?.projectImagePath}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Project Description:</p>
                      <p style={{ flex: 3 }}>
                        {viewProjectData?.projectDescription}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Created By:</p>
                      <p style={{ flex: 3 }}>{viewProjectData?.createdBy}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ flex: 2 }}>Created Date:</p>
                      <p style={{ flex: 3 }}>
                        {moment(viewProjectData?.createdDatetime).format(
                          "DD MMM YYYY hh:mm a"
                        )}
                      </p>
                    </div>
                    {viewProjectData?.editedBy ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p style={{ flex: 2 }}>Edited By:</p>
                        <p style={{ flex: 3 }}>{viewProjectData?.editedBy}</p>
                      </div>
                    ) : null}
                    {viewProjectData?.editedDatetime ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p style={{ flex: 2 }}>Edited Date:</p>
                        <p style={{ flex: 3 }}>
                          {moment(viewProjectData?.editedDatetime).format(
                            "DD MMM YYYY hh:mm a"
                          )}
                        </p>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
              {isEdit ? (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                    style={{ width: 100, marginTop: 20, alignSelf: "flex-end" }}
                    onClick={() => onClickEditProject()}
                  >
                    Edit
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="deleteProjectModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabelProjectDelete"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <h1
                  class="modal-title fs-5"
                  id="exampleModalLabelProjectDelete"
                >
                  Project Delete
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setRemoveClick({
                      text: "",
                      id: 0,
                    });
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p style={{ fontSize: 16, fontWeight: "bold" }}>
                  Are you sure you want to delete &quot;{removeClick.text}
                  &quot;?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  style={{ width: 80, alignSelf: "flex-end" }}
                  onClick={() => onClickRemove(removeClick.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
