import React from 'react';

import isUserRoleDiver from '../logic/isUserRoleDiver';

const HomeDiver = ({ user }) => {
    console.log('HomeDiver -> render')
    return (
        <div>
            <h1>Hi, diver {user.name}</h1>
            {isUserRoleDiver(user.role) ? <CenterHome user={user} /> : <DiverHome user={user} />}

            <Button onClick={() => handlePersonalInformation('personal-info')}>Personal Information</Button>

            <Button onClick={() => handlePersonalDocument('docs-and-insurance')}>Documents & Insurance</Button>

            <Button onClick={() => handleNewDive('log-new-dive')}>Log a New Dive</Button>

            <Button onClick={() => handleLogBook('check-logbook')}>Dive's History</Button>
        </div>
    )
}

export default HomeDiver