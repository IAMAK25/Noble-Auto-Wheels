import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getDatabase, ref, onValue, set } from 'firebase/database';

import './Profile.css';
import SideNav from '../SideNav';
import { Toaster } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const UserProfile = () => {
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [updatedProfile, setUpdatedProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const db = getDatabase();
            const userRef = ref(db, `users/${id}`);

            // Fetch user profile information from the database
            onValue(userRef, (snapshot) => {
                const userData = snapshot.val();
                setUserProfile(userData);
                setUpdatedProfile(userData); // Set initial values for updated profile
            });
        };

        fetchUserProfile();

        return () => {
            setUserProfile(null);
            setUpdatedProfile(null);
        };
    }, [id]);

    const handleUpdate = () => {
        console.log("Updated Profile:", updatedProfile);

        // Update user profile information in the database
        const db = getDatabase();
        const userRef = ref(db, `users/${id}`);

        set(userRef, updatedProfile)
            .then(() => {
                console.log('User profile updated successfully!');
                setUserProfile(updatedProfile); // Update userProfile state after successful update
            })
            .catch((error) => {
                console.error('Error updating user profile: ', error);
            });
    };



    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav id={id} />
                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
                        <div className=''>
                            <Toaster toastOptions={{ duration: 4000 }} />
                            <Form>
                                <div className="d-flex justify-content-between">
                                    <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>My Profile</h1>
                                </div>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <div className="d-flex">
                                        <Form.Control type="text" name="First" placeholder="First name" value={updatedProfile ? updatedProfile.First : ''} onChange={handleChange} style={{ marginRight: '10px' }} />
                                        <Form.Control type="text" name="Middle" placeholder="Middle name" value={updatedProfile ? updatedProfile.Middle : ''} onChange={handleChange} />
                                        <Form.Control type="text" name="Last" placeholder="Last name" value={updatedProfile ? updatedProfile.Last : ''} onChange={handleChange} style={{ marginLeft: '10px' }} />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={updatedProfile ? updatedProfile.Email : ''} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter address" name='Address' value={updatedProfile ? updatedProfile.Address : ''} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={updatedProfile ? updatedProfile.Password : ''} onChange={handleChange} />
                                </Form.Group>
                                <Button variant="primary" onClick={handleUpdate} style={{ marginTop: '20px' }}>Update Information</Button>
                            </Form>
                        </div>
                    </Box>
                </div>
            </Box>
        </>
    );
}

export default UserProfile;
