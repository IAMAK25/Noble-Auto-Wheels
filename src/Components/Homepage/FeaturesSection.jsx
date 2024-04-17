import React from 'react';
import { FaMotorcycle, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import './FeaturesSection.css';

const FeaturesSection = () => {
    return (
        <section className="features-section">
            <div className="container">
                <h2 className="section-heading">Why Choose Us?</h2>
                <div className="feature-cards">
                    {/* Feature 1: Wide Range */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaMotorcycle />
                        </div>
                        <h3>Wide Range of Bikes</h3>
                        <p>Explore our diverse collection of bikes, ranging from sports bikes to cruisers, ensuring you find the perfect ride.</p>
                    </div>

                    {/* Feature 2: Convenient Location */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaMapMarkerAlt />
                        </div>
                        <h3>Convenient Location</h3>
                        <p>Located in a prime area, our showroom is easily accessible, making it convenient for you to visit and browse our bikes.</p>
                    </div>

                    {/* Feature 3: Expert Guidance */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaInfoCircle />
                        </div>
                        <h3>Expert Guidance</h3>
                        <p>Our experienced staff provides expert guidance and assistance, helping you make informed decisions about your bike purchase.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
