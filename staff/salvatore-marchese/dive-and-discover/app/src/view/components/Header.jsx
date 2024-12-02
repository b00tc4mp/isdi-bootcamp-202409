import { Button } from "../library";
import logic from "../../logic";

export default ({ onHomeClick, onLoggedOut }) => {
  let name;

  if (logic.isUserLoggedIn())
    try {
      name = logic.getUserName();
    } catch (error) {
      alert(error.message);

      console.error(error);
    }

  const handleHomeClick = (event) => {
    event.preventDefault();

    onHomeClick();
  };

  const handleLogout = () => {
    if (confirm("Logout?")) {
      logic.logoutUser();

      onLoggedOut();
    }
  };

  return (
    <header className="bg-yellow-500 p-4 h-12 box-border flex justify-between items-center fixed top-0 w-full">
      <h1 className="m-0 text-xl font-bold">
        <a
          href=""
          onClick={handleHomeClick}
          className="text-black hover:underline"
        >
          Dive & Discover
        </a>
      </h1>

      {logic.isUserLoggedIn() && <h3 className="text-base">{name}</h3>}

      {logic.isUserLoggedIn() && (
        <Button type="button" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </header>
  );
};