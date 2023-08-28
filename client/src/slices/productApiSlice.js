import { PRODUCTS_URL, UPLOAD_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: ()=>({
                url : PRODUCTS_URL,
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5
        }),
        getProductDetails:  builder.query({
            query: (productId)=>({
                url: PRODUCTS_URL + "/" + productId
            }),
            keepUnusedDataFor:5
        }),
        createProduct: builder.mutation({
            query: ()=>({
                url : `${PRODUCTS_URL}/addproduct`,
                method:'POST',
            }),
            invalidatesTags:['Product']
        }),
        updateProduct: builder.mutation({
            query: (data)=>({
                url : PRODUCTS_URL + "/" + data.productId,
                method:'PUT',
                body:data,
            }),
            invalidatesTags:['Products']
        }),
        uploadProductImage: builder.mutation({
            query: (data)=>({
                url : '/upload',
                method:'POST',
                body:data,
            }),
            invalidatesTags:['Products']
        }),
    }),
})

export const {
    useGetProductsQuery,useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation
  } = productsApiSlice;