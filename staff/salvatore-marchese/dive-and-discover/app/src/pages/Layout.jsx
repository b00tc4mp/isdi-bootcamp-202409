import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../view/components/Header';

export default function Layout() {
    return(
        <div id='layout-container'>
            <Navbar/>
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    )
}
