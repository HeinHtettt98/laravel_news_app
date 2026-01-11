import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import userSlice from "./services/slice/userSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
