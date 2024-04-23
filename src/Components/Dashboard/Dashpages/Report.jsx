import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import SideNav from '../SideNav';
import Chart from 'chart.js/auto';
import { getDatabase, ref, onValue } from 'firebase/database';
import './Common.css'

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Report = () => {
    const [monthlySalesData, setMonthlySalesData] = useState({});
    const [bikeSalesData, setBikeSalesData] = useState({});
    const [selectedYear, setSelectedYear] = useState('');
    const barChartRef = useRef(null); // Ref for the bar chart instance
    const pieChartRef = useRef(null); // Ref for the pie chart instance

    useEffect(() => {
        // Get a reference to the database for monthly sales data
        const db = getDatabase();
        const salesRef = ref(db, 'sales');

        // Fetch data from the database for monthly sales
        onValue(salesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMonthlySalesData(data);
                // Extract years from the data and set the default selected year
                const years = Object.keys(data);
                setSelectedYear(years[0] || ''); // Select the first year by default
            }
        });

        // Get a reference to the database for bike sales data
        const bikeSalesRef = ref(db, 'bike_sales');

        // Fetch data from the database for bike sales
        onValue(bikeSalesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setBikeSalesData(data);
            }
        });
    }, []);

    useEffect(() => {
        if (!selectedYear) return;

        // Extract months and sales from data for the selected year
        const salesData = monthlySalesData[selectedYear] || {};
        const months = Object.keys(salesData).sort((a, b) => {
            const monthOrder = {
                January: 1, February: 2, March: 3, April: 4,
                May: 5, June: 6, July: 7, August: 8,
                September: 9, October: 10, November: 11, December: 12
            };
            return monthOrder[a] - monthOrder[b];
        });

        // Filter out months with empty sales data
        const filteredMonths = months.filter(month => salesData[month] !== '');

        // Get sales data for the filtered months
        const sales = filteredMonths.map(month => salesData[month]);

        // Destroy existing bar chart instance if it exists
        if (barChartRef.current) {
            barChartRef.current.destroy();
        }

        // Update bar chart data
        const barCtx = document.getElementById('monthlySales').getContext('2d');
        barChartRef.current = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: filteredMonths,
                datasets: [{
                    label: 'Monthly Sales',
                    data: sales,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 20 // Customize step size as needed
                        }
                    }
                }
            }
        });
    }, [selectedYear, monthlySalesData]);

    useEffect(() => {
        if (!Object.keys(bikeSalesData).length || !selectedYear) return;

        const sales = bikeSalesData[selectedYear];

        // Destroy existing pie chart instance if it exists
        if (pieChartRef.current) {
            pieChartRef.current.destroy();
        }

        // Update pie chart data
        const pieCtx = document.getElementById('bikeSalesPie').getContext('2d');
        pieChartRef.current = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(sales), // Use bike models as labels
                datasets: [{
                    label: 'Bike Sales by Model',
                    data: Object.values(sales), // Use sales figures as data
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                const value = context.raw || 0;
                                label += value;
                                label += ' (' + (context.parsed * 100).toFixed(0) + '%)';
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }, [selectedYear, bikeSalesData]);







    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '30vw' }}>
                        {/* <DrawerHeader /> */}
                        <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>Reports</h1>
                        {/* Year selection dropdown */}
                        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                            {Object.keys(monthlySalesData).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>

                        <div className='chart-main'>

                            <div className='chart-box'>
                                <h4>All Bikes Sales By Year</h4>
                                <canvas id="monthlySales" width="500" height="500"></canvas>
                            </div>

                            <div className='chart-box'>
                                <h4>Single Bike Sales By Year</h4>
                                <canvas id="bikeSalesPie" width="500" height="500"></canvas>
                            </div>

                        </div>

                    </Box>
                </div>
            </Box>
        </>
    );
};

export default Report;
