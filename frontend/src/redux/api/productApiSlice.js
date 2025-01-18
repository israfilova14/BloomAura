import SummaryApi from '../../common/index.js'
import {apiSlice} from './apiSlice.js'

export const productApiSlice = apiSlice.injectEndpoints({

   endpoints: (builder) => ({

        addProduct: builder.mutation({
            query: (productData) => ({
            url: SummaryApi.addProduct.url,
            method: SummaryApi.addProduct.method,
            body: productData
            }),
            invalidatesTags: ['Product']
        }),

        updateProduct: builder.mutation({
            query: ({productId, formData}) => ({
                url: `${SummaryApi.updateProduct.url}/${productId}`,
                method: SummaryApi.updateProduct.method,
                body: formData
            })
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
            url: `${SummaryApi.deleteProduct.url}/${productId}`,
            method: SummaryApi.deleteProduct.method
            }),
            providesTags: ['Product']
        }),

        currentProducts: builder.query({
            query: ({keyword}) => ({
                url: SummaryApi.currentProducts.url,
                method: SummaryApi.currentProducts.method,
                params: {keyword}
            }),

            keepUnusedDataFor: 5,
            providesTags: ['Product']
        }),

        getProductById: builder.query({
            query: (productId) => ({
                url: `${SummaryApi.getProduct.url}/${productId}`,
                method: SummaryApi.getProduct.method
            }),
            providesTags: (result, error, productId) => [
                {type: 'Product', id: productId}
            ]
        }),

        allProducts: builder.query({
            query: () => ({
                url: SummaryApi.allProducts.url,
                method: SummaryApi.allProducts.method
            })
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${SummaryApi.getProduct.url}/${productId} `,
                method: SummaryApi.getProduct.method
            }),
            keepUnusedDataFor: 5
        }),
       
        productReview: builder.mutation({
            query: (data) => ({
                url: `${SummaryApi.productReview.url}/${data.productId}`,
                method: SummaryApi.productReview.method,
                body: data
            })
        }),

        topProducts: builder.query({
            query: () => ({
                url: SummaryApi.topProducts.url,
                method: SummaryApi.topProducts.method
            }),
            keepUnusedDataFor: 5,
            
        }),

        newProducts: builder.query({
            query: () => ({
                url: SummaryApi.newProducts.url,
                method: SummaryApi.newProducts.method
            }),
            keepUnusedDataFor: 5,
        }),

        getFilteredProducts: builder.query({
             query: ({checked, radio}) => ({
                 url: SummaryApi.filteredProducts.url,
                 method: SummaryApi.filteredProducts.method,
                 body: {checked, radio}
             })
        })
   })
})

export const {
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCurrentProductsQuery,
    useGetProductByIdQuery,
    useAllProductsQuery,
    useGetProductDetailsQuery,
    useProductReviewMutation,
    useTopProductsQuery,
    useNewProductsQuery,
    useGetFilteredProductsQuery
} = productApiSlice