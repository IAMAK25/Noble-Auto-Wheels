import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import './Details.css';
import { Toaster, toast } from "react-hot-toast";
import Engine from '../Images/piston.png'
import Torque from '../Images/torque-wrench.png'
import Mileage from '../Images/download-speed.png'
import Weight from '../Images/weight.png'
import Brakes from '../Images/disc-brake.png'
import Power from '../Images/power.png'
import YouTube from 'react-youtube';
import { FaStar } from 'react-icons/fa';
import dp from '../Images/dp.png'
import { Link, useHistory } from 'react-router-dom';

function DetailsBike() {
    const history = useHistory()
    const { id } = useParams();
    const [bike, setBike] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewsToShow, setReviewsToShow] = useState(3);


    const [formData, setFormData] = useState({
        customerName: '',
        reviewText: '',
        rating: ''
    });

    const [showFullDescription, setShowFullDescription] = useState(false); // State to track description visibility

    // Function to toggle description visibility
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    useEffect(() => {
        const db = getDatabase();
        const bikeRef = ref(db, `bikes/${id}`);
        const reviewsRef = ref(db, `reviews/${id}`);

        const fetchBikeData = async () => {
            try {
                onValue(bikeRef, (snapshot) => {
                    const bikeData = snapshot.val();
                    if (bikeData) {
                        setBike(bikeData);
                        console.log(bikeData.url);
                    } else {
                        setError("Bike not found");
                    }
                    setLoading(false);
                });
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const fetchReviewsData = async () => {
            try {
                onValue(reviewsRef, (snapshot) => {
                    const reviewsData = snapshot.val();
                    if (reviewsData) {
                        const reviewsArray = Object.values(reviewsData); // Convert reviews object to array
                        setReviews(reviewsArray);
                        calculateAverageRating(reviewsArray); // Calculate average rating
                    } else {
                        setReviews([]); // Set empty array if no reviews
                        setAverageRating(0);
                    }
                });
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        const calculateAverageRating = (reviews) => {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const average = totalRating / reviews.length;
            setAverageRating(average);
        };

        fetchBikeData();
        fetchReviewsData();

        return () => {
            // Cleanup the listeners
            onValue(bikeRef, null);
            onValue(reviewsRef, null);
        };
    }, [id]);


    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!formData.customerName || !formData.reviewText || !formData.rating) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            const db = getDatabase();
            const newReviewRef = push(ref(db, 'reviews/' + id)); // Generate a new key for the review
            const newReviewData = { // Create the review data object
                customerName: formData.customerName,
                reviewText: formData.reviewText,
                rating: formData.rating
            };
            await set(newReviewRef, newReviewData); // Save the review data to the database
            toast.success('Review submitted successfully!');
            // Clear the form data after submission
            setFormData({
                customerName: '',
                reviewText: '',
                rating: ''
            });
        } catch (error) {
            console.error('Error adding review: ', error);
        }
    };

    // Function to render star icons based on the rating
    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} color="#ffc107" />);
            } else {
                stars.push(<FaStar key={i} color="#e4e5e9" />);
            }
        }
        return stars;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!bike) {
        return <div>Bike not found</div>;
    }

    const handleInquiryClick = (name) => {
        history.push(`/test-ride/${name}`);
    }


    return (
        <div className='single-bike'>
            <div className='first-box'>
                <img src={bike.imageUrls[0]} alt={bike.name} />
                <div className='top-section'>
                    <h1>{bike.name}</h1>
                    <h4>₹ {bike.price}</h4>
                    <p>On-Road Price, Nashik</p>
                    <p>Minimum Down Payment 10000/-</p>
                    <p>Average Rating: {renderRatingStars(averageRating)}</p>
                    <button className="inquiry-button" onClick={() => handleInquiryClick(bike.name)}>Book Test Ride</button>
                    <p style={{ fontSize: '12px', marginTop: '10px' }}>Don't miss out on the best offers this year</p>
                </div>
            </div>

            <div className='key-features'>
                <h4>Key Specs & Features of {bike.name}</h4>
                <div className='specs'>

                    <div className='left'>

                        <div className='spec'>
                            <div className='label'>
                                <img src={Engine} width={30} height={30} alt="Engine" />
                                <p style={{ marginLeft: '30px', fontSize: '17px' }}>Engine</p>
                            </div>

                            <h6 style={{ marginRight: '20px' }}>{bike.engine}</h6>
                        </div>

                        <div className='spec'>
                            <div className='label'>
                                <img src={Torque} width={30} height={30} alt="Torque" />
                                <p style={{ marginLeft: '30px', fontSize: '17px' }}>Torque</p>
                            </div>

                            <h6 style={{ marginRight: '20px' }}>{bike.torque}</h6>
                        </div>

                        <div className='spec'>
                            <div className='label'>
                                <img src={Weight} width={30} height={30} alt="Weight" />
                                <p style={{ marginLeft: '30px', fontSize: '17px' }}>Kerb Weight</p>
                            </div>

                            <h6 style={{ marginRight: '20px' }}>{bike.weight}</h6>
                        </div>

                    </div>

                    <div className='left' style={{ marginLeft: '20px' }}>
                        <div className='spec'>
                            <div className='label'>
                                <img src={Power} width={30} height={30} alt="Power" />
                                <p style={{ marginLeft: '30px', fontSize: '17px' }}>Power</p>
                            </div>

                            <h6>{bike.power}</h6>
                        </div>

                        <div className='spec'>
                            <div className='label'>
                                <img src={Mileage} width={30} height={30} alt="Mileage" />
                                <p style={{ marginLeft: '30px', fontSize: '17px' }}>Mileage</p>
                            </div>

                            <h6>{bike.mileage}</h6>
                        </div>

                        <div className='spec'>
                            <div className='label'>
                                <img src={Brakes} width={30} height={30} alt="Brakes" />
                                <p style={{ marginLeft: '30px', fontSize: '17px' }}>Brakes</p>
                            </div>

                            <h6>{bike.brakes}</h6>
                        </div>
                    </div>
                </div>

            </div>

            <div className="summary">
                <h4>{bike.name} Summary</h4>
                <p>
                    {showFullDescription ? bike.description : `${bike.description.slice(0, 1000)}... `}
                    <a href="#" onClick={toggleDescription} style={{ color: 'blue' }}>
                        {showFullDescription ? 'Collapse' : 'Read More'}
                    </a>
                </p>
            </div>


            <div className="youtube-video">
                <h4 style={{ alignSelf: 'start' }}>YouTube Video</h4>
                <YouTube videoId={bike.url && bike.url.split('v=')[1]} style={{ margin: '20px' }} />
            </div>

            <div className="review-section">
                <h3>Customer Reviews</h3>
                <div className="review-form">
                    <input type="text" placeholder="Your Name" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
                    <textarea placeholder="Your Review" value={formData.reviewText} onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })} />
                    <select value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}>
                        <option value="0">Select Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button onClick={handleReviewSubmit}>Submit Review</button>
                </div>

                <div className="all-reviews">
                    {/* Displaying reviews */}
                    {reviews.slice(0, reviewsToShow).map((review, index) => (
                        <div key={index} className="review">
                            <div style={{ display: 'flex' }}>
                                <img src={dp} width={25} style={{ marginRight: '10px' }} alt="" />
                                <p><strong>{review.customerName}</strong></p>
                            </div>
                            <p>{renderRatingStars(review.rating)}</p>
                            <p>{review.reviewText}</p>
                        </div>
                    ))}
                    {/* View More button */}
                    {reviews.length > reviewsToShow && (
                        <button onClick={() => setReviewsToShow(reviewsToShow + 3)}>View More Reviews</button>
                    )}
                </div>

            </div>

        </div>
    );
}

export default DetailsBike;
