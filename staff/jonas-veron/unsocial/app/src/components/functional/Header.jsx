import { useState, useEffect } from "react";

import { Button } from "../library";

import logic from "../../logic";

import "./Header.css";

export default function Header({ view, onHomeClick, onLoggedOut }) {
  const [name, setName] = useState(null);

  useEffect(() => {
    console.log("Header -> componentDidMount");
    if (logic.isUserLoggedIn()) {
      if (!name)
        try {
          logic.getUserName((error, name) => {
            if (error) {
              alert(error.message);

              console.error(error);

              return;
            }

            setName(name);
          });
        } catch (error) {
          alert(error.message);

          console.error(error);
        }
    } else setName(null);
  }, [view]);

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
    <header className="Header">
      <h1>
        {view === "new-post" ? (
          <a href="" onClick={handleHomeClick}>
            Unsocial
          </a>
        ) : (
          "Unsocial"
        )}
      </h1>

      <div className="TopNav">
        {name && <h3>{name}</h3>}

        {logic.isUserLoggedIn() && (
          <Button type="button" className="Button" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
