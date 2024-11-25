import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { Button } from "../library";

import logic from "../../logic";

export default function Header({ view, onHomeClick, onLoggedOut }) {
  const [name, setName] = useState(null);

  const location = useLocation();

  useEffect(() => {
    console.log("Header -> componentDidMount");
    if (logic.isUserLoggedIn()) {
      if (!name)
        try {
          logic
            .getUserName()
            .then(setName)
            .catch((error) => {
              alert(error.message);
              console.error(error);
            });
        } catch (error) {
          alert(error.message);

          console.error(error);
        }
    } else setName(null);
  }, [location.pathname]);

  const handleHomeClick = (event) => {
    try {
      event.preventDefault();

      onHomeClick();
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  const handleLogout = () => {
    if (confirm("Logout?")) {
      logic.logoutUser();

      onLoggedOut();
    }
  };

  console.log("Header -> render");

  return (
    <header className="bg-primary-color p-4 flex justify-between items-center w-full sticky top-0 z-10">
      <h1 className="text-5xl font-cinzel font-extrabold">
        {location.pathname === "/new-post" ? (
          <a
            href=""
            onClick={handleHomeClick}
            className="text-5xl font-cinzel font-extrabold"
          >
            Unsocial
          </a>
        ) : (
          "Unsocial"
        )}
      </h1>

      <div className="TopNav flex gap-6 items-center">
        {name && <h3 className="text-2xl font-semibold">{name}</h3>}

        {logic.isUserLoggedIn() && (
          <Button type="button" className="Button" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
