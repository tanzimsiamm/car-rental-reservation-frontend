import { TBooking } from "../../../pages/Booking";
import baseApi from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (booking: TBooking) => ({
        url: "/api/bookings",
        method: "POST",
        body: booking,
      }),
      invalidatesTags: ["Bookings"],
    }),
    // only for admin
    getBookings: builder.query({
      query: () => ({
        url: "/api/bookings",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),

    // user can dispatch this
    getUserBookings: builder.query({
      query: () => ({
        url: "/api/bookings/my-bookings",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),

    getSingleBooking: builder.query({
      query: (bookingId) => ({
        url: `/api/bookings/${bookingId}`,
        method: "GET",
      }),
      providesTags: ["Single-booking"],
    }),

    updateBooking: builder.mutation({
      query: ({
        bookingId,
        payload,
      }: {
        bookingId: string;
        payload: Partial<TBooking>;
      }) => ({
        url: `/api/bookings/${bookingId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Single-booking", "Bookings"],
    }),

    cancelBooking: builder.mutation({
      query: (payload: { bookingId: string; carId: string }) => ({
        url: `/api/bookings/cancel`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Single-booking", "Bookings", "Cars"],
    }),

    // only for admin
    getStatistics: builder.query({
      query: () => ({
        url: "/api/bookings/statistics",
        method: "GET",
      }),
      providesTags: ["Statistics"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetSingleBookingQuery,
  useGetUserBookingsQuery,
  useUpdateBookingMutation,
  useCancelBookingMutation,
  useGetStatisticsQuery,
} = bookingApi;
