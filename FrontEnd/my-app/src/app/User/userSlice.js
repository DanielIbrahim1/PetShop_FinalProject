import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, updateUser, getProfile, deleteUser } from "../User/userAPI";
import jwt_decode from "jwt-decode";

// State - data (init)
const initialState = {
  // // all users
  userList: [],
  // singleUser: [],
  profileList: [],
  // singleProfile: [],
  // //  from user model
  //   id: "",
  //   userName: "",
  //   email: "",
  //   token: "",
  //   logged: false,
  //   staff: false,
  //   superuser: false,
  //   firstName: "",
  //   lastName: "",
  //   // from profile model
  //   phone: "",
  //   adress: "",
  //   gender: "",
};

// async (1)
// simple async method (component can call it...)
export const getUsersAsync = createAsyncThunk("user/getUser", async (data) => {
  //   console.log("getting user");
  const response = await getUser(data.id, data.token);
  console.log(response.data);
  return response.data;
});
export const getProfileAsync = createAsyncThunk(
  "user/getProfile",
  async (data) => {
    // console.log("getting profile");
    const response = await getProfile(data.id, data.token);
    return response.data;
  }
);
export const deleteUserAsync = createAsyncThunk(
  "user/deleteUser",
  async (newData) => {
    const response = await deleteUser(newData.id, newData.token);
    console.log(newData.token);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (newData) => {
    const response = await updateUser(
      newData.tempUser,
      newData.id,
      newData.token
    );

    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // getOneUser: (state, action) => {
    //   state.singleUser = state.userList.filter(
    //     (user) => user.id == action.payload
    //   );
    // },
    // getOneProfile: (state, action) => {
    //   state.singleProfile = state.profileList.filter(
    //     (profile) => profile.user == action.payload
    //   );
    // },
  },
  //  async  (3)
  //   happens when async done - callback
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userList = action.payload;
        // console.log(" got all users");
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.profileList = action.payload;
        // console.log(" got all profiles");
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userList = state.userList.filter((x) => x.id !== action.payload);
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "Done";
        console.log(action.payload);
      });
  },
});

// export sync method

// export any part of the state

export const selectUserList = (state) => state.user.userList;
// export const selectSingleUser = (state) => state.auth.singleUser;
export const selectProfileList = (state) => state.user.profileList;
// export const selectSingleProfile = (state) => state.auth.singleProfile;

// export the reducer to the applicaion
export default userSlice.reducer;