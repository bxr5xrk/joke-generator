import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout';
import JokesPage from './pages/JokesPage';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <JokesPage />
            }
        ]
    }
]);
