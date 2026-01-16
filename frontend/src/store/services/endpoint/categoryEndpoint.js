import { api } from "../api";

const categoryEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "category",
    }),
    storeCategory: builder.mutation({
      query: (arg) => ({
        url: "category",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["News", "User"],
    }),
  }),
});

export const { useGetCategoriesQuery, useStoreCategoryMutation } = categoryEndpoint;
