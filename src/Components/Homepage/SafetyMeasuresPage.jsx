import React from 'react';
import { FaShieldAlt, FaTemperatureHigh, FaCreditCard, FaMask, FaWind, FaPhoneAlt } from 'react-icons/fa';
import './SafetyMeasuresPage.css'; // Import your CSS file for styling

const SafetyMeasuresPage = () => {
    const safetyMeasures = [
        {
            id: 1,
            icon: <FaShieldAlt />,
            description: 'Regular Sanitization of Vehicles',
        },
        {
            id: 2,
            icon: <FaTemperatureHigh />,
            description: 'Driver Temperature Checks',
        },
        {
            id: 3,
            icon: <FaCreditCard />,
            description: 'Contactless Payment Options',
        },
        {
            id: 4,
            icon: <FaMask />,
            description: 'Face Masks for Drivers and Passengers',
        },
        {
            id: 5,
            icon: <FaWind />,
            description: 'Vehicle Ventilation and Air Filtration',
        },
        {
            id: 6,
            icon: <FaPhoneAlt />,
            description: '24/7 Emergency Support',
        },
    ];

    return (
        <div className="safety-measures-page">
            <h2>Safety Measures</h2>
            <p>
                Your safety is our top priority. We have implemented the following
                measures to ensure a secure and comfortable journey for our passengers
                and drivers.
            </p>
            <ul>
                {safetyMeasures.map((measure) => (
                    <li key={measure.id} className="safety-measure">
                        <div className="icon">{measure.icon}</div>
                        <div className="description">{measure.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SafetyMeasuresPage;
