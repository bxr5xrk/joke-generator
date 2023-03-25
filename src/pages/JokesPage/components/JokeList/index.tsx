import { useAppDispatch, useAppSelector } from '@/app/store';
import { JOKES_LS_KEY } from '@/config';
import type { Joke } from '@/features/jokes/jokesInterfaces';
import { selectJokes, setJokes } from '@/features/jokes/jokesSlice';
import { setToLocalStorage } from '@/utils';
import JokeItem from './components/JokeItem';

interface JokeListProps {
    jokes: Joke[];
    setPool: (i: Joke[]) => void;
}

export default function JokeList({ jokes, setPool }: JokeListProps) {
    const dispatch = useAppDispatch();
    const { jokes: existingJokes } = useAppSelector(selectJokes);

    const onClickJoke = (joke: Joke, action: 'add' | 'remove') => {
        const updatedJokes =
            action === 'add'
                ? [...existingJokes, joke]
                : [...existingJokes.filter((i) => i.id !== joke.id)];

        dispatch(setJokes(updatedJokes));
        setToLocalStorage(JOKES_LS_KEY, updatedJokes);
    };

    return (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jokes.map((joke) => (
                <JokeItem
                    pool={jokes}
                    key={joke.id}
                    joke={joke}
                    onClick={onClickJoke}
                    setPool={setPool}
                />
            ))}
        </ul>
    );
}
