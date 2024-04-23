import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo from './Images/logo.png';
import './css/navbar.css';

function Navbar() {
    return (
        <div>
            <nav className="navbar  navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <img src={logo} alt="Logo" width="80" height="80" className="d-inline-block align-text-center" />
                    <Link className="navbar-brand" href="#">
                        <span>Noble Autowheels</span>
                    </Link>
                    <button className="navbar-toggler" style={
                        {
                            width: '50px',
                            height: '40px',
                            color: 'white'
                        }
                    } type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" arial-controls="navbarSupportedContent" arial-expanded="false" arial-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={
                            {
                                width: '20px',
                                height: '20px',
                                color: 'white'
                            }
                        }></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/home">Download App</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/bikes">Bikes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ChooseLogin">Login</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
