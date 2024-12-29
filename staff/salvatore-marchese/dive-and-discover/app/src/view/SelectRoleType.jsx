import React from 'react';
import { Button } from './library'
import { useNavigate } from 'react-router-dom';

const SelectRoleType = () => {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        if (role === 'diver') {
            navigate('/register-diver')
        } else if (role === 'center') {
            navigate('/register-center')
        }
    };


    return <main>
        <div
            className="flex flex-col justify-center items-center h-screen gap-4 bg-gray-50 mt-3"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1503703796045-3b073bd4b539?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlYWNoJTIwZnJvbSUyMGFib3ZlfGVufDB8fDB8fHwy')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >

            <h1>Are you a Diver or Center?</h1>

            <Button onClick={() => handleRoleSelection('diver')}>
                I am a Diver
            </Button>
            <Button onClick={() => handleRoleSelection('center')}>
                I am a Center
            </Button>
        </div>
    </main>
}

export default SelectRoleType;