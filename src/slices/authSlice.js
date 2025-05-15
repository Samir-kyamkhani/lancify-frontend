import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../baseURL";

// Get initial user from localStorage
const initialUser = JSON.parse(localStorage.getItem("user") || "null");

const initialState = {
  user: initialUser,
  isLoading: false,
  error: null,
  success: null,
  otpVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Common requests
    authRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    // Signup
    signupSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.success = "Please verify OTP.";
    },
    signupFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // OTP Verification
    verifyOtpSuccess: (state) => {
      state.isLoading = false;
      state.otpVerified = true;
      state.success = "OTP Verified. Account created!";
      state.error = null;
    },
    verifyOtpFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Login
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.success = "Login successful.";
      state.error = null;
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Google Auth
    googleSignupSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.success = "Google signup successful.";
      state.error = null;
    },
    googleLoginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.success = "Google login successful.";
      state.error = null;
    },
    // Misc
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
    logout: (state) => {
      state.user = null;
      state.otpVerified = false;
      state.error = null;
      state.success = null;
      state.isLoading = false;
      localStorage.removeItem("user");
    },
  },
});

export const {
  authRequest,
  signupSuccess,
  signupFail,
  verifyOtpSuccess,
  verifyOtpFail,
  loginSuccess,
  loginFail,
  googleSignupSuccess,
  googleLoginSuccess,
  clearMessages,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

// Helpers
const handleError = (err) =>
  err.response?.data?.message || err.message || "An error occurred.";

// ==== Thunks ====

// Signup with email
export const signup = (userData) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(
      `${baseURL}/api/v1/users/auth/signup`,
      userData
    );
    dispatch(signupSuccess(data));
  } catch (err) {
    dispatch(signupFail(handleError(err)));
  }
};

// Verify OTP
export const verifyOtp = (email, otp) => async (dispatch, getState) => {
  dispatch(authRequest());
  try {
    await axios.post(`${baseURL}/api/v1/users/auth/verify-otp`, { email, otp });
    dispatch(verifyOtpSuccess());
    const { auth } = getState();
    if (auth.user) {
      localStorage.setItem("user", JSON.stringify(auth.user));
    }
  } catch (err) {
    dispatch(verifyOtpFail("Invalid or expired OTP."));
  }
};

// Google signup
export const googleSignup = (googleIdToken) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(`${baseURL}/api/v1/users/auth/signup`, {
      googleId: googleIdToken,
    });
    dispatch(googleSignupSuccess(data));
    localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    dispatch(signupFail(handleError(err)));
  }
};

// Login with email
export const login = (userData) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(
      `${baseURL}/api/v1/users/auth/login`,
      userData
    );
    dispatch(loginSuccess(data));
    localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    dispatch(loginFail(handleError(err)));
  }
};

// Google login
export const googleLogin = (googleIdToken) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const { data } = await axios.post(`${baseURL}/api/v1/users/auth/login`, {
      googleId: googleIdToken,
    });
    dispatch(googleLoginSuccess(data));
    localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    dispatch(signupFail(handleError(err)));
  }
};

// Logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch(logout());
};
