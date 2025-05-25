import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../baseURL";

axios.defaults.withCredentials = true;

const initialUser = JSON.parse(localStorage.getItem("user") || "null");

const initialState = {
  user: initialUser,
  allTeamMembers: [],
  fetchAllUsers: [],
  isLoading: false,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    authSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.success = "Success";
      state.error = null;
    },
    authFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    messageOnlySuccess: (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
      state.error = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.success = null;
      state.error = null;
      localStorage.removeItem("user");
    },
    setAllTeamMembers: (state, action) => {
      state.allTeamMembers = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setAllUsers: (state, action) => {
      state.fetchAllUsers = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  authRequest,
  authSuccess,
  authFail,
  messageOnlySuccess,
  clearMessages,
  logout,
  setAllTeamMembers,
  setAllUsers,
} = authSlice.actions;

export default authSlice.reducer;

const handleError = (err) =>
  err.response?.data?.message || err.message || "Something went wrong.";

// ==== Thunks ====

export const signup = (userData) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(`${baseURL}/auth/signup`, userData);
    if (data?.data?.user) {
      dispatch(authSuccess(data.data.user));
      localStorage.setItem("user", JSON.stringify(data.data.user));
    } else {
      dispatch(messageOnlySuccess(data.message));
    }
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};

export const login = (credentials) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(`${baseURL}/auth/login`, credentials);
    dispatch(authSuccess(data.data.user));
    localStorage.setItem("user", JSON.stringify(data.data.user));
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};

export const googleSignup = (googleIdToken) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(`${baseURL}/auth/signup`, {
      googleIdToken,
    });
    dispatch(authSuccess(data.data.user));
    localStorage.setItem("user", JSON.stringify(data.data.user));
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};

export const googleLogin = (googleIdToken) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(`${baseURL}/auth/login`, {
      googleId: googleIdToken,
    });
    dispatch(authSuccess(data.data.user));
    localStorage.setItem("user", JSON.stringify(data.data.user));
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};

export const forgotPassword =
  (email, otp = null, newPassword = null) =>
  async (dispatch) => {
    dispatch(authRequest());
    try {
      const body = { email };
      let endpoint = "/forgot-password";

      if (otp && newPassword) {
        body.otp = otp;
        body.newPassword = newPassword;
      }

      const { data } = await axios.post(`${baseURL}/auth${endpoint}`, body);
      dispatch(messageOnlySuccess(data.message));
      return { success: true, message: data.message };
    } catch (err) {
      const errorMsg = handleError(err);
      dispatch(authFail(errorMsg));
      return { success: false, message: errorMsg };
    }
  };

export const resendOtp = (email) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(`${baseURL}/auth/resend-otp`, { email });
    dispatch(messageOnlySuccess(data.message));
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};

export const resetPassword =
  (currentPassword, newPassword) => async (dispatch) => {
    dispatch(authRequest());
    try {
      const { data } = await axios.post(`${baseURL}/auth/reset-password`, {
        currentPassword,
        newPassword,
      });
      dispatch(messageOnlySuccess(data.message));
    } catch (err) {
      dispatch(authFail(handleError(err)));
    }
  };

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch(logout());
};

export const addTeamMember = (teamMemberData) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(
      `${baseURL}/auth/add-team-member`,
      teamMemberData
    );
    dispatch(messageOnlySuccess(data.message));
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};

export const fetchAllTeamMemders = () => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.get(`${baseURL}/auth/get-all-members`);
    dispatch(setAllTeamMembers(data.data));
    dispatch(messageOnlySuccess(data.message));
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};

export const editTeamMember = (editTeamMemberData) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.put(
      `${baseURL}/auth/update-member/${editTeamMemberData.id}`,
      editTeamMemberData
    );
    dispatch(messageOnlySuccess(data.message));
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};
export const deleteTeamMemders = (id) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.delete(`${baseURL}/auth/delete-member/${id}`);
    dispatch(messageOnlySuccess(data.message));
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.get(`${baseURL}/auth/get-all-multipal-users`);
    console.log(data);

    dispatch(setAllUsers(data?.data));
    dispatch(messageOnlySuccess(data.message));
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};
