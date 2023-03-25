import { useAppSelector } from '@/app/store';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { JOKES_LIMIT } from '@/config';
import { selectJokes } from '@/features/jokes/jokesSlice';
import { useGetJokes } from '@/hooks/useGetJokes';
import { useMemo, useState } from 'react';
import JokeList from './components/JokeList';

export default function JokesPage() {
    const [limit, setLimit] = useState(JOKES_LIMIT);
    const { jokes } = useAppSelector(selectJokes);
    const { pool, isLoading, setPool } = useGetJokes({
        limit,
        existing: jokes
    });

    const sortedPool = useMemo(
        () =>
            pool.sort((i) => (jokes.map((i) => i.id).includes(i.id) ? -1 : 1)),
        [pool, jokes]
    );

    return (
        <main className="w-full flex items-center justify-center">
            <div className="max-w-4xl h-full space-y-3">
                <JokeList jokes={sortedPool} setPool={setPool} />

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
