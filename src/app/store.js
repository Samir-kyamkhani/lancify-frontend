import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import clientReducer from "../slices/clientSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clientData: clientReducer,
  },
});
