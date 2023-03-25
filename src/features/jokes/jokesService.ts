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
            query: () => 'random_ten'
        }),
        getRandomJoke: builder.query<Joke, unknown>({
            query: () => 'random_joke'
        })
    })
});

const { useGetTenJokesQuery, useLazyGetRandomJokeQuery } = jokesApi;

export { useGetTenJokesQuery, useLazyGetRandomJokeQuery };
