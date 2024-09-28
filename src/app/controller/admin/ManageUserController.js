import { getApi, patchApi, postApi } from "../apiHelper";

const getAccountItems = (setData) => {
    getApi("/api/AccountItems/GetAccountItemReport", data => setData(data))
}

const getAccountItemsByRole = (id, setData) => {
    getApi(`/api/AccountItems/GetAccountItemReportByRole/${id}`, data => setData(data))
}

const getUserByUserName = (userName, setData) => {
    getApi(`/api/AccountItems/GetAccountItemReportByUserName/${userName}`, data => setData(data))
}

const createUser = (obj, setData) => {
    postApi("/api/AccountItems/signup", obj, data => setData(data))
}

const getUserDetail = (id, setData) => {
    getApi(`/api/AccountItems/GetAccountInfo4Update/${id}`, data => setData(data))
}

const updateUser = (obj, setData) => {
    patchApi("/api/AccountItems/EditAccountItem", obj, data => setData(data))
}

const deleteUser = (obj, setData) => {
    patchApi("/api/AccountItems/DeleteAccountItem", obj, data => setData(data))
}

export const ManageUserController = {
    getAccountItems,
    getAccountItemsByRole,
    getUserByUserName,
    createUser,
    getUserDetail,
    updateUser,
    deleteUser
}