import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import history from "../utils/history";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    error: null,
    isLoading: false,
    // dataLoaded: false,
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      // state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    userDeleteSuccessed: (state, action) => {
      state.entities = state.entities.filter((u) => u._id !== action.payload);
    },
    userCreateSuccessed: (state, action) => {
      state.entities.unshift(action.payload);
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceved,
  usersRequestFailed,
  userUpdateSuccessed,
  userDeleteSuccessed,
  userCreateSuccessed,
} = actions;

const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");
const userDeleteRequested = createAction("users/userDeleteRequested");
const userCreateRequested = createAction("users/userCreateRequested");

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    dispatch(userUpdateSuccessed(content));
    history.push("/telephonedirectory");
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};
export const createUser = (payload) => async (dispatch) => {
  dispatch(userCreateRequested());
  try {
    const { content } = await userService.create(payload);
    dispatch(userCreateSuccessed(content));
    history.push("/telephonedirectory");
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch(userDeleteRequested());
  try {
    await userService.delete(id);
    dispatch(userDeleteSuccessed(id));
    // history.push("/telephonedirectory");
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export default usersReducer;
