import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
    reducer: {
        // [productsApi.reducerPath]: productsApi.reducer,
        // products: productsSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            // productsApi.middleware,
        ])
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
