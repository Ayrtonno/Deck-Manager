import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const deckApi = createApi({
  reducerPath: "deckApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    getDeckList: builder.query({
        query: (limit) => `deck?limit=${limit}`,
    }),
    getDeckListByPrice: builder.query({
        query: ({limit, sort}) => `deck?limit=${limit}&price=${sort}`,
    }),
    getDeckListByPopular: builder.query({
        query: () => `popular-decks`,
    }),
    getDeckByInfo: builder.query({
        query: (deckId) => `deck/${deckId}/card`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDeckListQuery, useGetDeckListByPopularQuery, useGetDeckListByPriceQuery, useGetDeckByInfoQuery } = deckApi