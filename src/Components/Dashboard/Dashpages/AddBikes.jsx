import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SideNav from '../SideNav';
import { useParams, } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { storage, database, ref as rtdbRef, push, set, uploadBytesResumable, getDownloadURL } from '../../Firebase/firebase';
import { ref as storageRef } from 'firebase/storage';
import { onValue, child } from 'firebase/database';
import toast from 'react-hot-toast';
import './Common.css'

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AddBikes = () => {
    const { id } = useParams();
    const [newBike, setNewBike] = useState({
        name: '',
        price: '',
        engine: '',
        torque: '',
        power: '',
        mileage: '',
        brakes: '',
        weight: '',
        description: '',
        images: []
    });
    const [displayedBikes, setDisplayedBikes] = useState([]);

    useEffect(() => {
        const bikesRef = rtdbRef(database, '/bikes/');
        onValue(bikesRef, (snapshot) => {
            const bikesData = snapshot.val();
            if (bikesData) {
                const bikesArray = Object.keys(bikesData).map(key => ({ id: key, ...bikesData[key] }));
                setDisplayedBikes(bikesArray);
            } else {
                setDisplayedBikes([]);
            }
        });
    }, []);

    const handleEditBike = (id) => {
        // Implement logic to edit the bike with the given id
        console.log('Editing bike with id:', id);
    };

    const handleDeleteBike = async (bikeId) => {
        try {
            const bikeRef = rtdbRef(database, `bikes/${bikeId}`);
            await set(bikeRef, null); // Set the value to null to delete the data
            console.log('Bike deleted successfully!');
        } catch (error) {
            console.error('Error deleting bike:', error);
        }
    };

    const handleInputChange = (e) => {
        // Handle input change
        const { name, value } = e.target;
        setNewBike((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        // Handle image change
        const files = Array.from(e.target.files);
        setNewBike((prevState) => ({
            ...prevState,
            images: [...prevState.images, ...files]
        }));
    };

    const handleSubmit = async () => {
        // Handle form submission
        try {
            const bikesRef = rtdbRef(database, 'bikes');
            const newBikeRef = push(bikesRef);
            const bikeId = newBikeRef.key;
            await set(newBikeRef, newBike);

            const imageUrls = [];
            await Promise.all(newBike.images.map(async (image) => {
                const imageRef = storageRef(storage, `bikes/${bikeId}/${uuidv4()}`);
                await uploadBytesResumable(imageRef, image);
                const imageUrl = await getDownloadURL(imageRef);
                imageUrls.push(imageUrl);
            }));

            await set(rtdbRef(database, `bikes/${bikeId}/imageUrls`), imageUrls);

            setNewBike({
                name: '',
                price: '',
                engine: '',
                torque: '',
                power: '',
                mileage: '',
                brakes: '',
                weight: '',
                description: '',
                url: '',
                images: []
            });

            console.log('Bike added successfully!');
        } catch (error) {
            console.error('Error adding bike:', error);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
                        <DrawerHeader />
                        <div className=''>
                            <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>Bikes Information</h1>
                            <Form>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Bike Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Enter bike name"
                                            value={newBike.name}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group className="mb-3" controlId="formPrice">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="price"
                                                    placeholder="Enter bike price"
                                                    value={newBike.price}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group className="mb-3" controlId="formEngine">
                                                <Form.Label>Engine</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="engine"
                                                    placeholder="Enter engine details"
                                                    value={newBike.engine}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group className="mb-3" controlId="formTorque">
                                                <Form.Label>Torque</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="torque"
                                                    placeholder="Enter torque details"
                                                    value={newBike.torque}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group className="mb-3" controlId="formPower">
                                                <Form.Label>Power</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="power"
                                                    placeholder="Enter power details"
                                                    value={newBike.power}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group className="mb-3" controlId="formMileage">
                                                <Form.Label>Mileage</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="mileage"
                                                    placeholder="Enter mileage details"
                                                    value={newBike.mileage}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group className="mb-3" controlId="formBrakes">
                                                <Form.Label>Brakes</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="brakes"
                                                    placeholder="Enter brake details"
                                                    value={newBike.brakes}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group className="mb-3" controlId="formWeight">
                                                <Form.Label>Weight</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="weight"
                                                    placeholder="Enter weight details"
                                                    value={newBike.weight}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group className="mb-3" controlId="formWeight">
                                                <Form.Label>Youtube Link</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="weight"
                                                    placeholder="Enter YouTube Video Link"
                                                    value={newBike.url}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <Form.Group className="mb-3" controlId="formDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="description"
                                            placeholder="Enter description"
                                            value={newBike.description}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formImages">
                                        <Form.Label>Images</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="images"
                                            multiple // Allow multiple file selection
                                            onChange={handleImageChange}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>

                                </Form>
                            </Form>
                        </div>
                        <div className='display-bike'>
                            <h2>Displayed Bikes</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Engine</th>
                                        <th>Torque</th>
                                        <th>Power</th>
                                        <th>Mileage</th>
                                        <th>Brakes</th>
                                        <th>Weight</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedBikes.map((bike) => (
                                        <tr key={bike.id}>
                                            <td>{bike.name}</td>
                                            <td>{bike.price}</td>
                                            <td>{bike.engine}</td>
                                            <td>{bike.torque}</td>
                                            <td>{bike.power}</td>
                                            <td>{bike.mileage}</td>
                                            <td>{bike.brakes}</td>
                                            <td>{bike.weight}</td>
                                            <td>{bike.description.length > 50 ? `${bike.description.slice(0, 50)}...` : bike.description}</td>
                                            <td>
                                                {/* <Button variant="info" onClick={() => handleEditBike(bike.id)}>Edit</Button> */}
                                                <Button variant="danger" onClick={() => handleDeleteBike(bike.id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </div>
            </Box>
        </>
    );
};

export default AddBikes;
