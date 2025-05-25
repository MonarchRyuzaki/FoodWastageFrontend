import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`}),
    endpoints: (builder) => ({
        loginAsDonor: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        registerAsDonor: builder.mutation({
            query: (credentials) => ({
                url: "/register",
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            }),
        }),
    })  
});

export const { useLoginAsDonorMutation, useRegisterAsDonorMutation } = authApi;
