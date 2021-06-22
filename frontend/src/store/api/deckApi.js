import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// createApi è una funzione che ci prepara lo store per interrogare una Apa (quindi il nostro backend)
export const deckApi = createApi({
  // qui gli diamo un nome
  reducerPath: "deckApi",
  // gli stiamo dicendo di costruire le query a partire da local host 8080
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  // endpoints sono quelli che creano le azioni
  endpoints: (builder) => ({
    // dall'azione getDeckList, con builder.query spieghiamo dove andare a prendere le informazioni 
    getDeckList: builder.query({
      //qui stiamo dicendo al builder cosa deve prendere e dove metterlo
        query: (limit) => `deck?limit=${limit}`,
    }),
    getDeckListByPrice: builder.query({
        query: ({limit, sort}) => `deck?limit=${limit}&price=${sort}`,
    }),
    getDeckListByPopular: builder.query({
      // qui non passiamo parametri
        query: () => `popular-decks`,
    }),
    getDeckByInfo: builder.query({
        query: (deckId) => `deck/${deckId}/card`,
    }),
  }),
})

// a partire dagli endpoint mi crea questi hook vvvvvm perche io non uso direttamente un endpoint altrimenti perdere info
export const { useGetDeckListQuery, useGetDeckListByPopularQuery, useGetDeckListByPriceQuery, useGetDeckByInfoQuery } = deckApi


/* Prossime cose: persistere tra sessioni lo store
configurare prettier e easylimit (uno dei due SOLO SU BACKEND)
un poco di TYPESCRIPT*/
