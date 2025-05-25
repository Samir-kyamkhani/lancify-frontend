import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../baseURL";

const initialState = {
  tasks: [],
  task: null,
  isLoading: false,
  error: null,
  success: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    taskRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    taskSuccess: (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
      state.error = null;
    },
    taskFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setSingleTask: (state, action) => {
      state.task = action.payload;
    },
    clearMessages: (state) => {
      state.success = null;
      state.error = null;
    },
  },
});

export const {
  taskRequest,
  taskSuccess,
  taskFail,
  setTasks,
  setSingleTask,
  clearMessages,
} = taskSlice.actions;

export default taskSlice.reducer;

// Helper to extract error message
const extractError = (err) =>
  err?.response?.data?.message || err.message || "Something went wrong.";

// ➕ Add Task
export const addTask = (taskData) => async (dispatch) => {
  dispatch(taskRequest());
  try {
    const { data } = await axios.post(`${baseURL}/tasks/create-task`, taskData);
    dispatch(taskSuccess(data.message));
    dispatch(fetchAllTasks());
  } catch (err) {
    dispatch(taskFail(extractError(err)));
  }
};

// 📃 Get All Tasks
export const fetchAllTasks = () => async (dispatch) => {
  dispatch(taskRequest());
  try {
    const { data } = await axios.get(`${baseURL}/tasks/get-all-tasks`);
    dispatch(setTasks(data.data));
    dispatch(taskSuccess("Fetched all tasks"));
  } catch (err) {
    dispatch(taskFail(extractError(err)));
  }
};

// 👤 Get One Task
export const fetchSingleTask = (id) => async (dispatch) => {
  dispatch(taskRequest());
  try {
    const { data } = await axios.get(`${baseURL}/tasks/${id}`);
    dispatch(setSingleTask(data.data));
    dispatch(taskSuccess("Task fetched"));
  } catch (err) {
    dispatch(taskFail(extractError(err)));
  }
};

// ✏️ Edit Task
export const editTask = (updatedData) => async (dispatch) => {
  dispatch(taskRequest());
  try {
    const { data } = await axios.put(
      `${baseURL}/tasks/update-task/${updatedData.id}`,
      updatedData
    );
    dispatch(taskSuccess(data.message));
    dispatch(fetchAllTasks());
  } catch (err) {
    dispatch(taskFail(extractError(err)));
  }
};

// 🗑️ Delete Task
export const deleteTask = (id) => async (dispatch) => {
  dispatch(taskRequest());
  try {
    const { data } = await axios.delete(`${baseURL}/tasks/delete-task/${id}`);
    dispatch(taskSuccess(data.message));
    dispatch(fetchAllTasks()); // Refresh list
  } catch (err) {
    dispatch(taskFail(extractError(err)));
  }
};
