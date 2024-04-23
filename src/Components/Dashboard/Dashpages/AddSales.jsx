import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { getDatabase, ref, set, onValue, remove } from 'firebase/database'; // Firebase Realtime Database imports
import './Common.css';
import SideNav from '../SideNav';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AddSales = () => {
    const [year, setYear] = useState('');
    const [monthlySales, setMonthlySales] = useState({});
    const [bikeBrand, setBikeBrand] = useState('Yamaha');
    const [bikeSales, setBikeSales] = useState({});
    const [selectedBikeYear, setSelectedBikeYear] = useState('');
    const [selectedBikeCount, setSelectedBikeCount] = useState('');
    const [allData, setAllData] = useState({});

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleChange = (e, monthName) => {
        const value = e.target.value;
        setMonthlySales(prevState => ({
            ...prevState,
            [monthName]: value
        }));
    };

    const handleBikeYearChange = (e) => {
        setSelectedBikeYear(e.target.value);
    };

    const handleBikeCountChange = (e) => {
        setSelectedBikeCount(e.target.value);
    };

    const handleBikeSalesSubmit = (e) => {
        e.preventDefault();

        // Ensure that year is selected
        if (!selectedBikeYear || !selectedBikeCount) {
            console.error("Please select a year and enter the sales count.");
            return;
        }

        // Get a reference to the database
        const db = getDatabase();
        const bikeSalesRef = ref(db, `bike_sales/${selectedBikeYear}/${bikeBrand}`);

        // Write the data to the database
        set(bikeSalesRef, parseInt(selectedBikeCount))
            .then(() => {
                console.log("Bike sales data successfully written to database!");
                // Clear form after submission
                setSelectedBikeYear('');
                setSelectedBikeCount('');
            })
            .catch((error) => {
                console.error("Error writing bike sales data to database: ", error);
            });
    };

    const handleDeleteYearSale = (yearToDelete) => {
        const db = getDatabase();
        const salesRef = ref(db, `sales/${yearToDelete}`);

        // Remove the data from the database
        remove(salesRef)
            .then(() => {
                console.log("Yearly sales data successfully deleted!");
            })
            .catch((error) => {
                console.error("Error deleting yearly sales data: ", error);
            });
    };

    const handleDeleteBikeSale = (yearToDelete, brandToDelete) => {
        const db = getDatabase();
        const bikeSalesRef = ref(db, `bike_sales/${yearToDelete}/${brandToDelete}`);

        // Remove the data from the database
        remove(bikeSalesRef)
            .then(() => {
                console.log("Bike sales data successfully deleted!");
            })
            .catch((error) => {
                console.error("Error deleting bike sales data: ", error);
            });
    };

    useEffect(() => {
        const fetchData = () => {
            const db = getDatabase();
            const salesRef = ref(db, `sales`);

            // Fetch data from the database
            onValue(salesRef, (snapshot) => {
                const data = snapshot.val();
                setAllData(data);
            });

            const bikeSalesRef = ref(db, 'bike_sales');

            // Fetch bike sales data
            onValue(bikeSalesRef, (snapshot) => {
                const data = snapshot.val() || {}; // Ensure data is initialized with an empty object
                console.log("Fetched bike sales data:", data); // Log the fetched data
                setBikeSales(data);
            });
        };
        fetchData();
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
                        {/* <DrawerHeader /> */}
                        <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>Bikes Sales Data</h1>
                        <div className='display-bike'>
                            <div className='form-container'>
                                <h1 className='form-title'>Sales Data of Bike By Years</h1>
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="year">Year:</label>
                                        <select
                                            id="year"
                                            className="form-control"
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                        >
                                            <option value="">Select Year</option>
                                            {[...Array(15)].map((_, index) => (
                                                <option key={index} value={2010 + index}>{2010 + index}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Monthly Sales:</label>
                                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
                                            {monthNames.map((monthName, index) => (
                                                <div key={index} className="col">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={monthlySales[monthName] || ''}
                                                        onChange={(e) => handleChange(e, monthName)}
                                                        placeholder={monthName}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </Form>
                            </div>

                            {/* Display submitted data in tabular form */}
                            <div className='table-container'>
                                <h2>Submitted Data</h2>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            {monthNames.map((monthName, index) => (
                                                <th key={index}>{monthName}</th>
                                            ))}
                                            <th>Action</th> {/* Add this column for delete button */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(allData).map((year, index) => (
                                            <tr key={index}>
                                                <td>{year}</td>
                                                {monthNames.map((monthName, index) => (
                                                    <td key={index}>{allData[year]?.[monthName]}</td>
                                                ))}
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => handleDeleteYearSale(year)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                        <div className='display-bike'>
                            {/* Bike Sales Form */}
                            <div className='form-container'>
                                <h1 className='form-title'>Bike Month Wise Sales Data </h1>
                                <Form onSubmit={handleBikeSalesSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="bikeBrand">Bike Brand:</label>
                                        <select
                                            id="bikeBrand"
                                            className="form-control"
                                            value={bikeBrand}
                                            onChange={(e) => setBikeBrand(e.target.value)}
                                        >
                                            <option value="Select">Select Bike Model</option>
                                            <option value="Yamaha YZF R15 V3">Yamaha YZF R15 V3</option>
                                            <option value="Yamaha FZ S FI">Yamaha FZ S FI</option>
                                            <option value="Yamaha MT-15">Yamaha MT-15</option>
                                            <option value="Yamaha YZF R3">Yamaha YZF R3</option>
                                            <option value="Yamaha Fascino 125">Yamaha Fascino 125</option>
                                            <option value="Yamaha FZ 25">Yamaha FZ 25</option>
                                            <option value="Yamaha Ray ZR 125">Yamaha Ray ZR 125</option>
                                            <option value="Yamaha YZF R1">Yamaha YZF R1</option>
                                            <option value="Yamaha FZ-X">Yamaha FZ-X</option>

                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="bikeYear">Year:</label>
                                        <select
                                            id="bikeYear"
                                            className="form-control"
                                            value={selectedBikeYear}
                                            onChange={handleBikeYearChange}
                                        >
                                            <option value="">Select Year</option>
                                            {[...Array(15)].map((_, index) => (
                                                <option key={index} value={2010 + index}>{2010 + index}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="bikeCount">Sales Count:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="bikeCount"
                                            value={selectedBikeCount}
                                            onChange={handleBikeCountChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </Form>
                            </div>

                            {/* Display Bike Sales Data */}
                            <div className='table-container'>
                                <h2>Bike Sales Data</h2>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Bike Brand</th>
                                            <th>Sales Count</th>
                                            <th>Action</th> {/* Add this column for delete button */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(bikeSales).map(([year, yearData]) =>
                                            Object.entries(yearData).map(([bikeBrand, salesCount]) => (
                                                <tr key={`${year}-${bikeBrand}`}>
                                                    <td>{year}</td>
                                                    <td>{bikeBrand}</td>
                                                    <td>{salesCount}</td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => handleDeleteBikeSale(year, bikeBrand)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                    </Box>
                </div>
            </Box>
        </>
    );
};

export default AddSales;
