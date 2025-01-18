import SummaryApi from "../../common"
import { apiSlice } from "./apiSlice"

export const categoryApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({

      createCategory: builder.mutation({
          query: (newCategory) => ({
              url: SummaryApi.createCategory.url,
              method: SummaryApi.createCategory.method,
              body: newCategory
          })
      }),
      
      updateCategory: builder.mutation({
          query: ({categoryId, updatedCategory}) => ({
              url: `${SummaryApi.updateCategory.url}/${categoryId}`,
              method: SummaryApi.updateCategory.method,
              body: updatedCategory
          })
      }),

      deleteCategory: builder.mutation({
          query: (categoryId) => ({
             url: `${SummaryApi.deleteCategory.url}/${categoryId}`,
             method: SummaryApi.deleteCategory.method
          })
      }),

       getAllCategories: builder.query({
           query: () => ({
              url: SummaryApi.allCategories.url,
              method: SummaryApi.allCategories.method
           })
       }),
   })
})

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery
} = categoryApiSlice