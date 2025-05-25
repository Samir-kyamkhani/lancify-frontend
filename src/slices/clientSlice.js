import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../baseURL";

const initialState = {
  clients: [],
  client: null,
  isLoading: false,
  error: null,
  success: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    clientRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    clientSuccess: (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
      state.error = null;
    },
    clientFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    setSingleClient: (state, action) => {
      state.client = action.payload;
    },
    clearMessages: (state) => {
      state.success = null;
      state.error = null;
    },
  },
});

export const {
  clientRequest,
  clientSuccess,
  clientFail,
  setClients,
  setSingleClient,
  clearMessages,
} = clientSlice.actions;

export default clientSlice.reducer;

// Helper to extract error message
const extractError = (err) =>
  err?.response?.data?.message || err.message || "Something went wrong.";

// ➕ Add Client
export const addClient = (clientData) => async (dispatch) => {
  dispatch(clientRequest());
  console.log(clientData);

  try {
    const { data } = await axios.post(
      `${baseURL}/client/add-client`,
      clientData
    );
    dispatch(clientSuccess(data.message));
    dispatch(fetchAllClients());
  } catch (err) {
    console.log(err);
    dispatch(clientFail(extractError(err)));
  }
};

// 📃 Get All Clients
export const fetchAllClients = () => async (dispatch) => {
  dispatch(clientRequest());
  try {
    const { data } = await axios.get(`${baseURL}/client/get-all-clients`);
    dispatch(setClients(data.data));
    dispatch(clientSuccess("Fetched all clients"));
  } catch (err) {
    dispatch(clientFail(extractError(err)));
  }
};

// 👤 Get One Client
export const fetchSingleClient = (id) => async (dispatch) => {
  dispatch(clientRequest());
  try {
    const { data } = await axios.get(`${baseURL}/client/${id}`);
    dispatch(setSingleClient(data.data));
    dispatch(clientSuccess("Client fetched"));
  } catch (err) {
    dispatch(clientFail(extractError(err)));
  }
};

// ✏️ Edit Client
export const editClient = (updatedData) => async (dispatch) => {
  dispatch(clientRequest());
  try {
    const { data } = await axios.put(
      `${baseURL}/client/edit-client/${updatedData.id}`,
      updatedData
    );
    dispatch(clientSuccess(data.message));
  } catch (err) {
    dispatch(clientFail(extractError(err)));
  }
};

// 🗑️ Delete Client
export const deleteClient = (id) => async (dispatch) => {
  dispatch(clientRequest());
  try {
    const { data } = await axios.delete(`${baseURL}/client/delete-client/${id}`);
    dispatch(clientSuccess(data.message));
    dispatch(fetchAllClients()); // Refresh list
  } catch (err) {
    dispatch(clientFail(extractError(err)));
  }
};
