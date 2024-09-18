import { postApi, getApi, patchApi } from "../apiHelper";

const getAllBrands = (setData) => {
  getApi("Brand/GetAllBrands", data => setData(data))
}

const createBrand = (obj, setData) => {
  postApi("Brand/CreateBrand", obj, (data) => setData(data));
};

const getBrandIdList = (setData) => {
  getApi("Brand/GetAllBrandsNameID", (data) => setData(data));
};

const updateBrand = (obj, setData) => {
  patchApi(`Brand/EditBrand`, obj, data => setData(data));
}

const deleteBrand = (obj, setData) => {
  patchApi("Brand/DeleteBrandByBrandId", obj, data => setData(data))
}

const createCollection = (obj, setData) => {
  postApi("Brand/CreateCollectionLocation", obj, (data) => setData(data));
};

export const BrandController = {
  getAllBrands,
  createBrand,
  getBrandIdList,
  updateBrand,
  deleteBrand,
  createCollection,
};
