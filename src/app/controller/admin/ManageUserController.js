import { getApi, patchApi, postApi } from "../apiHelper";

const getAccountItems = (setData) => {
    getApi("AccountItems/GetAccountItemReport", data => setData(data))
}

const getAccountItemsByRole = (id, setData) => {
    getApi(`AccountItems/GetAccountItemReportByRole/${id}`, data => setData(data))
}

const getUserByUserName = (userName, setData) => {
    getApi(`AccountItems/GetAccountItemReportByUserName/${userName}`, data => setData(data))
}

const createUser = (obj, setData) => {
    postApi("AccountItems/signup", obj, data => setData(data))
}

const getUserDetail = (id, setData) => {
    getApi(`AccountItems/GetAccountInfo4Update/${id}`, data => setData(data))
}

const updateUser = (obj, setData) => {
    patchApi("AccountItems/EditAccountItem", obj, data => setData(data))
}

const deleteUser = (obj, setData) => {
    patchApi("AccountItems/DeleteAccountItem", obj, data => setData(data))
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