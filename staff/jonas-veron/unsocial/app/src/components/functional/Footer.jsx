import { useLocation } from "react-router-dom";

import "./Footer.css";

import Button from "../library/Button";

export default function Footer({ onNewPostClick }) {
  console.log("Footer -> render");

  const location = useLocation();

  return (
    <footer className="Footer">
      {location.pathname === "/" && (
        <Button
          className="createPostButton"
          type="button"
          onClick={onNewPostClick}
        >
          +
        </Button>
      )}
    </footer>
  );
}
