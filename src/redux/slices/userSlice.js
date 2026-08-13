import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    allUsers: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //LOGIN PROCESS
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //LOGOUT PROCESS
    logOutStart: (state) => {
      state.isFetching = true;
    },
    logOutSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
      state.allUsers = null;
    },

    //GET ALL USER
    getUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.allUsers = action.payload;
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //DELETE USERS
    deleteUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.allUsers.splice(
        state.allUsers.findIndex((item) => item._id === action.payload),
        1,
      );
    },
    deleteUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //UPDATE USERS
    updateUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.allUsers[
        state.allUsers.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.updatedUser;
      console.log(action.payload.updatedUser);
    },

    updateUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //ADD USER
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.allUsers.push(action.payload);
    },

    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailure,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
} = userSlice.actions;
export default userSlice.reducer;
