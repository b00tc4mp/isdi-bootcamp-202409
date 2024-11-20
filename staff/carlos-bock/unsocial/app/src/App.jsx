import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost} from './view'
import Hello from './view/Hello';
import Search from './view/Search';

import Header from './view/components/Header'
import Footer from './view/components/Footer'

import logic from './logic'

export default function App() {
  const navigate = useNavigate();

  const handlePostCreated = () => navigate('/')//setView({ view: 'posts' });

  const handleUserLoggedOut = () => navigate('/login') //setView({ view: 'login' });

  const handleUserLoggedIn = () =>  navigate('/')  //setView({ view: 'posts' });

  const handleRegisterClick = () => navigate('/register') //setView({ view: 'register' });

  const handleLoginClick = () => navigate('/login')  //setView({ view: 'login' });

  const handleUserRegistered = () => navigate('/login')  //setView({ view: 'login' });

  const handleNewPostClick = () => navigate('/new-post') //setView({ view: 'new-post' });

  const handleHomeClick = () => navigate('/')  // setView({ view: 'posts' });

  console.log('App -> render');
  
    return <>
      <Header onHomeClick={handleHomeClick} onLoggedOut ={handleUserLoggedOut} />
      
      <Routes>
        <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

        <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

        <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

        <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />

        {/* extra demos */}
        <Route path="/hello/:name" element={<Hello />} />
        <Route path="/search" element={<Search />} />
      </Routes>

      <Footer onNewPostClick={handleNewPostClick} />
    </>
};



/*
{view === 'login' && <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick}/>} 
     
{view === 'register' && <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered}/>}

{view === 'posts' && <Posts />}   

{view === 'new-post' && <CreatePost onCreated ={handlePostCreated}/>}
*/