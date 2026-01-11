import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let csrfReady = false;
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
    // prepareHeaders: async (headers) => {
    //   if (!csrfReady) {
    //     await fetch("http://localhost:8000/sanctum/csrf-cookie", {
    //       credentials: "include",
    //     });
    //     csrfReady = true;
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["News","User"],
  endpoints: () => ({}),
});
