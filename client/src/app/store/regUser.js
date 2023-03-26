import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import reguserService from "../services/regUser.service";
import history from "..//utils/history";
import { generateAuthError } from "../utils/generateAuthError";

const regUserSlice = createSlice({
  name: "regUser",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLoggedIn: localStorageService.getUserId() ? true : false,
    dataLoaded: false,
  },
  reducers: {
    regUserRequested: (state) => {
      state.isLoading = true;
    },
    regUserReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    regUserRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    regUserCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    regUserLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});
const { reducer: regUserReducer, actions } = regUserSlice;
const {
  regUserRequested,
  regUserReceived,
  regUserRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  regUserLoggedOut,
} = actions;

const authRequested = createAction("reguser/authRequested");

export const login =
  ({ payload }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      history.push("/");
    } catch (error) {
      console.log("error", error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    history.push("/");
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(regUserLoggedOut());
  history.push("/");
};

export const loadRegUser = () => async (dispatch) => {
  dispatch(regUserRequested());
  try {
    const { content } = await reguserService.getCurrentUser();
    dispatch(regUserReceived(content));
  } catch (error) {
    dispatch(regUserRequestFailed(error.message));
  }
};

export const getRegUserById = (userId) => (state) => {
  if (state.regUser.entities) {
    return state.regUser.entities.find((u) => u._id === userId);
  }
};
export const getRegUser = () => (state) => state.regUser.entities;
export const getIsLoggedIn = () => (state) => state.regUser.isLoggedIn;
export const getAuthErrors = () => (state) => state.regUser.error;

export default regUserReducer;
