import React from 'react';
import './QuestionAndAnswerPage.css'; // Import your CSS file for styling

const QuestionAndAnswerPage = () => {
    const faqs = [
        {
            id: 1,
            question: 'What types of bikes do you offer?',
            answer: 'We offer a wide range of bikes including sportbikes, cruisers, and street bikes. Whether you are looking for high performance or comfort, we have something for every rider.',
        },
        {
            id: 2,
            question: 'Do you offer financing options for bike purchases?',
            answer: 'Yes, we provide flexible financing options to help you purchase your dream bike. Our financing plans are tailored to suit your budget and needs. Contact us for more details.',
        },
        {
            id: 3,
            question: 'Are there any warranties or guarantees on your bikes?',
            answer: 'Absolutely! We stand behind the quality of our bikes. All our bikes come with manufacturer warranties to ensure peace of mind for our customers. Additionally, we offer extended warranty options for extra protection.',
        },
        {
            id: 4,
            question: 'Can I test ride a bike before making a purchase?',
            answer: 'Yes, we encourage test rides! We want you to feel confident in your decision. Visit our showroom to test ride any bike you are interested in.Our team will assist you with scheduling a test ride.',
        },
    ];

    return (
        <div className="qna-page">
            <h2>Questions and Answers</h2>
            <p>Have questions? We've got answers! Check out some commonly asked questions below:</p>
            <div className="faq-container">
                {faqs.map((faq) => (
                    <div key={faq.id} className="faq">
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionAndAnswerPage;
