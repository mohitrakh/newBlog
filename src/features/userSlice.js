import { createSlice } from "@reduxjs/toolkit";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getUserFromLocalStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInEnd: (state) => {
      state.loading = false;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      addUserToLocalStorage(action.payload);
    },
    signInFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutFun: (state) => {
      state.user = null;
      state.loading = false;
      removeUserFromLocalStorage();
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailed,
  signOutFun,
  signInEnd,
} = userSlice.actions;

export default userSlice.reducer;
