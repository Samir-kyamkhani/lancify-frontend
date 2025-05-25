import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import clientReducer from "../slices/clientSlice.js";
import projectReducer from "../slices/projectSlice.js";
import taskReducer from "../slices/taskSlice.js";
import proposalReducer from "../slices/proposalSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clientData: clientReducer,
    projectData: projectReducer,
    taskData: taskReducer,
    proposalData: proposalReducer,
  },
});
