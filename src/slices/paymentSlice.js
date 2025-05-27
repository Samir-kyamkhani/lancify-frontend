// financeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../baseURL";

const initialState = {
  invoices: [],
  invoice: null,
  isLoading: false,
  error: null,
  success: null,
};

const slice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    requestStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    requestSuccess: (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
      state.error = null;
    },
    requestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    setSingleInvoice: (state, action) => {
      state.invoice = action.payload;
    },
    clearMessages: (state) => {
      state.success = null;
      state.error = null;
    },
  },
});

export const {
  requestStart,
  requestSuccess,
  requestFail,
  setInvoices,
  setSingleInvoice,
  clearMessages,
} = slice.actions;

export default slice.reducer;

// Error message helper
const extractError = (err) =>
  err?.response?.data?.message || err.message || "Something went wrong.";

// Thunks:

export const addInvoice = (invoiceData) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.post(
      `${baseURL}/payments/add-invoice`,
      invoiceData,
      { withCredentials: true }
    );
    dispatch(requestSuccess(data.message));
    dispatch(fetchAllInvoices());
  } catch (err) {
    dispatch(requestFail(extractError(err)));
  }
};

export const fetchAllInvoices = () => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.get(`${baseURL}/payments/get-all-invoices`);
    dispatch(setInvoices(data.data));
    dispatch(requestSuccess("Fetched all invoices"));
  } catch (err) {
    dispatch(requestFail(extractError(err)));
  }
};

export const fetchSingleInvoice = (id) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.get(
      `${baseURL}/payments/get-single-invoice/${id}`
    );
    dispatch(setSingleInvoice(data.data));
    dispatch(requestSuccess("Fetched invoice"));
  } catch (err) {
    dispatch(requestFail(extractError(err)));
  }
};

export const editInvoice = (updatedData) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.put(
      `${baseURL}/payments/edit-invoice/${updatedData.id}`,
      updatedData,
      { withCredentials: true }
    );
    dispatch(requestSuccess(data.message));
    dispatch(fetchAllInvoices());
  } catch (err) {
    dispatch(requestFail(extractError(err)));
  }
};

export const deleteInvoice = (id) => async (dispatch) => {
    console.log(id);
    
  dispatch(requestStart());
  try {
    const { data } = await axios.delete(
      `${baseURL}/payments/delete-invoice/${id}`,
      { withCredentials: true }
    );
    dispatch(requestSuccess(data.message));
    dispatch(fetchAllInvoices());
  } catch (err) {
    dispatch(requestFail(extractError(err)));
  }
};
