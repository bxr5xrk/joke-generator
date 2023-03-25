import type { Joke } from '@/features/jokes/jokesInterfaces';
import {
    useGetTenJokesQuery,
    useLazyGetRandomJokeQuery
} from '@/features/jokes/jokesService';
import { useEffect, useState } from 'react';

export const useGetJokes = ({
    limit,
    existing
}: {
    limit: number;
    existing: Joke[];
}) => {
    const [pool, setPool] = useState<Joke[]>([...existing]);
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

            setPool((prev) => [...prev, ...newJokes]);

            if (pool.length < limit) {
                void refetch();
            }
        }
    }, [data]);

    return { pool, isLoading: isLoading || isFetching, setPool };
};

const replaceJoke = (jokes: Joke[], replaceJokeId: number, newJoke: Joke) =>
    jokes.map((i) => {
        if (replaceJokeId === i.id) {
            return newJoke;
        }
        return i;
    });

export const useGetJoke = ({
    existing,
    setPool,
    replaceId
}: {
    existing: Joke[];
    setPool: (i: Joke[]) => void;
    replaceId: number;
}) => {
    const [trigger, { data: newJoke }] = useLazyGetRandomJokeQuery({});

    useEffect(() => {
        if (newJoke) {
            const isJokeExists = existing.find((i) => i.id === newJoke.id);

            if (isJokeExists) {
                void trigger({});
            } else {
                setPool([...replaceJoke(existing, replaceId, newJoke)]);
            }
        }
    }, [newJoke]);

    return { trigger };
};
