import { deleteApi, getApi, patchApi, postApi } from "../apiHelper";

const getBrandRecord = (id, setData) => {
  getApi(`/api/Supplier/GetBrandBySupplierId/${id}`, data => setData(data));
}

const updateBrandBySupplier = (obj, setData) => {
  patchApi(`/api/Brand/EditBrand`, obj, data => setData(data));
}

const deleteBrandBySupplier = (obj, setData) => {
  patchApi("/api/Brand/DeleteBrandByBrandId", obj, data => setData(data))
}

const createCollectionBySupplier = (obj, setData) => {
  postApi("/api/Brand/CreateCollectionLocation", obj, (data) => setData(data));
};

const editCollectionBySupplier = (obj, setData) => {
  patchApi('/api/Brand/EditCollectionLocation', obj, data => setData(data))
}

const deleteCollectionBySupplier = (obj, setData) => {
  patchApi('/api/Brand/DeleteCollectionLocation', obj, data => setData(data))
}

const getProductBySupplierId = (id, setData) => {
  getApi(`/api/Brand/GetAllProductBySupplierID/${id}`, data => setData(data))
}

const getProductDetailBySupplierId = (id, setData) => {
  getApi(`/api/Shop/GetShopProduct/${id}`, data => setData(data))
}

const updateProductBySupplier = (obj, setData) => {
  patchApi("/api/Shop/EditProduct", obj, data => setData(data))
}

const deleteProductBySupplier = (obj, setData) => {
  patchApi("/api/Shop/DeleteProductbyId", obj, data => setData(data))
}

const getTransactionBySupplierId = (id, setData) => {
  getApi(`/api/Supplier/GetSupplierTransactionsBySupplierId/${id}`, (data) =>
    setData(data)
  );
};

const getTransactionDetailByPurchasedBrandId = (id, setData) => {
  getApi(
    `/api/Supplier/GetSupplierTransactionsDetailsByPurchasedBrandId/${id}`,
    (data) => setData(data)
  );
};

const updateTransactionStatusBySupplier = (id, setData) => {
    postApi(`/api/Supplier/AddTransactionStatusHistory/${id}`, null, data => setData(data))
}

const getClosedTransaction = (id, setData) => {
  getApi(`/api/Supplier/GetClosedTransactionsBySupplierId/${id}`, data => setData(data))
}

const getUserListWhoWishlistTheProduct = (id, setData) => {
  getApi(`/api/Shop/GetWishListSubscribersByProductId/${id}`, data => setData(data))
} 

const removeAllWishlistWhenProductInstock = (productId, setData) => {
  patchApi(`/api/Shop/RemoveWishListItems/${productId}`, null, data => setData(data));
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
  getUserListWhoWishlistTheProduct,
  removeAllWishlistWhenProductInstock,
};
