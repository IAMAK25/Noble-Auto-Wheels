import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLoginImg from '../Images/regUser.jpg'; // import your admin login image
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';

const AdminLogin = ({ history }) => {
    const database = getDatabase();

    const [adminCredentials, setAdminCredentials] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminCredentials({ ...adminCredentials, [name]: value });
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        const adminsRef = ref(database, 'admins');
        const queryRef = query(adminsRef, orderByChild('username'), equalTo(adminCredentials.username));

        try {
            const snapshot = await get(queryRef);
            if (snapshot.exists()) {
                const adminData = snapshot.val();
                const adminId = Object.keys(adminData)[0];
                const admin = adminData[adminId];

                if (admin.password === adminCredentials.password) {
                    // Successful login, navigate to admin dashboard
                    history.push('/test');
                    toast.success('Logged in successfully!');
                } else {
                    // Invalid password
                    toast.error('Invalid password!');
                }
            } else {
                // Admin not found
                toast.error('Admin not found!');
            }
        } catch (error) {
            console.error('Error finding admin data:', error);
        }
    };


    const handleRegisterClick = () => {
        // Redirect to admin registration page
        history.push('/admin/register');
    };

    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="row">
                <div className="col-md-6">
                    <div className="container">
                        <h2 className="text-center">Admin Login</h2>
                        <p className="text-center">Please enter your credentials to log in</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <Form style={{ width: '70%', padding: '3vh' }}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    name="username"
                                    value={adminCredentials.username}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={adminCredentials.password}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <div className="text-end">
                                <Button
                                    className="btn btn-primary w-100"
                                    onClick={handleAdminLogin}
                                    variant="primary"
                                    type="submit">
                                    Login
                                </Button>
                            </div>
                            <div>
                                <button
                                    style={{ border: 'none', background: 'white', marginLeft: '0' }}
                                    onClick={handleRegisterClick}>
                                    <p>Don't have an Account? Register</p>
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="col-md-6">
                    <img src={AdminLoginImg} alt="Admin login" style={{ maxWidth: '80%', height: 'auto' }} />
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
