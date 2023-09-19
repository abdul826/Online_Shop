import { PRODUCTS_URL, UPLOAD_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: ({keyword,pageNumber})=>({
                url : PRODUCTS_URL,
                params:{
                    keyword,
                    pageNumber,
                },
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
        deleteProduct: builder.mutation({
            query: (id)=>({
                url : PRODUCTS_URL + "/" + id,
                method:'DELETE',
            }),
        }),
        createReview: builder.mutation({
            query: (data)=>({
                url : PRODUCTS_URL+ "/" + data.productId + "/reviews",
                method:'POST',
                body: data,
            }),
            invalidatesTags:['Product']
        }),
        getTopProducts : builder.query({
            query : ()=>({
                url : PRODUCTS_URL + "/top"
            }),
            keepUnusedDataFor: 5
        }),
    }),
})

export const {
    useGetProductsQuery,useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, 
    useDeleteProductMutation, useCreateReviewMutation, useGetTopProductsQuery
  } = productsApiSlice;