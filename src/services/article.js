import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://web-production-cecc.up.railway.app/api/articles/' }),
  endpoints: (builder) => ({
    getArticlesByIssueId: builder.query({
      query: queryArg => ({
        method: 'POST',
        body: queryArg.searchAndFilters,
      }),
    }),
    getArticleById: builder.query({
      query: queryArg => ({
        method: 'POST',
        url: `logs/read`,
        body: queryArg.inputLogs,
      }),
    })
  }),
});

export const searchAndFilters = {
  input: "",
};

export const inputLogs = {
  author_id: "",
  article_id: ""
};

export const { useGetArticlesByIssueIdQuery, useGetArticleByIdQuery } = articleApi;
