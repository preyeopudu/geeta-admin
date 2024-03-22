import React from "react";
import { NavLink } from "react-router-dom";

const NavigationBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        {/* Navigation links */}
        <ul className="flex space-x-4">
          <NavItem to="/" label="Home" />
          <NavItem to="/withdrawal" label="Withdrawal Requests" />
          <NavItem to="/send" label="Send Funds" />
          {/* Add more navigation links as needed */}
        </ul>
      </div>
    </nav>
  );
};

// Navigation item component
const NavItem: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `text-white px-3 py-2 rounded-md ${isActive ? "bg-gray-600" : ""}`
        }
      >
        {label}
      </NavLink>
    </li>
  );
};

export default NavigationBar;
