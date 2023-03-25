import { API_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'jokesService',
    tagTypes: ['Jokes'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        // getPaginatedProducts: builder.query<
        //     IGetPaginatedProductsRes,
        //     IGetPaginatedProductsParams
        // >({
        //     query: ({ page, query, brands, categories, priceRange }) => {
        //         const _query = query.length > 0 ? `q=${query ?? ''}` : '';
        //         const pagination = `&page=${page}&limit=${LIMIT_ITEMS}`;
        //         const _brands =
        //             brands.length > 0 ? `&${brands.replaceAll(' ', '_')}` : '';
        //         const _categories =
        //             categories.length > 0
        //                 ? `&${categories.replaceAll(' ', '_')}`
        //                 : '';
        //         const _priceRange = `&${priceRange}`;
        //         return `products?${_query}${pagination}${_brands}${_categories}${_priceRange}`;
        //     },
        //     transformResponse: (apiResponse: IProduct[], meta) => {
        //         return {
        //             products: apiResponse,
        //             totalCount: Number(
        //                 meta?.response?.headers.get('X-Total-Count')
        //             )
        //         };
        //     },
        //     providesTags: (result) =>
        //         result
        //             ? [
        //                   ...result.products.map(
        //                       ({ id }) => ({ type: 'Products', id } as const)
        //                   ),
        //                   { type: 'Products', id: 'LIST' }
        //               ]
        //             : [{ type: 'Products', id: 'LIST' }]
        // }),
        // createProduct: builder.mutation<unknown, ICreateProductProps>({
        //     query: ({
        //         title,
        //         price,
        //         rating,
        //         categoryName,
        //         brandName,
        //         images
        //     }) => ({
        //         url: 'products',
        //         method: 'POST',
        //         body: {
        //             title,
        //             price,
        //             rating,
        //             categoryName,
        //             brandName,
        //             images
        //         }
        //     }),
        //     invalidatesTags: [{ type: 'Products', id: 'LIST' }]
        // })
    })
});

const {
    // useGetBrandsQuery: useGetBrands,
} = productsApi;

export // useDeleteProduct
 {};
