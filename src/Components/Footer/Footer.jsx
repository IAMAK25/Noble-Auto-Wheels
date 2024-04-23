import React from "react";
import "./footer.css";
import { FaInstagram, FaLinkedin, FaGoogle, FaFacebook } from "react-icons/fa";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <h3>Noble Auto Wheels</h3>
                <p>
                    Made by Ajay and team
                </p>
                <ul className="socials">
                    <li>
                        <a href="https://g.co/kgs/Rguf3U9" target="_blank">
                            <FaGoogle size={30} color="#DB4437" />
                        </a>
                    </li>

                    <li>
                        <a href="https://www.instagram.com/noble_yamaha/" target="_blank">
                            <FaInstagram size={30} color="#C13584" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/nobleautowheels2/" target="_blank">
                            <FaFacebook size={30} color="#3b5998" /> {/* Facebook icon */}
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>
                    copyright &copy; <a href="#">Noble Auto Wheels</a>{" "}
                </p>
                <div className="footer-menu">
                    <ul className="f-menu">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/bikes">Bikes</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
