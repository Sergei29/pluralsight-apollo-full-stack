import React from "react";
import { Link } from "react-router-dom";

const NavLinks: React.FC = () => (
  <ul className="navbar-nav mr-auto">
    <li className="nav-item active">
      <Link className="nav-link" to="/our-story">
        Our story<span className="sr-only">(current)</span>
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link disabled" to="/robotics">
        Robotics
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link disabled" to="/media">
        Media
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/conference">
        Conference
      </Link>
    </li>
  </ul>
);

export default NavLinks;
