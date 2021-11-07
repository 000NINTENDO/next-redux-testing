import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "no user",
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: () => {},
    signUp: () => {},
  },
});

export const actions = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
