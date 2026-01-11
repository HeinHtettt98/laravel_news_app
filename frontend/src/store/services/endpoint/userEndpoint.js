import { api } from "../api";

const userEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => "me",
      providesTags: ["User"],
    }),
    newsByUser: builder.query({
      query: (arg) => "user/news?" + arg,
      providesTags: ["User", "News"],
    }),
    register: builder.mutation({
      query: (arg) => ({
        url: "user/register",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["User", "News"],
    }),
    login: builder.mutation({
      query: (arg) => ({
        url: "user/login",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (arg) => ({
        url: "user/update-profile",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
      invalidatesTags: ["User", "News"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useNewsByUserQuery
} = userEndpoint;
