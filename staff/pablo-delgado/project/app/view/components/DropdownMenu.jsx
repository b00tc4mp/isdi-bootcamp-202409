import { Link } from 'react-router-dom';
import { PawPrint } from 'phosphor-react';

export default function DropdownMenu() {
  return (
    <div className="dropdown dropdown-end">
      {/* PawPrint as button */}
      <div tabIndex={0} role="button" className="btn btn-ghost m-1">
        <PawPrint size={28} className="text-yellow-400 hover:text-yellow-300 transition" />
      </div>

      {/* Dropdown */}
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-md">
        <li>
          <Link to="/login">Log in</Link>
        </li>
      </ul>
    </div>
  );
}
