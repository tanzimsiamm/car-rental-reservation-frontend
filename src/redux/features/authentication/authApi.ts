import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/api/auth/signin",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
