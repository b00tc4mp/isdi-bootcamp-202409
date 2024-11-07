import "./Footer.css";

import Button from "../library/Button";

export default function Footer({ onNewPostClick, view }) {
  console.log("Footer -> render");

  return (
    <footer className="Footer">
      {view === "posts" && (
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
