import { API_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Joke } from './jokesInterfaces';

export const jokesApi = createApi({
    reducerPath: 'jokesService',
    tagTypes: ['Jokes'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        getTenJokes: builder.query<Joke[], unknown>({
            query: () => 'random_ten',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: 'Jokes', id } as const)
                          ),
                          { type: 'Jokes', id: 'LIST' }
                      ]
                    : [{ type: 'Jokes', id: 'LIST' }]
        })
    })
});

const { useGetTenJokesQuery } = jokesApi;

export { useGetTenJokesQuery };
