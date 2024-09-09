import { postApi, getApi, patchApi } from "../apiHelper";

const createBrand = (obj, setData) => {
  postApi("Brand/CreateBrand", obj, (data) => setData(data));
};

const getBrandIdList = (setData) => {
  getApi("Brand/GetAllBrandsNameID", (data) => setData(data));
};

const createCollection = (obj, setData) => {
  postApi("Brand/CreateCollectionLocation", obj, (data) => setData(data));
};

export const BrandController = {
  createBrand,
  getBrandIdList,
  createCollection,
};
