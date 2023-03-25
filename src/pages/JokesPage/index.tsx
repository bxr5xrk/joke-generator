import { useAppDispatch, useAppSelector } from '@/app/store';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { JOKES_LIMIT, JOKES_LS_KEY } from '@/config';
import type { Joke } from '@/features/jokes/jokesInterfaces';
import { selectJokes, setJokes } from '@/features/jokes/jokesSlice';
import { useGetJokes } from '@/hooks/useGetJokes';
import { isJokeInArray, setToLocalStorage } from '@/utils';
import { useState } from 'react';

export default function JokesPage() {
    const dispatch = useAppDispatch();
    const [limit, setLimit] = useState(JOKES_LIMIT);
    const { jokes } = useAppSelector(selectJokes);
    const { pool, isLoading } = useGetJokes({ limit, existing: jokes });

    console.log({ jokes, pool });

    const onClickJoke = (joke: Joke, action: 'add' | 'remove') => {
        const updatedJokes =
            action === 'add'
                ? [...jokes, joke]
                : [...jokes.filter((i) => i.id !== joke.id)];

        dispatch(setJokes(updatedJokes));
        setToLocalStorage(JOKES_LS_KEY, updatedJokes);
    };

    const sortedPool = pool.sort((i) =>
        jokes.map((i) => i.id).includes(i.id) ? -1 : 1
    );

    return (
        <main className="w-full flex items-center justify-center">
            <div className="max-w-4xl h-full space-y-3">
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedPool.map((joke) => (
                        <li
                            key={joke.id}
                            className="group grid grid-rows-4auto gap-3 h-full font-medium justify-between border rounded-lg shadow p-4"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="truncate font-semibold">
                                    Type:{' '}
                                    <span className="text-primary-500 font-medium">
                                        {joke.type}
                                    </span>
                                </h3>

                                <h3 className="truncate font-semibold text-primary-500">
                                    {`ID #${joke.id}`}
                                </h3>
                            </div>

                            <h3 className="flex flex-col row-span-2 font-semibold">
                                Setup:{' '}
                                <span className="font-normal">
                                    {joke.setup}
                                </span>
                            </h3>

                            <h3 className="flex flex-col row-span-2 font-semibold">
                                Punchline:{' '}
                                <span className="font-normal">
                                    {joke.punchline}
                                </span>
                            </h3>

                            <div className="opacity-0 group-hover:opacity-100 transition w-full flex justify-between">
                                <Button
                                    disabled={isJokeInArray(jokes, joke.id)}
                                    onClick={() => onClickJoke(joke, 'add')}
                                    title="Add"
                                    theme="primary"
                                />
                                <Button
                                    disabled={!isJokeInArray(jokes, joke.id)}
                                    onClick={() => onClickJoke(joke, 'remove')}
                                    title="Remove"
                                    theme="primary"
                                />
                                <Button title="Refetch" theme="primary" />
                            </div>
                        </li>
                    ))}
                </ul>

                {isLoading ? <Spinner /> : null}

                <div id="load-more" className="w-full flex justify-center">
                    <Button
                        onClick={() => setLimit((prev) => prev + JOKES_LIMIT)}
                        title="Load more"
                        theme="white"
                    />
                </div>
            </div>
        </main>
    );
}
