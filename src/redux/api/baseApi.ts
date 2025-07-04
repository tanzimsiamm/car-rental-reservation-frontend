import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    // baseUrl: "https://car-rental-backend-drab-sigma.vercel.app",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: [
    "Cars",
    "Single-car",
    "Users",
    "Single-user",
    "Bookings",
    "Single-booking",
    "Statistics",
  ],
  endpoints: () => ({}),
});

export default baseApi;
