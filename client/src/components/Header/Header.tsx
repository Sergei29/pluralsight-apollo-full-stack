import React, { memo } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Globo-Logo-white.svg";
import signIn from "../../images/avatar.svg";
import NavLinks from "../NavLinks";
import AuthLink from "../AuthLink";

const Header: React.FC = () => {
  return (
    <header>
      <div className="container">
        <div className="logo col-md-5 col-sm-5 col-xs-8">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <span className="text">MANIACALLY TAKING TECH TO THE GLOBE</span>
        </div>
        <div className="mobile-togle col-md-12 col-sm-12 col-xs-12">
          <nav className="navbar navbar-default" role="navigation">
            <div className="navbar-header">
              <button
                type="button"
                id="hamburger"
                className="navbar-toggle x collapsed"
                data-toggle="collapse"
                data-target="#navbar-collapse-x"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <div className="navbar-brand"></div>
            </div>

            <div className="collapse navbar-collapse" id="navbar-collapse-x">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <div className="search1">
                    <button type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                </li>
                <NavLinks />
              </ul>
            </div>
          </nav>
        </div>

        <div className="right_section col-md-5 col-xs-12">
          <div className="search">
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
            <input type="text" className="form-control" placeholder="Search" />
          </div>

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <NavLinks />
            </div>
          </nav>
        </div>

        <div className="sign-in col-md-2">
          <span className="dvider" />
          <div className="sign">
            <AuthLink>
              <img className="sign-in-img" src={signIn} alt="sign-in" />
              Sign-in
            </AuthLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
