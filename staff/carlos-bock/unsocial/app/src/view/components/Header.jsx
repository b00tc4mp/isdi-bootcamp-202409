import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { ThemeButton } from '.'
import { Button } from '../library';

import logic from '../../logic';

import useContext from '../useContext';

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null);

    const location = useLocation()

    const { alert, confirm } = useContext()

    useEffect(() => {
        console.log('Header -> componentDidMount and componentWillRecieveProps');

        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName()
                        .then(setName)
                        .catch(error => {
                            alert(error.message)

                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message);

                    console.error(error);
                }
        } else setName(null);
    }, [location.pathname]); //previously view

    const handleHomeClick = event => {
        event.preventDefault();

        onHomeClick();
    };

    const handleLogout = () => {
        confirm('Logout?', accepted => {
            if (accepted) {
                logic.logoutUser()

                onLoggedOut()
            }
        }, 'warn')
    }
    console.log('Header -> render');

    return <header className='dark:bg-[var(--back-color-dark)] bg-[var(--back-color)] p-4 h-12 box-border flex justify-between items-center fixed top-0 w-full'>
        <h1>{location.pathname === '/new-post' ? <a href='' onClick={handleHomeClick}>unSocial</a> : 'unSocial'}</h1>

        {name && <h3 className='dark:text-white'>{name}</h3>}

        <ThemeButton />

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header>
};
