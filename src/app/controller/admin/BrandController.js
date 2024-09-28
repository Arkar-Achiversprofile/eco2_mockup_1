import { postApi, getApi, patchApi } from "../apiHelper";

const getAllBrands = (setData) => {
  getApi("/api/Brand/GetAllBrands", data => setData(data))
}

const createBrand = (obj, setData) => {
  postApi("/api/Brand/CreateBrand", obj, (data) => setData(data));
};

const getBrandIdList = (setData) => {
  getApi("/api/Brand/GetAllBrandsNameID", (data) => setData(data));
};

const updateBrand = (obj, setData) => {
  patchApi("/api/Brand/EditBrand", obj, data => setData(data));
}

const deleteBrand = (obj, setData) => {
  patchApi("/api/Brand/DeleteBrandByBrandId", obj, data => setData(data))
}

const createCollection = (obj, setData) => {
  postApi("/api/Brand/CreateCollectionLocation", obj, (data) => setData(data));
};

export const BrandController = {
  getAllBrands,
  createBrand,
  getBrandIdList,
  updateBrand,
  deleteBrand,
  createCollection,
};
