// ContactPage.jsx
import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
    return (
        <div className="contact-page">
            <div className="contact-info">
                <h2>Contact Us</h2>
                <p>
                    We'd love to hear from you! Feel free to reach out via phone, email, or through the contact form below.
                </p>
                <div className="info-item">
                    <span>Email:</span>
                    <p>nobleautowheelsnsk@gmail.com</p>
                </div>
                <div className="info-item">
                    <span>Phone:</span>
                    <p > 077589 83657 / 7758983027</p>
                </div>
                <div className="info-item">
                    <span>Address:</span>
                    <p>Shop Number 1, Shivam Apartment, 4, Mahatma Nagar, Parijat Nagar, Nashik, Maharashtra 422007</p>
                </div>
            </div>
            <div className="contact-form">
                <form>
                    <h2>Send Us a Message</h2>
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" />

                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" />

                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" placeholder="Type your message"></textarea>

                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
