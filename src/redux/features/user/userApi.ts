import baseApi from "../../api/baseApi";
import { TUser } from "../authentication/authSlice";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query) => ({
        url: "/api/users",
        method: "GET",
        params: query,
      }),
      providesTags: ["Users"],
    }),

    getSingleUser: builder.query({
      query: (userEmail: string) => ({
        url: `/api/users/${userEmail}`,
        method: "GET",
      }),
      providesTags: ["Single-user"],
    }),

    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `/api/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: ({
        userId,
        payload,
      }: {
        userId: string;
        payload: Partial<TUser>;
      }) => ({
        url: `/api/users/${userId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Single-user", "Users"],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
