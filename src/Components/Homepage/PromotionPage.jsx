// PromotionsPage.jsx
import React from 'react';
import './PromotionsPage.css'; // Import your CSS file for styling

const PromotionsPage = () => {
    const promotions = [
        {
            id: 1,
            title: '🎉 Special Offer!',
            description: 'Get 20% off on your first ride. Use code: FIRST20',
        },
        {
            id: 2,
            title: '🌟 Weekend Getaway',
            description: 'Plan a weekend trip and enjoy 15% off. Use code: WEEKEND15',
        },
        // Add more promotions as needed
    ];

    return (
        <div className="promotions-page">
            <h2 className="page-title">Promotions & Discounts</h2>
            <p className="page-description">
                Take advantage of our ongoing promotions and discounts to save on your rides.
            </p>
            <ul className="promotion-list">
                {promotions.map((promotion) => (
                    <li key={promotion.id} className="promotion">
                        <h3 className="promotion-title">{promotion.title}</h3>
                        <p className="promotion-description">{promotion.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PromotionsPage;
