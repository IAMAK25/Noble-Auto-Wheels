import React from 'react';
import './FleetShowcase.css'; // Update to the corresponding CSS file
import yamahaR15Image from '../Images/r15.png'; // Replace with actual bike image paths
import yamahaFascinoImage from '../Images/fascino.png';
import yamahaFZSImage from '../Images/fzs.webp';

const BikeShowcase = () => {
    const bikes = [
        {
            id: 1,
            name: 'Yamaha R15',
            image: yamahaR15Image,
            type: 'Sportbike',
            description: 'Experience the thrill of racing with the Yamaha R15.',
            features: [
                '155 cc Liquid-cooled Engine',
                '6-speed Transmission',
                'Dual Channel ABS',
                'Fuel Injection System',
            ],
        },
        {
            id: 2,
            name: 'Yamaha Fascino',
            image: yamahaFascinoImage,
            type: 'Scooter',
            description: 'Ride in style and comfort with the Yamaha Fascino.',
            features: [
                '125 cc Air-cooled Engine',
                'CVT Transmission',
                'Classic Retro Design',
                'Telescopic Suspension',
            ],
        },
        {
            id: 3,
            name: 'Yamaha FZS-FI',
            image: yamahaFZSImage,
            type: 'Street Naked',
            description: 'Unleash the power of the streets with the Yamaha FZS-FI.',
            features: [
                '149 cc Air-cooled Engine',
                '5-speed Transmission',
                'Front and Rear Disc Brakes',
                'LED Headlights',
            ],
        },
    ];

    return (
        <section className="fleet-showcase"> {/* Updated class name */}
            <div className="container">
                <h2 className="section-heading">Explore Our Yamaha Bikes</h2>
                <div className="vehicle-cards"> {/* Updated class name */}
                    {bikes.map((bike) => (
                        <div className="vehicle-card" key={bike.id}> {/* Updated class name */}
                            <img src={bike.image} alt={bike.name} className="vehicle-image" /> {/* Updated class name */}
                            <div className="vehicle-details"> {/* Updated class name */}
                                <h3>{bike.name}</h3>
                                <p>{bike.description}</p>
                                <ul>
                                    {bike.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );


};

export default BikeShowcase;
