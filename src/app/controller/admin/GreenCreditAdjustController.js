import { getApi, postApi } from "../apiHelper"

const getAccounts = (setData) => {
    getApi("/api/AccountItems/GetAccountNameId", data => setData(data))
}

const getAdjustReason = (setData) => {
    getApi("/api/AccountItems/GetGCAdjustReasonNameId", data => setData(data))
}

const updateGCAdjust = (obj, setData) => {
    postApi("/api/AccountItems/CreateGCAdjustment", obj, data => setData(data))
}

export const GreenCreditAdjustController = {getAccounts, getAdjustReason, updateGCAdjust}