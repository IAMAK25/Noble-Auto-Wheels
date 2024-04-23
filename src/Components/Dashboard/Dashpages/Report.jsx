import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import SideNav from '../SideNav';
import Chart from 'chart.js/auto';
import { getDatabase, ref, onValue } from 'firebase/database'; // Firebase Realtime Database imports

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Report = () => {
    const [monthlySalesData, setMonthlySalesData] = useState({});
    const [selectedYear, setSelectedYear] = useState('');
    const chartRef = useRef(null); // Ref for the chart instance

    useEffect(() => {
        // Get a reference to the database
        const db = getDatabase();
        const salesRef = ref(db, 'sales');

        // Fetch data from the database
        onValue(salesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMonthlySalesData(data);
                // Extract years from the data and set the default selected year
                const years = Object.keys(data);
                setSelectedYear(years[0] || ''); // Select the first year by default
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

        // Destroy existing chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Update bar chart data
        const barCtx = document.getElementById('monthlySales').getContext('2d');
        chartRef.current = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: filteredMonths,
                datasets: [{
                    label: 'Bike Sales per Month',
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

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '35vw' }}>
                        <DrawerHeader />
                        <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>Reports</h1>
                        {/* Year selection dropdown */}
                        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                            {Object.keys(monthlySalesData).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        {/* Bar chart canvas */}
                        <canvas id="monthlySales" width="400" height="400"></canvas>
                    </Box>
                </div>
            </Box>
        </>
    );
};

export default Report;
