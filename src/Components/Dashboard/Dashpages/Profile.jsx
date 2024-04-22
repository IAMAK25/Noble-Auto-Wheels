import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import dp from '../../Images/dp.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { auth, app, storage, database } from '../../Firebase/firebase';
import { getDownloadURL, ref as ref_storage, uploadBytes, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { getDatabase, ref, get, set, onValue } from 'firebase/database';
import './Profile.css';
import SideNav from '../SideNav';
import { toast, Toaster } from "react-hot-toast";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Profile = () => {

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav />

                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
                        <DrawerHeader />
                        <div className=''>
                            <Toaster toastOptions={{ duration: 4000 }} />
                            <Form >
                                <div className="d-flex justify-content-between">
                                    <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>My Profile</h1>
                                    {/* <h5>Form Status: {formStatus}</h5> */}
                                </div>

                            </Form>
                        </div>
                    </Box>
                </div>
            </Box>
        </>
    )
}

export default Profile 