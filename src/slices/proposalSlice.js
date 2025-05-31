import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../baseURL";

const initialState = {
  proposals: [],
  proposal: null,
  isLoading: false,
  error: null,
  success: null,
};

const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    proposalRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    proposalSuccess: (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
      state.error = null;
    },
    proposalFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setProposals: (state, action) => {
      state.proposals = action.payload;
    },
    setSingleProposal: (state, action) => {
      state.proposal = action.payload;
    },
    clearMessages: (state) => {
      state.success = null;
      state.error = null;
    },
  },
});

export const {
  proposalRequest,
  proposalSuccess,
  proposalFail,
  setProposals,
  setSingleProposal,
  clearMessages,
} = proposalSlice.actions;

export default proposalSlice.reducer;

// Helper to extract error message
const extractError = (err) =>
  err?.response?.data?.message || err.message || "Something went wrong.";

// ➕ Add Proposal
export const addProposal = (proposalData) => async (dispatch) => {
  dispatch(proposalRequest());
  try {
    const { data } = await axios.post(
      `${baseURL}/proposals/create-proposal`,
      proposalData,
      { withCredentials: true }
    );

    dispatch(proposalSuccess(data.message));
    dispatch(fetchAllProposals());
  } catch (err) {
    console.log(err);
    dispatch(proposalFail(extractError(err)));
  }
};

// 📃 Get All Proposals
export const fetchAllProposals = () => async (dispatch) => {
  dispatch(proposalRequest());
  try {
    const { data } = await axios.get(`${baseURL}/proposals/get-all-proposals`);
    dispatch(setProposals(data.data));
    dispatch(proposalSuccess("Fetched all proposals"));
  } catch (err) {
    dispatch(proposalFail(extractError(err)));
  }
};

// 👤 Get One Proposal
export const fetchSingleProposal = (id) => async (dispatch) => {
  dispatch(proposalRequest());
  try {
    const { data } = await axios.get(`${baseURL}/proposals/get-proposal/${id}`);
    dispatch(setSingleProposal(data.data));
    dispatch(proposalSuccess("Proposal fetched"));
  } catch (err) {
    dispatch(proposalFail(extractError(err)));
  }
};

// ✏️ Edit Proposal
export const editProposal = (updatedData) => async (dispatch) => {
  dispatch(proposalRequest());
  try {
    const { data } = await axios.put(
      `${baseURL}/proposals/update-proposal/${updatedData.id}`,
      updatedData
    );
    dispatch(proposalSuccess(data.message));
    dispatch(fetchAllProposals());
  } catch (err) {
    dispatch(proposalFail(extractError(err)));
  }
};

// 🗑️ Delete Proposal
export const deleteProposal = (id) => async (dispatch) => {
  dispatch(proposalRequest());
  try {
    const { data } = await axios.delete(
      `${baseURL}/proposals/delete-proposal/${id}`
    );
    dispatch(proposalSuccess(data.message));
    dispatch(fetchAllProposals()); // Refresh list
  } catch (err) {
    dispatch(proposalFail(extractError(err)));
  }
};
