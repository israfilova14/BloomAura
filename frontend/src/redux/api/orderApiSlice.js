import SummaryApi from "../../common/index.js"
import { apiSlice } from "./apiSlice"

export const orderApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({

     createOrder: builder.mutation({
        query: (order) => ({
            url: SummaryApi.createOrder.url,
            method: SummaryApi.createOrder.method,
            body: order
        })
     }),

      allOrders: builder.query({
        query: () => ({
           url: SummaryApi.allOrders.url,
           method: SummaryApi.allOrders.method
        })
      }),

      userOrders: builder.query({
         query: () => ({
            url: SummaryApi.userOrders.url,
            method: SummaryApi.userOrders.method
         }),
         keepUnusedDataFor: 5
      }),

      totalOrders: builder.query({
          query: () => ({
             url: SummaryApi.totalOrders.url,
             method: SummaryApi.totalOrders.method
          })
      }),

      totalSales: builder.query({
         query: () => ({
             url: SummaryApi.totalSales.url,
             method: SummaryApi.totalSales.method
         })
      }),

      totalSalesByDate: builder.query({
          query: () => ({
              url: SummaryApi.totalSalesByDate.url,
              method: SummaryApi.totalSalesByDate.method
          })
      }),

      findOrder: builder.query({
           query: (id) => ({
               url: `${SummaryApi.findOrder.url}/${id}`,
               method: SummaryApi.findOrder.method
           })
      }),

      payOrder: builder.mutation({
          query: ({orderId, details}) => ({
             url: `${SummaryApi.markOrderAsPaid.url}/${orderId}`,
             method: SummaryApi.markOrderAsPaid.method,
             body: details
          })
      }),

      deliverOrder: builder.mutation({
           query: (orderId) => ({
              url: `${SummaryApi.markOrderAsDelivered.url}/${orderId}`,
              method: SummaryApi.markOrderAsDelivered.method
           })
      }),

      getPaypalClientId: builder.query({
          query: () => ({
             url: SummaryApi.getPayPalClientId.url,
          })
      })
   })
})

export const {
  useCreateOrderMutation,
  useAllOrdersQuery,
  useUserOrdersQuery,
  useTotalOrdersQuery,
  useTotalSalesQuery,
  useTotalSalesByDateQuery,
  useFindOrderQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useGetPaypalClientIdQuery
} = orderApiSlice