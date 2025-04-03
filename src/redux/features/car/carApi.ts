import { TCar } from "../../../types";
import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (car: TCar) => ({
        url: "/api/cars",
        method: "POST",
        body: car,
      }),
      invalidatesTags: ["Cars"],
    }),

    getCars: builder.query({
      query: (query) => ({
        url: "/api/cars",
        method: "GET",
        params: query,
      }),
      providesTags: ["Cars"],
    }),

    getSingleCar: builder.query({
      query: (carId: string) => ({
        url: `/api/cars/${carId}`,
        method: "GET",
      }),
      providesTags: ["Single-car"],
    }),

    deleteCar: builder.mutation({
      query: (carId: string) => ({
        url: `/api/cars/${carId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),

    updateCar: builder.mutation({
      query: ({ carId, payload }: { carId: string; payload: TCar }) => ({
        url: `/api/cars/${carId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Cars", "Single-car"],
    }),

    returnCar: builder.mutation({
      query: (payload: { bookingId: string }) => ({
        url: `/api/cars/return`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Cars", "Bookings"],
    }),
  }),
});

export const {
  useCreateCarMutation,
  useGetCarsQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useGetSingleCarQuery,
  useReturnCarMutation,
} = productApi;
