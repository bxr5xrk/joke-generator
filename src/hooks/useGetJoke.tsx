import { useAppDispatch, useAppSelector } from '@/app/store';
import { useLazyGetRandomJokeQuery } from '@/features/jokes/jokesService';
import { selectJokes, setPool } from '@/features/jokes/jokesSlice';
import { replaceJoke } from '@/utils/jokeUtils';
import { useEffect } from 'react';

export const useGetJoke = ({ replaceId }: { replaceId: number }) => {
    const dispatch = useAppDispatch();
    const { pool } = useAppSelector(selectJokes);
    const [trigger, { data: newJoke, isFetching, isLoading }] =
        useLazyGetRandomJokeQuery({});

    useEffect(() => {
        if (newJoke) {
            const isJokeExists = pool.find((i) => i.id === newJoke.id);

            if (isJokeExists) {
                void trigger({});
            } else {
                dispatch(setPool([...replaceJoke(pool, replaceId, newJoke)]));
            }
        }
    }, [newJoke]);

    return { trigger, isLoading: isLoading || isFetching };
};
