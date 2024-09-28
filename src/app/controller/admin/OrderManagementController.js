import { getApi, postApi } from "../apiHelper";

const getAllActiveTransaction = (setData) => {
    getApi("/api/Shop/GetActiveTransactions", data => setData(data))
}

const getActiveTransactionByBrandId = (id, setData) => {
    getApi(`/api/Shop/GetActiveTransactionsByBrandId/${id}`, data => setData(data))
}

const getAllClosedTransaction = (setData) => {
    getApi("/api/Shop/GetClosedTransactions", data => setData(data))
}

const getClosedTransactionByBrandId = (id, setData) => {
    getApi(`/api/Shop/GetClosedTransactionsByBrandAccountingId/${id}`, data => setData(data))
}

const updateTransactionStatusByStaff = (id, setData) => {
    postApi(`/api/Supplier/AddTransactionStatusHistory/${id}`, null, data => setData(data))
}

const getTransactionDetailByPurchasedBrandId = (id, setData) => {
    getApi(
      `/api/Supplier/GetSupplierTransactionsDetailsByPurchasedBrandId/${id}`,
      (data) => setData(data)
    );
  };

export const OrderManagementController = {
    getAllActiveTransaction,
    getActiveTransactionByBrandId,
    getAllClosedTransaction,
    getClosedTransactionByBrandId,
    updateTransactionStatusByStaff,
    getTransactionDetailByPurchasedBrandId
}