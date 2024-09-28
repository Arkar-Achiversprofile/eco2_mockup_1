import { deleteApi, getApi, patchApi, postApi, putApi } from "../apiHelper";

const getSubCategoryOrProduct = (productId, setData) => {
  getApi(`/api/Shop/GetGalleryDisplay/${productId}`, (data) => setData(data));
};

const getProductDetail = (productId, setData) => {
  getApi(`/api/Shop/GetShopProduct/${productId}`, (data) => setData(data));
};

const addToCart = (obj, setData) => {
  postApi("/api/Shop/CreateShopCartItem", obj, (data) => setData(data));
};

const getCartByUserId = (id, setData) => {
  getApi(`/api/Shop/GetShopCartItemsByAccountItemID/${id}`, (data) => setData(data));
};

const updateQuantityInCart = (obj, setData) => {
  patchApi(
    "/api/Shop/UpdateShopCartItemQuantity",
    obj,
    (data) => setData(data)
  );
};

const deleteProductInCart = (cartId, setData) => {
  patchApi(`/api/Shop/DeleteShopCartItem/${cartId}`, null, data => setData(data))
}

const createTransaction = (obj, setData) => {
  postApi(`/api/Shop/CreateTransaction`, obj, data => setData(data))
}

const getUserTransactionHistory = (userId, setData) => {
  getApi(`/api/Shop/GetTransactionHistoryByAccountItemID/${userId}`, data => setData(data))
}

const addToWishlist = (obj, setData) => {
  postApi(`/api/Shop/CreateWishListItem`, obj, data => setData(data));
}

const getWishlistByAccountId = (id, setData) => {
  getApi(`/api/Shop/GetWishListItemsbyAccountItemId/${id}`, data => setData(data))
}

const removeWishlistByUser = (id, setData) => {
  patchApi(`/api/Shop/RemoveWishListItemById/${id}`, null, data => setData(data))
}

const getShippingInfo = (id, setData) => {
  getApi(`/api/AccountItems/GetShippingInfo/${id}`, data => setData(data))
}

const getProductListForReview = (id, setData) => {
  getApi(`/api/Shop/GetPurchasedBrandProducts4ReviewByBuyerId/${id}`, data => setData(data))
}

const createProductReview = (obj, setData) => {
  postApi("/api/Shop/CreateProductReview", obj, data => setData(data))
}

export const EShopController = {
  getSubCategoryOrProduct,
  getProductDetail,
  addToCart,
  getCartByUserId,
  updateQuantityInCart,
  deleteProductInCart,
  createTransaction,
  getUserTransactionHistory,
  addToWishlist,
  getWishlistByAccountId,
  removeWishlistByUser,
  getShippingInfo,
  getProductListForReview,
  createProductReview,
};
