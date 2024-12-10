import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserName from '../logic/users/getUserName'
import { Button } from './library'

const HomeDiver = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('')
    const[error, setError] = useState(null)

    useEffect(() => {
        getUserName()
          .then(name => { 
            console.log("Fetched name from getUserName:", name);// Log the fetched name to check if it's correct
            setUserName(name);
          })
          .catch(err => { 
            console.log("Error fetching user name:", error);  // Log any errors
            setError(err.message);
            navigate('/login')
          })
    }, [navigate]);

    const onViewProfileInfo = () => {
        navigate('/personal-info')
    };

    const onViewDocuments = () => {
        navigate('/docs-and-insurance')
    };

    const onLogDive = () => {
        navigate('/log-new-dive')
    };

    const onCheckHistory = () => {
        navigate('/check-logbook')
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-50 overflow-hidden">

            <h1 className="text-xl font-bold text-center mb-5">Hi, diver 🤿 {userName}</h1>
            <div className="flex flex-col justify-center items-center space-y-4">
                <Button onClick={onViewProfileInfo}>Personal Information</Button>

                <Button onClick={onViewDocuments}>Docs & Insurance</Button>

                <Button onClick={onLogDive}>Log a New Dive</Button>

                <Button onClick={onCheckHistory}>Dive's History</Button>
            </div>
        </div>
    )
}

export default HomeDiver