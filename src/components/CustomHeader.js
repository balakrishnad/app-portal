import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { push } from 'connected-react-router';
import { logout } from 'react-formio';
import appLogo from '../styles/images/pepsico-logo.png';
import './CustomHeader.css';

export default ({ auth }) => {
  const dispatch = useDispatch();

  const logoutClicked = () => {
    dispatch(logout());
    dispatch(push("/"));
  };
  const randomColorRgbValues =
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ")";
  const avatarStyle = {
    background: randomColorRgbValues,
  };

  const name = () => {
    let avatarName = auth.user.data.email.split(".");
    return (
      avatarName[0].substring(0, 1).toUpperCase() +
      avatarName[1].substring(0, 1).toUpperCase()
    );
  };

  return (
    <nav className="navbar navbar-default custome-Header">
      <ul className="mainMenu nav navbar-nav mainNav">
        {/* <li>
                    <Link to="/">
                        Home
                    </Link>
                    <ul className="dropdown">
                        <li><a href="#">Basic Cards</a></li>
                        <li><a href="#">Dashboard Cards</a></li>
                    </ul>
                </li> */}
        <li>
          <Link to="/forms">Forms</Link>
          <ul className="dropdown">
            <li>
              <Link to="/forms">All Forms</Link>
            </li>
            <li>
              <Link to="/formsbydept">Forms by Department</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/">For BA</Link>
          <ul className="dropdown">
            <li>
              <Link to="/create">Create new Form</Link>
            </li>
            <li>
              <Link to="/excel">Create Form by Excel</Link>
            </li>
            <li>
              <Link to="/manager">Form Manager</Link>
            </li>
            <li>
              <Link to="/cardmanager">Form Manager (Card)</Link>
            </li>
          </ul>
        </li>
        {/* <li>
                    <Link to="/chart">
                        Chart
                    </Link>
                    <ul className="dropdown">
                        <li><a href="#">Basic Card1</a></li>
                        <li><a href="#">Dashboard Card2</a></li>
                    </ul>
                </li>
                <li>
                    <Link to="/fetchData">
                        Data From Form
                    </Link>
                    <ul className="dropdown">
                        <li><a href="#">Basic Form1</a></li>
                        <li><a href="#">Basic Form2</a></li>
                    </ul>
                </li> */}
      </ul>
      <Link className="navbar-brand" to="/home">
        <span className="header-logo">
          <img src={appLogo} alt="Pepsico Logo" />
        </span>
      </Link>
      <ul className="nav navbar-nav ml-auto right-side-pannel">
        {auth.authenticated ? (
          <li className="nav-item profile">
            <div className="avatarStyle" style={avatarStyle}>
              {name()}
              <div className="Details">
                {auth.user.data.email}
                <span
                  className="nav-link"
                  role="navigation link"
                  onClick={logoutClicked}
                >
                  <span className="fa fa-sign-out" />
                  &nbsp;{"Logout"}
                </span>
              </div>
            </div>
          </li>
        ) : (
          <NavLink to={"/login"} role="navigation link" className="nav-link">
            {"Login"}
          </NavLink>
        )}
      </ul>
    </nav>
  );
};
