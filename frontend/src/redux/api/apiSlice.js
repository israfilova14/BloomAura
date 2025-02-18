import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'
const backendDomen = 'https://bloomaura-backend.onrender.com'

const baseQuery = fetchBaseQuery({
  baseUrl: backendDomen,
  credentials: 'include'
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User', 'Category'],
  endpoints: () => ({})
})
