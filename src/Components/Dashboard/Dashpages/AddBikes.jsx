import React, { useState, useEffect } from 'react'; // Import useEffect
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SideNav from '../SideNav';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { storage, database, ref as rtdbRef, push, set, uploadBytesResumable, getDownloadURL } from '../../Firebase/firebase'; // Corrected import for database ref
import { ref as storageRef } from 'firebase/storage'; // Import storage ref function
import { onValue, child } from 'firebase/database';

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
        images: [] // Store uploaded images
    });
    const [displayedBikes, setDisplayedBikes] = useState([]);

    // const fetchData = async () => {
    //     try {
    //         const bikesRef = rtdbRef(database, 'bikes'); // Check if 'bikes' is correctly defined
    //         onValue(child(bikesRef), (snapshot) => { // Check if 'bikesRef' is valid
    //             const bikes = snapshot.val();
    //             if (bikes) {
    //                 const bikesArray = Object.keys(bikes).map((key) => ({
    //                     id: key,
    //                     ...bikes[key]
    //                 }));
    //                 setDisplayedBikes(bikesArray);
    //             } else {
    //                 setDisplayedBikes([]); // Reset displayedBikes if no data
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Error fetching bikes:', error);
    //     }
    // };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const bikesRef = rtdbRef(database, '/bikes/'); // Ensure 'bikes' path is correctly defined
                onValue(child(bikesRef), (snapshot) => {
                    const bikes = snapshot.val();
                    if (bikes) {
                        const bikesArray = Object.keys(bikes).map((key) => ({
                            id: key,
                            ...bikes[key]
                        }));
                        setDisplayedBikes(bikesArray);
                    } else {
                        setDisplayedBikes([]);
                    }
                });
            } catch (error) {
                console.error('Error fetching bikes:', error);
            }
        };


        fetchData(); // Call fetchData when the component mounts
    }, []); // Empty d

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBike((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewBike((prevState) => ({
            ...prevState,
            images: [...prevState.images, ...files] // Add new files to existing ones
        }));
    };

    const handleSubmit = async () => {
        try {
            // Push new bike data to the database
            const bikesRef = rtdbRef(database, 'bikes'); // Use rtdbRef for Realtime Database reference
            const newBikeRef = push(bikesRef);
            const bikeId = newBikeRef.key;
            await set(newBikeRef, newBike);

            // Upload images to Firebase Storage
            const imageUrls = [];
            await Promise.all(newBike.images.map(async (image) => {
                const imageRef = storageRef(storage, `bikes/${bikeId}/${uuidv4()}`);
                await uploadBytesResumable(imageRef, image);
                const imageUrl = await getDownloadURL(imageRef);
                imageUrls.push(imageUrl);
            }));

            // Update bike data with the image URLs in the database
            await set(rtdbRef(database, `bikes/${bikeId}/imageUrls`), imageUrls); // Use rtdbRef for Realtime Database reference

            // Reset form state
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
                        </div>
                        <div>
                            <h2>Displayed Bikes</h2>
                            <table>
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
                                        <th>Images</th>
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
                                            <td>{bike.description}</td>
                                            <td>
                                                {bike.imageUrls && bike.imageUrls.map((url, i) => (
                                                    <img key={i} src={url} alt={`Bike ${bike.name} Image ${i + 1}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '5px' }} />
                                                ))}
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
