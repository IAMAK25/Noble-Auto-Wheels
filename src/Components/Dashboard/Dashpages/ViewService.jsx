import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import './Profile.css';
import SideNav from '../SideNav';
import { Toaster } from 'react-hot-toast';
import Table from 'react-bootstrap/Table';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const ViewService = () => {
    const [bookingData, setBookingData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase();
            const bookingsRef = ref(db, 'bookings');

            onValue(bookingsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const bookingsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                    setBookingData(bookingsArray);
                }
            });
        };

        fetchData();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredBookingData = bookingData.filter(booking =>
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bikeModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bikeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.time.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort booking data by date and time
    const sortedBookingData = filteredBookingData.sort((a, b) => {
        const dateComparison = a.date.localeCompare(b.date);
        if (dateComparison !== 0) return dateComparison;
        return a.time.localeCompare(b.time);
    });

    const handleDeleteBooking = (id) => {
        // Remove the booking from the database
        const db = getDatabase();
        remove(ref(db, `bookings/${id}`));
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
                        {/* <DrawerHeader /> */}
                        <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>View Services</h1>
                        <div className=''>
                            <Toaster toastOptions={{ duration: 4000 }} />
                            <Form>
                                <div className="d-flex justify-content-between mb-3 align-items-center">
                                    <FormControl
                                        type="text"
                                        placeholder="Search by name"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </Form>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Bike Model</th>
                                        <th>Bike Number</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedBookingData.map((booking, index) => (
                                        <tr key={index}>
                                            <td>{booking.name}</td>
                                            <td>{booking.bikeModel}</td>
                                            <td>{booking.bikeNumber}</td>
                                            <td>{booking.date}</td>
                                            <td>{booking.time}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleDeleteBooking(booking.id)}
                                                    style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
                                                >
                                                    Delete
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Box>
                </div>
            </Box>
        </>
    );
}

export default ViewService;
