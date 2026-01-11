import { api } from "../api";

const categoryEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "category",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryEndpoint;
