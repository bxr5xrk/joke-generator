import { useAppDispatch, useAppSelector } from '@/app/store';
import { JOKES_LS_KEY } from '@/config';
import type { Joke } from '@/features/jokes/jokesInterfaces';
import { selectJokes, setJokes } from '@/features/jokes/jokesSlice';
import { setToLocalStorage } from '@/utils';
import { useCallback, useMemo } from 'react';
import JokeItem from './components/JokeItem';

export default function JokeList() {
    const dispatch = useAppDispatch();
    const { pool } = useAppSelector(selectJokes);
    const { jokes } = useAppSelector(selectJokes);

    const onClickJoke = useCallback(
        (joke: Joke, action: 'add' | 'remove') => {
            const updatedJokes =
                action === 'add'
                    ? [...jokes, joke]
                    : [...jokes.filter((i) => i.id !== joke.id)];

            dispatch(setJokes(updatedJokes));
            setToLocalStorage(JOKES_LS_KEY, updatedJokes);
        },
        [jokes]
    );

    const sortedPool = useMemo(
        () =>
            [...pool].sort((i) =>
                jokes.map((i) => i.id).includes(i.id) ? -1 : 1
            ),
        [pool, jokes]
    );

    return (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedPool.map((joke) => (
                <JokeItem key={joke.id} joke={joke} onClick={onClickJoke} />
            ))}
        </ul>
    );
}
