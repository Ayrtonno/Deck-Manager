import {
  buildCreateApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),

  //serve a dire che stiamo mutando USER
  tagTypes: ["user"],
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
      invalidatesTags: ["user"]
    }),

    getLogout: builder.mutation({
      query: () => "logout",
      invalidatesTags: ["user"]
    }),

    getUserInfo: builder.query({
      query: () => "user-info",
      keepUnusedDataFor: 1,
      invalidatesTags: ["user"]
    })
  }),
});

export const { usePostLoginMutation, useGetUserInfoQuery, useGetLogoutMutation } = userApi 