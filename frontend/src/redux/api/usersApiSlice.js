import { apiSlice } from "./apiSlice.js"
import SummaryApi from '../../common/index.js'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

     login: builder.mutation({
       query: (data) => ({
         url: SummaryApi.sign_in.url,
         method: SummaryApi.sign_in.method,
         body: data
       })
     }),

     logout: builder.mutation({
       query: () => ({
          url: SummaryApi.logoutUser.url,
          method: SummaryApi.logoutUser.method
       })
     }),

     register: builder.mutation({
       query: (data) => ({
           url: SummaryApi.sign_up.url,
           method: SummaryApi.sign_up.method,
           body: data
       })
     }),
     
     updateProfile: builder.mutation({
       query: (data) => ({
          url: SummaryApi.updateUserProfile.url,
          method: SummaryApi.updateUserProfile.method,
          body: data
       })
     }),

     getUsers: builder.query({
       query: () => ({
          url: SummaryApi.allUsers.url,
          method: SummaryApi.allUsers.method
       }),
       provideTags: ['User'],
       keepUnusedDataFor: 5
     }),

     deleteUser: builder.mutation({
       query: (userId) => ({
          url: `${SummaryApi.deleteUser.url}/${userId}`,
          method: SummaryApi.deleteUser.method
       })
     }),
      
     getUserDetails: builder.mutation({
       query: (id) => ({
           url: `${SummaryApi.getUser.url}/${id}`,
           method: SummaryApi.getUser.method
       }),
       keepUnusedDataFor: 5,
     }),

     updateUser: builder.mutation({
       query: (data) => ({
         url: `${SummaryApi.updateUser.url}/${data.userId}`,
         method: SummaryApi.updateUser.method,
         body: data
       }),
       invalidatesTags: ['User']
     })

  }),
  
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsMutation,
    useUpdateUserMutation
} = userApiSlice