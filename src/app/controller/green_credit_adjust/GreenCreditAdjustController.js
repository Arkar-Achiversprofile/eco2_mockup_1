import { getApi, postApi } from "../apiHelper"

const getAccounts = (setData) => {
    getApi("AccountItems/GetAccountNameId", data => setData(data))
}

const getAdjustReason = (setData) => {
    getApi("AccountItems/GetGCAdjustReasonNameId", data => setData(data))
}

const updateGCAdjust = (obj, setData) => {
    postApi("AccountItems/CreateGCAdjustment", obj, data => setData(data))
}

export const GreenCreditAdjustController = {getAccounts, getAdjustReason, updateGCAdjust}