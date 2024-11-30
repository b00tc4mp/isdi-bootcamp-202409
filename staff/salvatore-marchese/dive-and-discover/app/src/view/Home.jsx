import React from 'react';

import isUserRoleDiver from '../logic/isUserRoleDiver';


const Home = ({ user }) => {
    return (
        <div>
            <h1>Hi, {user.name}</h1>
            {isUserRoleDiver(user.role) ? <CenterHome user={user} /> : <DiverHome user={user} />}
        </div>
    );
};

const CenterHome = ({ user }) => (
    <div>
        <h2>Hi, Dive-Center {user.name}</h2>
    </div>
);

const DiverHome = ({ user }) => (
    <div>
        <h2>Hi, Diver {user.name}</h2>
    </div>
);

export default Home;