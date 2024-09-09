import { getApi, postApi } from "../apiHelper";

const createCategory = (obj, setData) => {
  postApi("Shop/CreateCategory", obj, (data) => setData(data));
};

const getTopCategory = (setData) => {
  getApi("Shop/GetTopCategories", (data) => setData(data));
};

const getCategoriesWithoutProduct = (setData) => {
  getApi("Shop/GetCategoriesWithoutProduct", (data) => setData(data));
};

const getLowestCategories = (setData) => {
  getApi("Shop/GetLowestCategories", (data) => setData(data));
};

export const CategoryController = {
  createCategory,
  getTopCategory,
  getCategoriesWithoutProduct,
  getLowestCategories,
};
