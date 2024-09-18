import { getApi, postApi } from "../apiHelper";

const getAllActiveTransaction = (setData) => {
    getApi("Shop/GetActiveTransactions", data => setData(data))
}

const getActiveTransactionByBrandId = (id, setData) => {
    getApi(`Shop/GetActiveTransactionsByBrandId/${id}`, data => setData(data))
}

const getAllClosedTransaction = (setData) => {
    getApi("Shop/GetClosedTransactions", data => setData(data))
}

const getClosedTransactionByBrandId = (id, setData) => {
    getApi(`Shop/GetClosedTransactionsByBrandAccountingId/${id}`, data => setData(data))
}

const updateTransactionStatusByStaff = (id, setData) => {
    postApi(`Supplier/AddTransactionStatusHistory/${id}`, null, data => setData(data))
}

const getTransactionDetailByPurchasedBrandId = (id, setData) => {
    getApi(
      `Supplier/GetSupplierTransactionsDetailsByPurchasedBrandId/${id}`,
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