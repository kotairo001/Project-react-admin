import React from "react";
import { Link } from "react-router-dom";
import {
  ContainerFilled,
  ProfileFilled,
  TeamOutlined,
} from "@ant-design/icons";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-xl">
      <div className="container h-100">
        <Link className="navbar-brand" to="http://localhost:3000/home">
          <h1 className="tm-site-title mb-0">Home Page</h1>
        </Link>
        <button
          className="navbar-toggler ml-auto mr-0"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars tm-nav-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto h-100">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <ContainerFilled />
                <span>Catagory</span>
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/news">
                  News
                </Link>
                <Link className="dropdown-item" to="/vaccine">
                  Vaccine
                </Link>
                <Link className="dropdown-item" to="/doctors">
                  Hospital
                </Link>
                <Link className="dropdown-item" to="/case">
                  Cases
                </Link>
                <Link className="dropdown-item" to="/about">
                  About
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/health">
                <ProfileFilled />
                Health Declaration
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="listAccount">
                <TeamOutlined />
                Accounts
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link d-block" to="http://localhost:3000/login">
                Admin, <b>Logout</b>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
