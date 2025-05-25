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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
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
        loginAsNGO: builder.mutation({
            query: (credentials) => ({
                url: "/login-ngo",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            }),
        }),
        registerAsNGO: builder.mutation({
            query: (credentials) => ({
                url: "/register-ngo",
                method: "POST",
                body: credentials,
            }),
        }),
    })  
});

export const { useLoginAsDonorMutation, useRegisterAsDonorMutation, useLoginAsNGOMutation, useRegisterAsNGOMutation } = authApi;
