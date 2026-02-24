import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userEmail: null,
    token: null,
    lastLogin: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.userEmail = action.payload.email;
      state.token = action.payload.token;
      state.lastLogin = new Date().toISOString();
    },
    loginFailure(state) {
      state.isAuthenticated = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userEmail = null;
      state.token = null;
      state.lastLogin = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
