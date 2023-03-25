import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import jokesSlice from '@/features/jokes/jokesSlice';
import { jokesApi } from '@/features/jokes/jokesService';

export const store = configureStore({
    reducer: {
        jokes: jokesSlice,
        [jokesApi.reducerPath]: jokesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([jokesApi.middleware])
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
