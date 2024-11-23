import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import { Login, Register, Home, CreatePost } from "./view";
import Hello from "./view/Hello";
import Search from "./view/Search";
import Profile from "./view/Profile";

import Header from "./components/functional/Header";
import Footer from "./components/functional/Footer";

import logic from "./logic";
import getUserId from "./logic/getUserId";

export default function App() {
  console.log("App -> constructor");
  const navigate = useNavigate();

  const handlePostCreated = () => navigate("/");

  const handleUserLoggedout = () => navigate("/login");

  const handleUserLoggedIn = () => navigate("/");

  const handleRegisterClick = () => navigate("/register");

  const handleLoginClick = () => navigate("/login");

  const handleUserRegistered = () => navigate("/login");

  const handleNewPostClick = () => navigate("/new-post");

  const handleMyProfileClick = () => {
    try {
      const userId = logic.getUserId();
      navigate(`/profile/${userId}`);
    } catch (error) {}
  };

  const handleHomeClick = () => navigate("/");

  console.log("App -> render");

  return (
    <>
      <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedout} />

      {/* {view === "login" && (
        <Login
          onLoggedIn={handleUserLoggedIn}
          onRegisterClick={handleRegisterClick}
        />
      )}
      {view === "register" && (
        <Register
          onLoginClick={handleLoginClick}
          onRegistered={handleUserRegistered}
        />
      )}
      {view === "posts" && <Posts />}

      {view === "new-post" && <CreatePost onCreated={handlePostCreated} />} */}

      <Routes>
        <Route
          path="/login"
          element={
            logic.isUserLoggedIn() ? (
              <Navigate to="/" />
            ) : (
              <Login
                onLoggedIn={handleUserLoggedIn}
                onRegisterClick={handleRegisterClick}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            logic.isUserLoggedIn() ? (
              <Navigate to="/" />
            ) : (
              <Register
                onLoginClick={handleLoginClick}
                onRegistered={handleUserRegistered}
              />
            )
          }
        />
        <Route
          path="/"
          element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="login" />}
        />
        <Route
          path="/new-post"
          element={
            logic.isUserLoggedIn() ? (
              <CreatePost onCreated={handlePostCreated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* extra demos */}
        <Route path="/hello/:name" element={<Hello />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile/:userId/*" element={<Profile />} />
      </Routes>

      <Footer
        onNewPostClick={handleNewPostClick}
        onMyProfileClick={handleMyProfileClick}
      />
    </>
  );
}
