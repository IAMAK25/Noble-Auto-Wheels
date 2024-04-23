import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import UserLoginImg from '../Images/admin.png';
import '../css/loginformuser.css';
import { getAuth, signInWithMobileAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { getDatabase, ref, query, equalTo, get, orderByChild } from 'firebase/database';
import { useHistory } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useAuth } from '../../../AuthContext';

const AdminLogin = ({ history }) => {
    // const { login, setUserId } = useAuth();

    const database = getDatabase();
    const auth = getAuth();

    const [mydata, setData] = useState(null);
    const [user, setUser] = useState(
        {
            'Mobile': '',
            'Password': ''
        }
    )

    const handleRegisterClick = () => {
        history.push('/patient-register');
    }

    const getData = (e) => {
        const { value, name } = e.target;
        setUser(() => {
            return {
                ...user,
                [name]: value
            }
        })
    }
    const addData = async (e) => {
        e.preventDefault();
        const phonePattern = /^\d{10}$/;

        const { Mobile, Password } = user;

        if (Mobile === '') {
            toast.error('Mobile feild is  required')
        }
        else if (!phonePattern.test(Mobile)) {
            toast.error('Phone number is incorrect')
        }
        else if (Password === '') {
            toast.error('Password feild is  required')

        } else {
            const usersRef = ref(database, 'admin/');
            const MobileToFind = user.Mobile; // Replace with the Mobile you want to search for
            const queryRef = query(usersRef, orderByChild('Mobile'), equalTo(MobileToFind));

            try {
                const snapshot = await get(queryRef);
                if (snapshot.exists()) {
                    // The user with the specified Mobile was found
                    const userData = snapshot.val();
                    // console.log('User Data:', userData);
                    const userId = Object.keys(userData)[0];
                    // const userKey = '-Nhv1oVpIsKsIrv7ksjP'; // The key of the user data you want to access
                    // console.log(userId);
                    // Assuming you have fetched user data into a variable called userData
                    const userd = userData[userId];

                    if (userd) {
                        if (userd.Password == user.Password) {
                            // localStorage.setItem('userId', userId)
                            // login(userId);
                            // setUserId(userId);
                            history.push("/Report");
                            toast.success('Successfully Logged In!');
                        } else {
                            toast.error('Password and Mobile is Incorrect');
                        }
                    } else {
                        toast.error('user Not Found')
                    }


                } else {
                    console.log('User not found.');
                }
            } catch (error) {
                console.error('Error finding user data:', error);
            }
        }
    };


    const forgotPasswordRedirect = () => {
        history.push('/ForgotPasswordPatient');
    }
    return (
        <div className='container-fluid'>
            <ToastContainer />
            <div className='row'>
                <div className='col-md-12 col-xl-6 col-xxl-6 col-sm-12'>
                    <div className='container w-75 d-flex align-items-center justify-content-center'>
                        <div className='text-primary'>
                            <h2 className='text-center' style={{ marginTop: '10vh', textAlign: 'center' }}>Welcome Admin</h2>
                            <p className='mt-0 pt-0 text-center ' color='#135078'>
                                Log in to explore our latest bike collection, schedule test rides, and stay connected with your biking journey. Your satisfaction, our priority  </p>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-center'>
                        <Form style={{ width: '70%', padding: '3vh' }}>
                            <Form.Group className="mb-3" controlId="formBasicMobile">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="Mobile" placeholder="Enter Mobile" onChange={getData} name='Mobile' className="input-background-color" />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={getData} name='Password' className="input-background-color" />
                            </Form.Group>

                            <div>
                                <Button className='btn btn-primary w-100' onClick={addData} variant="primary" type="submit">
                                    Login
                                </Button>
                            </div>

                        </Form>
                    </div>
                </div>
                <div className='col-md-12 col-xl-6 col-xxl-6 col-sm-12'>
                    <img src={UserLoginImg} style={{ maxWidth: '70%', height: 'auto' }} />
                </div>
            </div>
        </div>
    );
}

export default withRouter(AdminLogin);
