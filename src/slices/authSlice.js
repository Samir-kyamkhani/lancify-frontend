import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../baseURL";

// ✅ Axios global config (Optional but recommended)
axios.defaults.withCredentials = true;

// Initial state from localStorage
const initialUser = JSON.parse(localStorage.getItem("user") || "null");

const initialState = {
  user: initialUser,
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
  },
});

export const {
  authRequest,
  authSuccess,
  authFail,
  messageOnlySuccess,
  clearMessages,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

const handleError = (err) =>
  err.response?.data?.message || err.message || "Something went wrong.";

// ==== Thunks ====

export const signup = (userData) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(`${baseURL}/signup`, userData, {
      withCredentials: true,
    });
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
    const { data } = await axios.post(`${baseURL}/login`, credentials, {
      withCredentials: true,
    });
    dispatch(authSuccess(data.data.user));
    localStorage.setItem("user", JSON.stringify(data.data.user));
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};

export const googleSignup = (googleIdToken) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(
      `${baseURL}/signup`,
      { googleIdToken },
      { withCredentials: true }
    );
    dispatch(authSuccess(data.data.user));
    localStorage.setItem("user", JSON.stringify(data.data.user));
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};

export const googleLogin = (googleIdToken) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(
      `${baseURL}/login`,
      { googleId: googleIdToken },
      { withCredentials: true }
    );
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

      const { data } = await axios.post(`${baseURL}${endpoint}`, body, {
        withCredentials: true,
      });

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
    const { data } = await axios.post(
      `${baseURL}/resend-otp`,
      { email },
      { withCredentials: true }
    );
    dispatch(messageOnlySuccess(data.message));
  } catch (err) {
    dispatch(authFail(handleError(err)));
  }
};

export const resetPassword =
  (currentPassword, newPassword) => async (dispatch) => {
    dispatch(authRequest());
    try {
      const { data } = await axios.post(
        `${baseURL}/reset-password`,
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      dispatch(messageOnlySuccess(data.message));
    } catch (err) {
      dispatch(authFail(handleError(err)));
    }
  };

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch(logout());
};
