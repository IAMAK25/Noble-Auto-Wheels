import React from 'react';
import './AboutUsPage.css';
import team from '../Images/team.jpg'

const AboutUsPage = () => {
    return (
        <div className="about-us-page">
            <div className="about-us-content">
                <h2>About Noble Autowheels</h2>
                <p>
                    Welcome to Noble Autowheels, your premier destination for Yamaha bikes and top-notch service.
                    Our showroom is dedicated to providing enthusiasts with the finest selection of Yamaha bikes
                    and ensuring a seamless ownership experience.
                </p>
                <p>
                    At Noble Autowheels, we're passionate about Yamaha motorcycles. As an authorized Yamaha dealer,
                    we offer a wide range of models to suit every rider's preferences and needs.
                </p>
                <p>
                    Our commitment to excellence extends beyond sales. Our expert team is here to assist you in
                    finding the perfect Yamaha bike and providing comprehensive service and maintenance to keep
                    your ride in top condition.
                </p>
            </div>
            <div className="team-image">
                {/* Placeholder image, replace with an image of your showroom or team */}
                <img src={team} alt="Noble Autowheels Team" />
            </div>
        </div>
    );
};

export default AboutUsPage;
