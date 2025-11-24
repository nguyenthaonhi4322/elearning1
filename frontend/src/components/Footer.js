import React from 'react';
import '../styles.css'; 
import { Link } from 'react-router-dom';

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

function Footer() {
    const currentYear = new Date().getFullYear(); 

    return (
        <footer className="main-footer">
            <div className="footer-content">
                
                <div className="footer-section about">
                    <h3>E-learning System</h3>
                </div>

                <div className="footer-section contact-info">
                    <h3>Contact</h3>
                    <p>
                        <i className="fa fa-envelope"></i> Email: nguyenthaonhi4322@gmail.com
                    </p>
                    <p>
                        <i className="fa fa-phone"></i> Phone: 0349164729
                    </p>
                    <p>
                        <i className="fa fa-map-marker"></i> Address: NTTU, Tp.HCM
                    </p>
                </div>

                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                           <Link to="/tutors/about-us">About Us</Link>
                        </li>
                        <li>
                            <Link to="/tutors/policy">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/tutors/terms">Terms of Service</Link>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                &copy; {currentYear} E-learning System. All rights reserved.

                <div className="social-icons">
                     <a className="icon-fb"
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer">
                        <FaFacebookF size={22} />
                    </a>

                    <a className="icon-x"
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer">
                        <FaXTwitter size={22} />
                    </a>

                    <a className="icon-yt"
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer">
                        <FaYoutube size={22} />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;