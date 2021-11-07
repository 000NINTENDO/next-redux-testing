import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./rootReducer";

const createStore = () => configureStore({ reducer: rootReducer });

const reduxWrapper = createWrapper(createStore);

export default reduxWrapper;
