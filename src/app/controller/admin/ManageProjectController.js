import { getApi, postApi, patchApi } from "../apiHelper";

const createProject = (obj, setData) => {
    postApi("/api/Eco2Project/CreateEco2Project", obj, data => setData(data))
}

const getAllProject = (setData) => {
    getApi("/api/Eco2Project/GetAllProjects", data => setData(data))
}

const getProjectDetail = (id, setData) => {
    getApi(`/api/Eco2Project/GetProjectByID/${id}`, data => setData(data))
}

const updateProject = (obj, setData) => {
    patchApi("/api/Eco2Project/EditEco2Project", obj, data => setData(data))
}

const deleteProject = (obj, setData) => {
    patchApi("/api/Eco2Project/DeleteEco2Project", obj, data => setData(data))
}

export const ManageProjectController = {
    createProject,
    getAllProject,
    getProjectDetail,
    updateProject,
    deleteProject
}