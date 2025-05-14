import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../baseURL";

const initialState = {
  signup: {},
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
      state.success = "Google signup successful. Account created!";
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
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
  clearMessages,
} = authSlice.actions;

export default authSlice.reducer;

// Normal email signup
export const signup = (userData) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const response = await axios.post(`${baseURL}/api/v1/users/signup`, userData);
    dispatch(signupSuccess(response.data));
  } catch (err) {
    const error = err.response?.data?.message || err.message || "Signup failed";
    dispatch(signupFail(error));
  }
};

// OTP verification
export const verifyOtp = (email, otp) => async (dispatch) => {
  try {
    await axios.post(`${baseURL}/api/v1/users/verify-otp`, { email, otp });
    dispatch(verifyOtpSuccess());
  } catch (err) {
    dispatch(verifyOtpFail("Invalid or expired OTP."));
  }
};

// Google signup using ID token
export const googleSignup = ({ googleId, name }) => async (dispatch) => {
  console.log(googleId, name);
  
  dispatch(signupRequest());
  try {
    const response = await axios.post(`${baseURL}/api/v1/users/signup`, {
      googleId,
      name,
    });
    dispatch(googleSignupSuccess(response.data));
  } catch (err) {
    const error = err.response?.data?.message || err.message || "Google signup failed";
    dispatch(signupFail(error));
  }
};
