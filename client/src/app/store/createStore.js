import { combineReducers, configureStore } from "@reduxjs/toolkit";
import regUserReducer from "./regUser";
import callsReducer from "./calls";
import usersReducer from "./users";

const rootReducer = combineReducers({
  users: usersReducer,
  calls: callsReducer,
  regUser: regUserReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
