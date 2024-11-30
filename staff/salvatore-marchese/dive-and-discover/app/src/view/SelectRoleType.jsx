import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectRoleType = () => {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        if (role === 'driver') {
            navigate('/registerDiver')
        } else if (role === 'center') {
            navigate('/registerCenter')
        }
    };

    return (
        <div>
            <h1>Are you a Diver or Center?</h1>
            
            <button onClick={() => handleRoleSelection('diver')}>
                I am a Diver
            </button>
            <button onClick={() => handleRoleSelection('center')}>
                I am a Center
            </button>
        </div>
    )
}

export default SelectRoleType;