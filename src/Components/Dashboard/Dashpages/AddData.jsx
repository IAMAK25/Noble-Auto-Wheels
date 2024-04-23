import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getDatabase, ref, set } from 'firebase/database';
import { useHistory } from 'react-router-dom';
import './Profile.css';
import SideNav from '../SideNav';
import { Toaster, toast } from "react-hot-toast";

const AddData = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        address: '',
        bikeModel: '',
        mobile: '',
        price: '',
        purchaseDate: '' // Add purchaseDate field
    });
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const db = getDatabase();
            await set(ref(db, 'customers/' + formData.mobile), formData);
            toast.success('Data stored successfully!');
            // Redirect to another module or do anything after successful submission
            // history.push('/display-data');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <SideNav />
            <div>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
                    <div className=''>
                        <Toaster toastOptions={{ duration: 4000 }} />
                        <Form onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-between">
                                <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>Insert Customer Details</h1>
                            </div>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDob">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="date" placeholder="Enter date of birth" name="dob" value={formData.dob} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter address" name="address" value={formData.address} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBikeModel">
                                <Form.Label>Bike Model</Form.Label>
                                {/* Replace the options with your bike models */}
                                <Form.Control as="select" name="bikeModel" value={formData.bikeModel} onChange={handleChange} required>
                                    <option value="">Select bike model</option>
                                    <option value="Yamaha YZF R15 V3">Yamaha YZF R15 V3</option>
                                    <option value="Yamaha FZ S FI">Yamaha FZ S FI</option>
                                    <option value="Yamaha MT-15">Yamaha MT-15</option>
                                    <option value="Yamaha YZF R3">Yamaha YZF R3</option>
                                    <option value="Yamaha Fascino 125">Yamaha Fascino 125</option>
                                    <option value="Yamaha FZ 25">Yamaha FZ 25</option>
                                    <option value="Yamaha Ray ZR 125">Yamaha Ray ZR 125</option>
                                    <option value="Yamaha YZF R1">Yamaha YZF R1</option>
                                    <option value="Yamaha FZ-X">Yamaha FZ-X</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="tel" placeholder="Enter mobile number" name="mobile" value={formData.mobile} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Enter price" name="price" value={formData.price} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPurchaseDate">
                                <Form.Label>Purchase Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter purchase date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} required />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Box>
            </div>
        </Box>
    )
}

export default AddData;
