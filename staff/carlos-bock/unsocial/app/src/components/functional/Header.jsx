import { useState, useEffect } from 'react';

import { Button } from '../library';
 
import logic from '../../logic';

import './Header.css'

export default function Header ({ view, onHomeClick, onLoggedOut }){
    const [name, setName] = useState(null);

    useEffect(()=> {
        console.log('Header -> componentDidMount and componentWillRecieveProps');

        if(logic.isUserLoggedIn()) {
            if(!name)
                try {
                    logic.getUserName((error, name) => {
                        if (error) {
                            alert(error.message);

                            console.error(error);

                            return;
                        }

                        setName(name);
                    });
                } catch (error) {
                    alert(error.message);

                    console.error(error);
                }
        } else setName(null);
    }, [view]);

    const handleHomeClick = event => {
        event.preventDefault();

        onHomeClick();
    };

    const handleLogout = () => {
        if (confirm ('Logout?')) {
            logic.logoutUser();

            onLoggedOut();
        }
    }
    console.log('Header -> render');

        return <header className='header'>
            <h1>{view === 'new-post' ? <a href='' onClick={handleHomeClick}>unSocial</a>: 'unSocial'}</h1>

            {name && <h3>{name}</h3>}

            {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
        </header>
    };