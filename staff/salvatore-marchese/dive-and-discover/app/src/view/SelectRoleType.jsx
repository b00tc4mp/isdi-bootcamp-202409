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
        <div className="flex flex-col gap-2 p-20 space-y-7" >
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