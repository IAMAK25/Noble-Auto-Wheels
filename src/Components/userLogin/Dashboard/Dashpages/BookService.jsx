import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Profile.css';
import SideNav from '../SideNav';
import { Toaster } from 'react-hot-toast';
import { getDatabase, ref, set } from 'firebase/database';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const BookService = () => {
    const { id } = useParams();
    const [bookingData, setBookingData] = useState({
        name: '',
        bikeModel: '',
        bikeNumber: '',
        date: '',
        time: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBookingData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add code to save booking data to the database
        const db = getDatabase();
        const bookingsRef = ref(db, `bookings/${id}`);
        set(bookingsRef, bookingData)
            .then(() => {
                console.log('Booking data saved successfully!');
                // Optionally, you can reset the form or display a success message here
            })
            .catch((error) => {
                console.error('Error saving booking data: ', error);
                // Optionally, you can display an error message here
            });
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav id={id} />
                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
                        <div className=''>
                            <Toaster toastOptions={{ duration: 4000 }} />
                            <Form onSubmit={handleSubmit}>

                                <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>Bike Service Appointment</h1>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" placeholder="Enter your name" value={bookingData.name} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="bikeModel">
                                    <Form.Label>Bike Model</Form.Label>
                                    <Form.Control type="text" name="bikeModel" placeholder="Enter bike model" value={bookingData.bikeModel} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="bikeNumber">
                                    <Form.Label>Bike Number</Form.Label>
                                    <Form.Control type="text" name="bikeNumber" placeholder="Enter bike number" value={bookingData.bikeNumber} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" name="date" value={bookingData.date} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="time">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control type="time" name="time" value={bookingData.time} onChange={handleChange} />
                                </Form.Group>
                                <Button variant="primary" type="submit">Book Now</Button>
                            </Form>
                        </div>
                    </Box>
                </div>
            </Box>
        </>
    );
}

export default BookService;
