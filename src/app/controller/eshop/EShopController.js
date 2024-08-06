import { deleteApi, getApi, patchApi, postApi, putApi } from "../apiHelper";

const getSubCategoryOrProduct = (productId, setData) => {
  getApi(`Shop/GetGalleryDisplay/${productId}`, (data) => setData(data));
};

const getProductDetail = (productId, setData) => {
  getApi(`Shop/GetShopProduct/${productId}`, (data) => setData(data));
};

const addToCart = (obj, setData) => {
  postApi("Shop/CreateShopCartItem", obj, (data) => setData(data));
};

const getCartByUserId = (id, setData) => {
  getApi(`Shop/GetShopCartItemsByAccountItemID/${id}`, (data) => setData(data));
};

const updateQuantityInCart = (obj, setData) => {
  patchApi(
    "Shop/UpdateShopCartItemQuantity",
    obj,
    (data) => setData(data)
  );
};

const deleteProductInCart = (cartId, setData) => {
  patchApi(`Shop/DeleteShopCartItem/${cartId}`, null, data => setData(data))
}

const createTransaction = (obj, setData) => {
  postApi(`Shop/CreateTransaction`, obj, data => setData(data))
}

const getUserTransactionHistory = (userId, setData) => {
  getApi(`Shop/GetTransactionHistoryByAccountItemID/${userId}`, data => setData(data))
}

export const EShopController = {
  getSubCategoryOrProduct,
  getProductDetail,
  addToCart,
  getCartByUserId,
  updateQuantityInCart,
  deleteProductInCart,
  createTransaction,
  getUserTransactionHistory
};
