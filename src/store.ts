// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import appslice from "./features/app_slice";

const store = configureStore({
  reducer: {
    app: appslice,
  },
  // Other middleware and options can be added here
});

export default store;
