import React, { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../graphql/AuthProvider";
import AuthLink from "../AuthLink";
import signIn from "../../images/avatar.svg";

const NavLinks: React.FC = () => {
  const { isAdmin } = useContext(AuthContext);
  return (
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
      {isAdmin() ? (
        <li className="nav-item">
          <Link className="nav-link" to="/admin">
            Admin
          </Link>
        </li>
      ) : null}

      <li className="nav-item auth-link">
        <AuthLink strLinkCustomClass="nav-link">
          <img className="sign-in-img" src={signIn} alt="sign-in" />
          Sign-in
        </AuthLink>
      </li>
    </ul>
  );
};

export default memo(NavLinks);
