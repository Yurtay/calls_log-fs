import { createSlice } from "@reduxjs/toolkit";
import callService from "../services/call.service";

const callsSlice = createSlice({
  name: "calls",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    callsRequested: (state) => {
      state.isLoading = true;
    },
    callsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    callsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: callsReducer, actions } = callsSlice;
const { callsRequested, callsReceved, callsRequestFailed } = actions;

export const loadCallsList = () => async (dispatch) => {
  dispatch(callsRequested());
  try {
    const { content } = await callService.get();
    dispatch(callsReceved(content));
  } catch (error) {
    dispatch(callsRequestFailed(error.message));
  }
};

export const getCalls = () => (state) => state.calls.entities;
export const getCallsLoadingStatus = () => (state) => state.calls.isLoading;

export default callsReducer;
