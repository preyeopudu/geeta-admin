import { createSlice } from "@reduxjs/toolkit";

interface RootState {
  app: {
    isLoading: boolean;
    auth: boolean;
  };
}

const initialState = {
  auth: false,
  isLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoading: (
      state: { isLoading: boolean },
      action: { payload: boolean }
    ) => {
      state.isLoading = action.payload;
    },
    setAuth: (state: { auth: boolean }, action: { payload: boolean }) => {
      state.auth = action.payload;
    },
  },
});

export type { RootState };

export const { setAuth, setIsLoading } = appSlice.actions;

export default appSlice.reducer;
