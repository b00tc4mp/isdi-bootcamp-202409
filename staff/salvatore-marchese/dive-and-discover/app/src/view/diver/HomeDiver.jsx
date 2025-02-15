import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserName from '../../logic/users/getUserName'
import { Button } from '../library'

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
            console.log(err)
            console.log("Error fetching user name:", error);  // Log any errors
            setError(err.message);
            //navigate('/login')
          })
    }, [navigate]);

    const onViewProfileInfo = () => {
        navigate('/profile')
    };

    const onLogDive = () => { 
        navigate('/log-book')
    };

    const onCheckHistory = () => {
        navigate('/check-logbook')
    };

    const onSearch = () => {
        navigate('/search')
    };

    return (
        <main
    className="flex flex-col justify-center items-center h-screen bg-cover bg-center overflow-hidden"
    style={{
        backgroundImage: "url('https://media1.giphy.com/media/R2XKUNaI1VghlxCxlv/giphy.webp?cid=790b76110xsbh09liv6ttcn1vlnkn7rwif5n2zxxm11y49li&ep=v1_gifs_search&rid=giphy.webp&ct=g')",
    }}
>
    {/* Semi-transparent container */}
    <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md text-center max-w-md">
        <h1 className="text-xl font-bold mb-5 text-gray-800">Hi, diver 🤿 {userName}</h1>
        <div className="flex flex-col space-y-4">
            <Button onClick={onViewProfileInfo} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Personal Information
            </Button>

            <Button onClick={onLogDive} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Log a New Dive
            </Button>

            <Button onClick={onCheckHistory} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Dive's History
            </Button>

            <Button onClick={onSearch} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Search Site
            </Button>
        </div>
    </div>
</main>
    )
}

export default HomeDiver