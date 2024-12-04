import React from 'react';
import { Button } from './library';
import isUserRoleDiver from '../logic/isUserRoleDiver';

const HomeDiver = () => {
    console.log('home-diver -> render')
    return (
        <div>
            <h1>Hi, diver</h1>
            <Button onClick={() => handlePersonalInformation('personal-info')}>Personal Information</Button>

            <Button onClick={() => handlePersonalDocument('docs-and-insurance')}>Documents & Insurance</Button>

            <Button onClick={() => handleNewDive('log-new-dive')}>Log a New Dive</Button>

            <Button onClick={() => handleLogBook('check-logbook')}>Dive's History</Button>
        </div>
    )
}

export default HomeDiver