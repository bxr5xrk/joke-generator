import { useAppDispatch, useAppSelector } from '@/app/store';
import { useGetTenJokesQuery } from '@/features/jokes/jokesService';
import { selectJokes, setPool } from '@/features/jokes/jokesSlice';
import { useEffect } from 'react';

export const useGetJokes = ({ limit }: { limit: number }) => {
    const dispatch = useAppDispatch();
    const { pool } = useAppSelector(selectJokes);
    const { data, refetch, isLoading, isFetching } = useGetTenJokesQuery(
        {},
        { skip: pool.length === limit }
    );

    useEffect(() => {
        if (data && pool.length < limit) {
            const existingJokesLength = pool.length;

            const newJokes = data
                .filter((joke) => !pool.find((i) => i.id === joke.id))
                .slice(0, limit - existingJokesLength);

            dispatch(setPool([...pool, ...newJokes]));

            if (pool.length < limit) {
                void refetch();
            }
        }
    }, [data]);

    return { pool, isLoading: isLoading || isFetching };
};
