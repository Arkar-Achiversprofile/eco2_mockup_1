import { getApi, patchApi, postApi } from "../apiHelper/index";

const createProduct = (obj, setData) => {
  postApi("Shop/CreateProduct", obj, (data) => setData(data));
};

const getLandingProducts = (setData) => {
  getApi("Shop/GetLandingProducts", (data) => setData(data));
};

const getProductDetail = (id, setData) => {
  getApi(`Shop/GetShopProduct/${id}`, (data) => setData(data));
};

const updateProduct = (obj, setData) => {
  patchApi("Shop/EditProduct", obj, (data) => setData(data));
};

const deleteProduct = (obj, setData) => {
  patchApi("Shop/DeleteProductbyId", obj, (data) => setData(data));
};

export const ProductController = {
  createProduct,
  getLandingProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
};
