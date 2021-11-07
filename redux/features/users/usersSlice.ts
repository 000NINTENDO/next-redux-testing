import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: () => {},
  },
});

export const actions = usersSlice.actions;

const usersReducer = usersSlice.reducer;
export default usersReducer;
