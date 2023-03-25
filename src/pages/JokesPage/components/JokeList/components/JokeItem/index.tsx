/* eslint-disable @typescript-eslint/no-misused-promises */
import Button from '@/components/Button';
import type { Joke } from '@/features/jokes/jokesInterfaces';
import { useGetJoke } from '@/hooks/useGetJokes';
import { isJokeInArray } from '@/utils';
import { memo } from 'react';

interface JokeItemProps {
    pool: Joke[];
    joke: Joke;
    onClick: (joke: Joke, action: 'add' | 'remove') => void;
    setPool: (i: Joke[]) => void;
}

function JokeItem({ joke, onClick, setPool, pool }: JokeItemProps) {
    const { trigger } = useGetJoke({
        existing: pool,
        replaceId: joke.id,
        setPool
    });

    return (
        <li
            key={joke.id}
            className="group grid grid-rows-4auto grid-cols-1 gap-3 h-full font-medium justify-between border rounded-lg shadow p-4"
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
                Setup: <span className="font-normal">{joke.setup}</span>
            </h3>

            <h3 className="flex flex-col row-span-2 font-semibold">
                Punchline: <span className="font-normal">{joke.punchline}</span>
            </h3>

            <div className="opacity-0 group-hover:opacity-100 transition w-full flex justify-between">
                <Button
                    disabled={isJokeInArray(joke.id)}
                    onClick={() => onClick(joke, 'add')}
                    title="Add"
                    theme={isJokeInArray(joke.id) ? 'white' : 'primary'}
                />

                <Button
                    disabled={!isJokeInArray(joke.id)}
                    onClick={() => onClick(joke, 'remove')}
                    title="Remove"
                    theme={isJokeInArray(joke.id) ? 'primary' : 'white'}
                />

                <Button
                    onClick={async () => await trigger({})}
                    title="Refresh"
                    theme="primary"
                />
            </div>
        </li>
    );
}

export default memo(JokeItem);
