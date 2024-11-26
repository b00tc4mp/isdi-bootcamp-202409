import { useState, useEffect, useContext } from 'react';

import { useLocation } from 'react-router-dom';

import { Button } from '../library';

import logic from '../../logic';

import './Header.css'

import useContext from '../useCo    ntext';

export default function Header({ view, onHomeClick, onLoggedOut }) {
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

    return <header className='Header'>
        <h1>{location.pathname === '/new-post' ? <a href='' onClick={handleHomeClick}>unSocial</a> : 'unSocial'}</h1>

        {name && <h3>{name}</h3>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header>
};
