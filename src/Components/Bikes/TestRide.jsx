import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, push, set } from 'firebase/database';
import { toast, ToastContainer } from 'react-toastify'; // Import toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import './TestRide.css';
import { loadStripe } from '@stripe/stripe-js';


function TestRide() {
    const { name } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form fields
        if (!formData.name || !formData.mobile || !formData.address || !formData.date || !formData.time) {
            toast.error('Please fill in all fields.');
            return;
        }

        const db = getDatabase();
        const ridesRef = ref(db, 'testRides');
        const newRideRef = push(ridesRef);
        const rideData = {
            bikeName: name,
            ...formData
        };
        set(newRideRef, rideData)
            .then(() => {
                toast.success('Test ride booked successfully!');
                // Reset the form after successful submission
                setFormData({
                    name: '',
                    mobile: '',
                    address: '',
                    date: '',
                    time: ''
                });
            })
            .catch((error) => {
                console.error('Error storing data: ', error);
                toast.error('An error occurred. Please try again.');
            });
    };

    const handleMakePayment = async () => {
        const stripe = await loadStripe('pk_test_51P99sQSJZGkFyAEhagD854egbsO43VkAmMFqCcXUUFxcDZKq2qivefBmZkfL3NQwmUMxuh76m7XclxOQwEkGNfq700th0rYzhE');

        const body = {
            product: name,
            // customerName: formData.name, // Include customer name
            // customerAddress: formData.address // Include customer address
        };

        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await fetch("http://localhost:8000/payment/create", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            const session = await response.json();

            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                console.log("Error Stripe", result.error.message);
            } else {
                console.log("Redirecting to Stripe...");
            }
        } catch (error) {
            console.error('Error making payment: ', error);
            toast.error('An error occurred while making the payment. Please try again.');
        }
    };

    return (
        <div className="container-form">
            <h2>Book {name}</h2>

            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="mobile">Mobile No:</label>
                <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>
            {/* <div>
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="time">Time:</label>
                <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} />
            </div> */}
            <button className='submit-button' onClick={handleMakePayment} type="submit">Submit</button>

            <ToastContainer /> {/* Container for toast notifications */}
        </div>
    );
}

export default TestRide;
