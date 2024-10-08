import { getApi, patchApi, postApi } from "../apiHelper";

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

const getAllCategories = (setData) => {
  getApi("/api/Shop/GetAllCategories", data => setData(data))
}

const getAllParentCategoriesNameValue = (setData) => {
  getApi("/api/Shop/GetAllParentCategoriesNameValue", data => setData(data))
}

const deleteCategory = (obj, setData) => {
  patchApi("/api/Shop/DeleteCategory", obj, data => setData(data))
}

export const CategoryController = {
  createCategory,
  getTopCategory,
  getCategoriesWithoutProduct,
  getLowestCategories,
  getAllCategories,
  getAllParentCategoriesNameValue,
  deleteCategory
};
