import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getDatabase, ref, onValue } from 'firebase/database';
import './Profile.css';
import SideNav from '../SideNav';
import PrintReceiptModal from './PrintReceiptModal';

const DisplayData = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const customersRef = ref(db, 'customers');
                onValue(customersRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const customerArray = Object.values(data);
                        setCustomers(customerArray);
                    } else {
                        setCustomers([]);
                    }
                });
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePrintReceipt = (customer) => {
        setSelectedCustomer(customer);
    };

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <SideNav />
            <div>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
                    <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>Customers Details</h1>
                    <div className=''>
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
                                    <th>Date of Birth</th>
                                    <th>Address</th>
                                    <th>Bike Model</th>
                                    <th>Mobile</th>
                                    <th>Price</th>
                                    <th>Purchase Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((customer, index) => (
                                    <tr key={index}>
                                        <td>{customer.name}</td>
                                        <td>{customer.dob}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.bikeModel}</td>
                                        <td>{customer.mobile}</td>
                                        <td>{customer.price}</td>
                                        <td>{customer.purchaseDate}</td>
                                        <td>
                                            <Button onClick={() => handlePrintReceipt(customer)}>Print Receipt</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Box>
            </div>
            <PrintReceiptModal
                customer={selectedCustomer}
                onHide={() => setSelectedCustomer(null)}
            />
        </Box>
    );
};

const PrintReceiptModalDisplay = ({ customer, onHide }) => {
    return (
        <Modal show={customer !== null} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Print Receipt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {customer && (
                    <>
                        <p>Name: {customer.name}</p>
                        <p>Date of Birth: {customer.dob}</p>
                        <p>Address: {customer.address}</p>
                        <p>Bike Model: {customer.bikeModel}</p>
                        <p>Mobile: {customer.mobile}</p>
                        <p>Price: {customer.price}</p>
                        <p>Purchase Date: {customer.purchaseDate}</p>
                        {/* Add additional receipt information here */}
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={() => window.print()}>Print</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DisplayData;
