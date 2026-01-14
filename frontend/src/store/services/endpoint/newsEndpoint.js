import { api } from "../api";

const newsEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (arg) => ({
        url: "news?" + arg,
        method: "GET",
      }),
      providesTags: ["News", "User"],
    }),
    store: builder.mutation({
      query: (arg) => ({
        url: "news",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["News", "User"],
    }),
    show: builder.query({
      query: (id) => ({
        url: `news/${id}`,
        method: "GET",
      }),
      providesTags: ["News", "User"],
    }),
    delete: builder.mutation({
      query: (arg) => ({
        url: `news/${arg}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News", "User"],
    }),
    comment: builder.mutation({
      query: (arg) => ({
        url: "comment",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["News", "User"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useStoreMutation,
  useShowQuery,
  useDeleteMutation,
  useCommentMutation,
} = newsEndpoint;
