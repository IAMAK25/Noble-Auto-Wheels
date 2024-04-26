import React, { useState, useEffect } from 'react';
import './Success.css'; // Import CSS file for styling
import success from '../Images/success.png';
import { useHistory } from 'react-router-dom'; // Import useHistory hook for redirection

function Success() {
    const [redirectTimer, setRedirectTimer] = useState(5); // Timer for redirection
    const history = useHistory();

    // Countdown timer effect
    useEffect(() => {
        const intervalId = setInterval(() => {
            setRedirectTimer((prevTimer) => prevTimer - 1); // Decrease timer by 1 second
        }, 1000);

        // Clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    // Redirect after 5 seconds
    useEffect(() => {
        if (redirectTimer === 0) {
            history.push('/'); // Redirect to homepage
        }
    }, [redirectTimer, history]);

    return (
        <div className="success-container">
            <div className="success-message">
                <h2>Payment Successful!</h2>
                <p>Thank you for your purchase.</p>
                <p>Your order has been successfully processed.</p>
            </div>
            <div className="success-image">
                <img src={success} alt="Success" />
            </div>
            <div className="redirect-timer">
                <p>Redirecting to homepage in {redirectTimer} seconds...</p>
            </div>
        </div>
    );
}

export default Success;
