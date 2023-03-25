import { useAppSelector } from '@/app/store';
import { selectJokes } from '@/features/jokes/jokesSlice';

// compare classNames
export const cl = (...classes: Array<string | undefined | boolean | null>) => {
    return classes.filter((i) => Boolean(i) && typeof i === 'string').join(' ');
};

export const setToLocalStorage = <T>(key: string, value: T) =>
    localStorage.setItem(key, JSON.stringify(value));

export const isJokeInArray = (jokeId: number) => {
    const { jokes } = useAppSelector(selectJokes);

    return jokes.map((i) => i.id).includes(jokeId);
};
