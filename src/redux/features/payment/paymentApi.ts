import baseApi from "../../api/baseApi";


const userApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        getUsers : builder.query({
            query: (query) => ({
                url : '/api/users',
                method : "GET",
                params : query,
            }),
            providesTags: ['Users']
        }),

        savePayment : builder.mutation({
            query: (payload ) => ({
                
                url : `/api/payments`,
                method : "POST", 
                body : payload,  
            }),
            // invalidatesTags: ['Single-user', 'Users' ]
        }),
    })
})

export const {
useSavePaymentMutation, } = userApi;