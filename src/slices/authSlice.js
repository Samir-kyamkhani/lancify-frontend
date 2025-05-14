import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../baseURL";

const initialState = {
  signup: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  login: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isLoading: false,
  error: null,
  success: null,
  otpVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    signupSuccess: (state, action) => {
      state.isLoading = false;
      state.signup = action.payload;
      state.success = "Signup successful. Please verify OTP.";
    },
    signupFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    verifyOtpSuccess: (state) => {
      state.otpVerified = true;
      state.success = "OTP Verified. Account created!";
    },
    verifyOtpFail: (state, action) => {
      state.error = action.payload;
    },
    googleSignupSuccess: (state, action) => {
      state.isLoading = false;
      state.signup = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));

      state.success = "Google signup successful. Account created!";
    },
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.login = action.payload;
      state.success = "Login successfull.";
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signupRequest,
  signupSuccess,
  signupFail,
  verifyOtpSuccess,
  verifyOtpFail,
  googleSignupSuccess,
  loginRequest,
  loginSuccess,
  loginFail,
} = authSlice.actions;

export default authSlice.reducer;

// Normal email signup
export const signup = (userData) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/users/auth/signup`,
      userData
    );
    dispatch(signupSuccess(response.data));
  } catch (err) {
    const error = err.response?.data?.message || err.message || "Signup failed";
    dispatch(signupFail(error));
  }
};

// OTP verification
export const verifyOtp = (email, otp) => async (dispatch) => {
  try {
    await axios.post(`${baseURL}/api/v1/users/auth/verify-otp`, { email, otp });
    dispatch(verifyOtpSuccess());
  } catch (err) {
    dispatch(verifyOtpFail("Invalid or expired OTP."));
  }
};

// Google signup using ID token
export const googleSignup = (googleId) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const response = await axios.post(`${baseURL}/api/v1/users/auth/signup`, {
      googleId: googleId,
    });

    dispatch(googleSignupSuccess(response.data));
  } catch (err) {
    const error =
      err.response?.data?.message || err.message || "Google signup failed";
    dispatch(signupFail(error));
  }
};

// login
export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/users/auth/login`,
      userData
    );
    dispatch(loginSuccess(response.data));
  } catch (err) {
    const error = err.response?.data?.message || err.message || "login failed";
    dispatch(loginFail(error));
  }
};
