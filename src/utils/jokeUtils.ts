import { useAppSelector } from '@/app/store';
import type { Joke } from '@/features/jokes/jokesInterfaces';
import { selectJokes } from '@/features/jokes/jokesSlice';

export const isJokeInArray = (jokeId: number) => {
    const { jokes } = useAppSelector(selectJokes);

    return jokes.map((i) => i.id).includes(jokeId);
};

export const replaceJoke = (
    jokes: Joke[],
    replaceJokeId: number,
    newJoke: Joke
) =>
    jokes.map((i) => {
        if (replaceJokeId === i.id) {
            return newJoke;
        }
        return i;
    });
