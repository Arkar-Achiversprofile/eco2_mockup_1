import {getApi, postApi} from "../apiHelper/index";

const createProduct = (obj, setData) => {
    postApi("Shop/CreateProduct", obj, (data) => setData(data));
}

const getLandingProducts = (setData) => {
    getApi("Shop/GetLandingProducts", data => setData(data))
}

export const ProductController = {createProduct, getLandingProducts}