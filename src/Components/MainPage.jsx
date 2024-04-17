import React from 'react';
import { FiMapPin, FiCalendar, FiRefreshCw } from 'react-icons/fi';
import image4 from './Images/image4.jpg';
import './css/mainpage.css';
import FeaturesSection from './Homepage/FeaturesSection';
import Footer from './Footer/Footer';
import FleetShowcase from './Homepage/FleetShowcase';
import SafetyMeasuresPage from './Homepage/SafetyMeasuresPage';
import PromotionsPage from './Homepage/PromotionPage';
import QuestionAndAnswerPage from './Homepage/QuestionAndAnswerPage';
import AboutUsPage from './Homepage/AboutUsPage';
import ContactPage from './Homepage/ContactPage';
import pic1 from './Images/pic1.jpg'
import pic2 from './Images/pic2.jpg'
import pic3 from './Images/pic3.jpg'
import pic4 from './Images/pic4.jpg'
import { Carousel } from 'react-bootstrap';

const MainPage = () => {

  return (
    <div className="container-wrapper">
      <div className="background-image" >
        <Carousel className='cor'>
          <Carousel.Item>
            <img
              className="carousel-image"
              src={pic1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carousel-image"
              src={pic2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carousel-image"
              src={pic3}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carousel-image"
              src={pic4}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>


      <FeaturesSection />
      <FleetShowcase />
      {/* <SafetyMeasuresPage /> */}
      {/* <PromotionsPage /> */}
      <QuestionAndAnswerPage />
      <AboutUsPage />
      <ContactPage />

      <Footer />
    </div>
  );
};

export default MainPage;
