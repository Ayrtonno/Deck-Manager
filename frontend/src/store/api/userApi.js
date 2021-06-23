import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080", credentials: "include" }),
  // keepUnusedDataFor: 0,
  // serve a dire che stiamo mutando USER
  tagTypes: ["User"],
  endpoints: (builder) => ({
    //query interroga,  mutation muta delle informazioni
    postLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        //passiamo il method perche esistono tanti metodi http e dobbiamo specificare quale usare, di default è GET
        method: "POST",
        body: { email, password },
      }),
      // stiamo specificando che il login modifica user
      invalidatesTags: ["User"],
      transformResponse: ({ user }) => user,
    }),
    getLogout: builder.mutation({
      query: () => "logout",
      invalidatesTags: ["User"],
    }),
    getUserInfo: builder.query({
      query: () => "user-info",
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: ({ user }) => user,
      // Questo serve a dire "Io mi occupo di User"
      providesTags: ["User"],
    })
  }),
});

export const { usePostLoginMutation, useGetUserInfoQuery, useGetLogoutMutation } = userApi
