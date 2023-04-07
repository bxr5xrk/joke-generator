import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { JOKES_LIMIT } from '@/config';
import { useGetJokes } from '@/hooks/useGetJokes';
import { useState } from 'react';
import JokeList from './components/JokeList';

export default function JokesPage() {
    const [limit, setLimit] = useState(JOKES_LIMIT);
    const { isLoading } = useGetJokes({
        limit
    });

    return (
        <main className="flex w-full items-center justify-center pb-3">
            <div className="h-full max-w-4xl space-y-3">
                <JokeList />

                {isLoading ? <Spinner /> : null}

                <div className="flex w-full justify-center">
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
