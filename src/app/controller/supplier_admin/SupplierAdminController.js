import { deleteApi, getApi, patchApi, postApi } from "../apiHelper";

const getBrandRecord = (id, setData) => {
  getApi(`Supplier/GetBrandBySupplierId/${id}`, data => setData(data));
}

const updateBrandBySupplier = (obj, setData) => {
  patchApi(`Brand/EditBrand`, obj, data => setData(data));
}

const deleteBrandBySupplier = (obj, setData) => {
  patchApi("Brand/DeleteBrandByBrandId", obj, data => setData(data))
}

const createCollectionBySupplier = (obj, setData) => {
  postApi("Brand/CreateCollectionLocation", obj, (data) => setData(data));
};

const editCollectionBySupplier = (obj, setData) => {
  patchApi('Brand/EditCollectionLocation', obj, data => setData(data))
}

const deleteCollectionBySupplier = (obj, setData) => {
  patchApi('Brand/DeleteCollectionLocation', obj, data => setData(data))
}

const getProductBySupplierId = (id, setData) => {
  getApi(`Brand/GetAllProductBySupplierID/${id}`, data => setData(data))
}

const getProductDetailBySupplierId = (id, setData) => {
  getApi(`Shop/GetShopProduct/${id}`, data => setData(data))
}

const updateProductBySupplier = (obj, setData) => {
  patchApi("Shop/EditProduct", obj, data => setData(data))
}

const deleteProductBySupplier = (obj, setData) => {
  patchApi("Shop/DeleteProductbyId", obj, data => setData(data))
}

const getTransactionBySupplierId = (id, setData) => {
  getApi(`Supplier/GetSupplierTransactionsBySupplierId/${id}`, (data) =>
    setData(data)
  );
};

const getTransactionDetailByPurchasedBrandId = (id, setData) => {
  getApi(
    `Supplier/GetSupplierTransactionsDetailsByPurchasedBrandId/${id}`,
    (data) => setData(data)
  );
};

const updateTransactionStatusBySupplier = (id, setData) => {
    postApi(`Supplier/AddTransactionStatusHistory/${id}`, null, data => setData(data))
}

const getClosedTransaction = (id, setData) => {
  getApi(`Supplier/GetClosedTransactionsBySupplierId/${id}`, data => setData(data))
}

export const SupplierAdminController = {
  getBrandRecord,
  updateBrandBySupplier,
  deleteBrandBySupplier,
  createCollectionBySupplier,
  editCollectionBySupplier,
  deleteCollectionBySupplier,
  getProductBySupplierId,
  getProductDetailBySupplierId,
  updateProductBySupplier,
  deleteProductBySupplier,
  getTransactionBySupplierId,
  getTransactionDetailByPurchasedBrandId,
  updateTransactionStatusBySupplier,
  getClosedTransaction,
};
