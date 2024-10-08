import { getApi, patchApi, postApi } from "../apiHelper"

const getAccounts = (setData) => {
    getApi("/api/AccountItems/GetAccountNameId", data => setData(data))
}

const getAdjustReason = (setData) => {
    getApi("/api/AccountItems/GetGCAdjustReasonNameId", data => setData(data))
}

const updateGCAdjust = (obj, setData) => {
    postApi("/api/AccountItems/CreateGCAdjustment", obj, data => setData(data))
}

const updateBoxAdjust = (obj, setData) => {
    patchApi("/api/AccountItems/BoxTransactionAdjust", obj, data => setData(data))
}

export const GreenCreditAdjustController = {getAccounts, getAdjustReason, updateGCAdjust, updateBoxAdjust}