import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../baseURL";

const initialState = {
  projects: [],
  project: null,
  isLoading: false,
  error: null,
  success: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    projectRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    projectSuccess: (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
      state.error = null;
    },
    projectFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setSingleProject: (state, action) => {
      state.project = action.payload;
    },
    clearMessages: (state) => {
      state.success = null;
      state.error = null;
    },
  },
});

export const {
  projectRequest,
  projectSuccess,
  projectFail,
  setProjects,
  setSingleProject,
  clearMessages,
} = projectSlice.actions;

export default projectSlice.reducer;

// Helper to extract error message
const extractError = (err) =>
  err?.response?.data?.message || err.message || "Something went wrong.";

// ➕ Add Project
export const addProject = (projectData) => async (dispatch) => {
  dispatch(projectRequest());
  try {
    const { data } = await axios.post(
      `${baseURL}/projects/add-project`,
      projectData
    );

    dispatch(projectSuccess(data.message));
    dispatch(fetchAllProjects());
    return data;
  } catch (err) {
    const errorMsg = extractError(err);
    dispatch(projectFail(errorMsg));
    throw errorMsg;
  }
};

// 📃 Get All Projects
export const fetchAllProjects = () => async (dispatch) => {
  dispatch(projectRequest());
  try {
    const { data } = await axios.get(`${baseURL}/projects`);
    dispatch(setProjects(data.data));
    dispatch(projectSuccess("Fetched all projects"));
  } catch (err) {
    dispatch(projectFail(extractError(err)));
  }
};

// 👤 Get One Project
export const fetchSingleProject = (id) => async (dispatch) => {
  dispatch(projectRequest());
  try {
    const { data } = await axios.get(`${baseURL}/projects/${id}`);
    dispatch(setSingleProject(data.data));
    dispatch(projectSuccess("Project fetched"));
  } catch (err) {
    dispatch(projectFail(extractError(err)));
  }
};

// ✏️ Edit Project
export const editProject = (updatedData) => async (dispatch) => {
  dispatch(projectRequest());
  try {
    const { data } = await axios.put(
      `${baseURL}/projects/${updatedData.id}`,
      updatedData
    );
    dispatch(projectSuccess(data.message));
    dispatch(fetchAllProjects());
  } catch (err) {
    dispatch(projectFail(extractError(err)));
  }
};

// 🗑️ Delete Project
export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectRequest());
  try {
    const { data } = await axios.delete(
      `${baseURL}/projects/${id}`
    );
    dispatch(projectSuccess(data.message));
    dispatch(fetchAllProjects());
  } catch (err) {
    dispatch(projectFail(extractError(err)));
  }
};
