import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import Box from '@mui/material/Box'; // Import Box from Material-UI
import { styled } from '@mui/material/styles'; // Import styled from Material-UI
import { Form } from 'react-bootstrap';
import './Profile.css';
import SideNav from '../SideNav';
import { Toaster } from "react-hot-toast";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Table from 'react-bootstrap/Table';

// Define DrawerHeader using styled from Material-UI
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const TestRideShow = () => {
    const [testRides, setTestRides] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTestRides = () => {
            const db = getDatabase();
            const testRidesRef = ref(db, 'testRides');

            onValue(testRidesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const testRidesArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                    setTestRides(testRidesArray);
                }
            });
        };

        fetchTestRides();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredTestRides = testRides.filter(testRide =>
        testRide.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
                        {/* <DrawerHeader /> */}
                        <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>Test Ride Bookings</h1>
                        <div className=''>
                            <Toaster toastOptions={{ duration: 4000 }} />
                            <Form className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search by name"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </Form>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Address</th>
                                        <th>Bike Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTestRides.map((testRide, index) => (
                                        <tr key={index}>
                                            <td>{testRide.name}</td>
                                            <td>{testRide.mobile}</td>
                                            <td>{testRide.address}</td>
                                            <td>{testRide.bikeName}</td>
                                            <td>{testRide.date}</td>
                                            <td>{testRide.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Box>
                </div>
            </Box>
        </>
    )
}

export default TestRideShow;
