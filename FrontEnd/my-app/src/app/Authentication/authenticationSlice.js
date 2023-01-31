import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "./authAPI";
import { getUser, updateUser, getProfile } from "../User/userAPI";
import jwt_decode from "jwt-decode";

// State - data (init)
const initialState = {
  // from user model
  id: "",
  userName: "",
  email: "",
  token: "",
  refresh: "",
  logged: false,
  staff: false,
  superuser: false,
  firstName: "",
  lastName: "",
  // from profile model
  phone: "",
  adress: "",
  gender: "",
};

// async (1)
// simple async method (component can call it...)

export const doLoginAsync = createAsyncThunk("auth/login", async (data) => {
  // console.log(data.password);
  const response = await login(data);
  localStorage.setItem("user", response.data.refresh);
  return response.data;
});

export const doRegisterAsync = createAsyncThunk(
  "auth/register",
  async (newData) => {
    console.log(newData);
    const response = await register(newData);
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token = "";
      state.logged = false;
      state.userName = "";
      state.email = "";
      state.staff = false;
      state.superuser = false;
      localStorage.clear();
      console.log("logged " + state.logged);
    },

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
      .addCase(doLoginAsync.fulfilled, (state, action) => {
        if (action.payload.access) {
          state.token = action.payload.access;
          state.refresh = action.payload.refresh;
          state.logged = true;
          state.id = jwt_decode(action.payload.access).id;
          state.userName = jwt_decode(action.payload.access).username;
          state.email = jwt_decode(action.payload.access).email;
          state.staff = jwt_decode(action.payload.access).staff;
          state.superuser = jwt_decode(action.payload.access).superuser;
          state.firstName = jwt_decode(action.payload.access).first_name;
          state.lastName = jwt_decode(action.payload.access).last_name;
          state.phone = jwt_decode(action.payload.access).phone;
          state.adress = jwt_decode(action.payload.access).adress;
          state.gender = jwt_decode(action.payload.access).gender;
          console.log("logged " + state.logged);

          // consider wich parts we want to show
        }
      })
      .addCase(doRegisterAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.access) {
          console.log("sign up successfully");
        }
      });
  },
});

// export sync method
export const { logout } = loginSlice.actions;

// export any part of the state
export const selectUserId = (state) => state.auth.id;
export const selectLogged = (state) => state.auth.logged;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectToken = (state) => state.auth.token;
export const selectRefreshToken = (state) => state.auth.refresh;
export const selectStaff = (state) => state.auth.staff;
export const selectSuperUser = (state) => state.auth.superUser;
export const selectFirstName = (state) => state.auth.firstName;
export const selectLastName = (state) => state.auth.lastName;
export const selectPhone = (state) => state.auth.phone;
export const selectAdress = (state) => state.auth.adress;
export const selectGender = (state) => state.auth.gender;
export const selectUserList = (state) => state.auth.userList;
// export const selectSingleUser = (state) => state.auth.singleUser;
export const selectProfileList = (state) => state.auth.profileList;
// export const selectSingleProfile = (state) => state.auth.singleProfile;

// export the reducer to the applicaion
export default loginSlice.reducer;
