import { getApi, postApi } from "../apiHelper";

const createCategory = (obj, setData) => {
  postApi("/api/Shop/CreateCategory", obj, (data) => setData(data));
};

const getTopCategory = (setData) => {
  getApi("/api/Shop/GetTopCategories", (data) => setData(data));
};

const getCategoriesWithoutProduct = (setData) => {
  getApi("/api/Shop/GetCategoriesWithoutProduct", (data) => setData(data));
};

const getLowestCategories = (setData) => {
  getApi("/api/Shop/GetLowestCategories", (data) => setData(data));
};

export const CategoryController = {
  createCategory,
  getTopCategory,
  getCategoriesWithoutProduct,
  getLowestCategories,
};
