import { getApi, patchApi, postApi } from "../apiHelper/index";

const createProduct = (obj, setData) => {
  postApi("/api/Shop/CreateProduct", obj, (data) => setData(data));
};

const getLandingProducts = (setData) => {
  getApi("/api/Shop/GetLandingProducts", (data) => setData(data));
};

const getProductDetail = (id, setData) => {
  getApi(`/api/Shop/GetShopProduct/${id}`, (data) => setData(data));
};

const updateProduct = (obj, setData) => {
  patchApi("/api/Shop/EditProduct", obj, (data) => setData(data));
};

const deleteProduct = (obj, setData) => {
  patchApi("/api/Shop/DeleteProductbyId", obj, (data) => setData(data));
};

export const ProductController = {
  createProduct,
  getLandingProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
};
