import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { push } from 'connected-react-router';
import { logout } from 'react-formio';
import appLogo from '../styles/images/pepsico-logo.png'
import './Header.scss'

export default ({ auth }) => {
    const dispatch = useDispatch();

    const logoutClicked = () => {
        dispatch(logout());
        dispatch(push('/'));
    };
    const randomColorRgbValues = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    const avatarStyle = {
        background: randomColorRgbValues
    };

    const name = () => {
        let avatarName = auth.user.data.email.split(".");
        return avatarName[0].substring(0, 1).toUpperCase() + avatarName[1].substring(0, 1).toUpperCase();
    };

    const toggle = () => {
        let navBar = document.getElementById('navbarSupportedContent');
        let check = navBar.classList.contains('show');
        if (check) {
            navBar.classList.remove('show');
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light custome-Header">
            {/* <a className="navbar-brand" href="#">Navbar</a> */}

            <ul className="right-side-pannel flex-grow-1">
                {auth.authenticated ? (
                    <li className="nav-item profile">
                        <div className="avatarStyle" style={avatarStyle}>
                            {name()}
                            <div className="Details">
                                {auth.user.data.email}
                                <span className="nav-link" role="navigation link"
                                    onClick={logoutClicked}>
                                    <span className="fa fa-sign-out" />&nbsp;{'Logout'}
                                </span>
                            </div>
                        </div>


                    </li>
                ) : (
                        <NavLink to={'/login'} role="navigation link" className="nav-link">
                            {'Login'}
                        </NavLink>
                    )}
            </ul>
            <div className="flex-grow-1 logoWrapper">
                <Link className="navbar-brand" to="/home">
                    <span className="header-logo">
                        <img src={appLogo} alt="Pepsico Logo" />
                    </span>
                </Link>
            </div>
            <div className="flex-grow-1-button">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="mainMenu nav navbar-nav mainNav">
                    <li>
                        <Link to="/">
                            Forms
                        </Link>
                        <ul className="dropdown">
                            <li onClick={toggle}><Link to="/forms">All Forms</Link></li>
                            <li onClick={toggle}><Link to="/formsbydept">Forms by Department</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/">
                            For BA
                        </Link>
                        <ul className="dropdown">
                            <li onClick={toggle}><Link to="/create">Create new Form</Link></li>
                            <li onClick={toggle}><Link to="/createpdf">Create new PDF Form</Link></li>
                            <li onClick={toggle}><Link to="/excel">Create Form by Excel</Link></li>
                            <li onClick={toggle}><Link to="/manager">Form Manager</Link></li>
                            {/* <li onClick={toggle}><Link to="/cardmanager">Form Manager (Card)</Link></li> */}
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
