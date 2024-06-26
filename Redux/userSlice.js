import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: null,
      isFetching: false,
      error: false,
    },
    msg: "",
    getUsersData: null,
    getAllNFTs: null,
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getUsersFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUserStart: (state) => {
      state.users.isFetching = true;
    },
    deleteUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.msg = action.payload;
    },
    deleteUserFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
      state.msg = action.payload;
    },
    getUsersData: (state, action) => {
      const { dataUsers } = action;
      state.getUsersData = dataUsers.payload;
    },
    getAllNFTs: (state, action) => {
      const { dataNFTs } = action;
      state.getAllNFTs = dataNFTs.payload;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  deleteUserStart,
  deleteUsersSuccess,
  deleteUserFailed,
  getUsersData,
  getAllNFTs,
} = userSlice.actions;

export default userSlice.reducer;
