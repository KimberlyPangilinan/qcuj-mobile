import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recommendationApi = createApi({
  reducerPath: 'recommendationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://web-production-cecc.up.railway.app/api/recommendations/' }),
  endpoints: (builder) => ({
    getRecommendationsBasedHistory: builder.query({
      query: queryArg => ({
        method: 'GET',
        url: `${queryArg}`,
      })
    }),
    getRecommendationsBasedCategory: builder.query({
      query: queryArg => ({
        method: 'POST',
        body: {
          category : `${queryArg}`
        },
      }),
    }),
  }),
});


export const { useGetRecommendationsBasedHistoryQuery,useGetRecommendationsBasedCategoryQuery } = recommendationApi;
