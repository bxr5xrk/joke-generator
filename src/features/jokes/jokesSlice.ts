import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface productsState {
    currentPage: number;
}

const initialState: productsState = {
    currentPage: 1
};

export const jokesSlice = createSlice({
    name: 'jokes',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
    }
});

export const {
    // setCurrentPage,
} = jokesSlice.actions;

export const selectProducts = (state: RootState) => state.products;

export default jokesSlice.reducer;
