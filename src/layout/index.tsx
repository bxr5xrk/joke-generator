import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function Layout() {
    return (
        <main className="font-montserrat p-3 w-full h-screen min-h-screen space-y-3 flex flex-col touch-pan-y overflow-x-hidden overflow-y-scroll">
            <Header />

            <Outlet />
        </main>
    );
}
