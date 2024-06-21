import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      token: null,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    userRegister: {},
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      const { dataUser } = action;
      state.login.isFetching = false;
      state.login.currentUser = dataUser.data.user;
      state.login.token = dataUser.token;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    updateSuccess: (state, action) => {
      const { formData } = action.payload;
      state.login.isFetching = false;
      state.login.currentUser = formData;
      state.login.error = false;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action) => {
      const { formRegis } = action;
      state.userRegister = formRegis;
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    logOutSuccess: (state, action) => {
      const { userData } = action;
      state.login.isFetching = false;
      state.login.currentUser = userData;
      state.login.token = null;
      state.login.error = false;
    },
    logOutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    logOutStart: (state) => {
      state.login.isFetching = true;
    },
  },
});

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logOutStart,
  logOutSuccess,
  logOutFailed,
  updateSuccess,
} = authSlice.actions;

export default authSlice.reducer;
