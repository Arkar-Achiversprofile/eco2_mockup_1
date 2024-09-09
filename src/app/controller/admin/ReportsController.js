import {getApi} from "../apiHelper/index";

const getTop5SellingProducts = (setData) => {
    getApi("Report/GetTop5SellingProducts", data => setData(data));
}

const getTop5SellingCategories = (setData) => {
    getApi("Report/GetTop5SellingCatetories", data => setData(data))
}

const getTop5Donator = (setData) => {
    getApi("Report/GetTop5Donator", data => setData(data))
} 

const getDonationByAddress = (setData) => {
    getApi("Report/GetAggregatedDonationByAddress", data => setData(data))
} 

export const ReportsController = {
    getTop5SellingProducts,
    getTop5SellingCategories,
    getTop5Donator,
    getDonationByAddress
}