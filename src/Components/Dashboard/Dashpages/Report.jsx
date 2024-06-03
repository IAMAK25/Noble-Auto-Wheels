import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import SideNav from '../SideNav';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import { getDatabase, ref, onValue } from 'firebase/database';
import './Common.css';
import { linearRegression, linearRegressionLine } from 'simple-statistics';

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
    const [selectedYear1, setSelectedYear1] = useState('');
    const [selectedYear2, setSelectedYear2] = useState('');
    const [selectedBikeBrand, setSelectedBikeBrand] = useState('');
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const radarChartRef = useRef(null);

    useEffect(() => {
        // Fetch monthly sales data and bike sales data from Firebase
        const fetchData = async () => {
            const db = getDatabase();
            const salesRef = ref(db, 'sales');
            const bikeSalesRef = ref(db, 'bike_sales');

            // Fetch data for monthly sales
            onValue(salesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setMonthlySalesData(data);
                    // Extract years from the data and set the default selected year
                    const years = Object.keys(data);
                    setSelectedYear1(years[0] || ''); // Select the first year by default for first dropdown
                    setSelectedYear2(years[0] || ''); // Select the first year by default for second dropdown
                }
            });

            // Fetch data for bike sales
            onValue(bikeSalesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setBikeSalesData(data);
                    // Extract bike brands from the data and set the default selected bike brand
                    const bikeBrands = Object.keys(data);
                    setSelectedBikeBrand(bikeBrands[0] || ''); // Select the first bike brand by default
                }
            });
        };

        fetchData();
    }, []);

    const calculateTrendLine = (months, sales) => {
        const monthIndices = months.map((_, i) => i + 1);
        const regression = linearRegression(monthIndices.map((x, i) => [x, sales[i]]));
        const regressionLine = linearRegressionLine(regression);
        return monthIndices.map(x => regressionLine(x));
    };

    useEffect(() => {
        if (!selectedYear1 || !selectedYear2) return;

        // Extract months and sales from data for the selected years
        const salesData1 = monthlySalesData[selectedYear1] || {};
        const salesData2 = monthlySalesData[selectedYear2] || {};
        const months1 = Object.keys(salesData1).sort((a, b) => {
            const monthOrder = {
                January: 1, February: 2, March: 3, April: 4,
                May: 5, June: 6, July: 7, August: 8,
                September: 9, October: 10, November: 11, December: 12
            };
            return monthOrder[a] - monthOrder[b];
        });
        const months2 = Object.keys(salesData2).sort((a, b) => {
            const monthOrder = {
                January: 1, February: 2, March: 3, April: 4,
                May: 5, June: 6, July: 7, August: 8,
                September: 9, October: 10, November: 11, December: 12
            };
            return monthOrder[a] - monthOrder[b];
        });
        const filteredMonths1 = months1.filter(month => salesData1[month] !== '');
        const filteredMonths2 = months2.filter(month => salesData2[month] !== '');
        const sales1 = filteredMonths1.map(month => parseFloat(salesData1[month]));
        const sales2 = filteredMonths2.map(month => parseFloat(salesData2[month]));

        // Calculate trend line
        const trendLine = calculateTrendLine(filteredMonths1, sales1);

        // Destroy existing bar chart instance if it exists
        if (barChartRef.current) {
            barChartRef.current.destroy();
        }

        // Update bar chart data
        const barCtx = document.getElementById('monthlySalesBar').getContext('2d');
        barChartRef.current = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: filteredMonths1,
                datasets: [{
                    label: selectedYear1,
                    data: sales1,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }, {
                    type: 'line',
                    label: 'Trend Line',
                    data: trendLine,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                    borderWidth: 2,
                    pointRadius: 0 // Hides the points on the trend line
                }]
            },
            options: {
                plugins: {
                    datalabels: {
                        color: 'black'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 20,
                            callback: function (value) {
                                return value.toFixed(0); // Format values to avoid scientific notation
                            }
                        },
                        suggestedMin: 0,
                        suggestedMax: Math.max(...sales1, ...sales2) + 10 // Set max value slightly higher than the maximum data value
                    }
                }
            }
        });

        // Destroy existing pie chart instance if it exists
        if (pieChartRef.current) {
            pieChartRef.current.destroy();
        }

        // Update pie chart data
        const pieCtx = document.getElementById('bikeSalesPie').getContext('2d');
        pieChartRef.current = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(bikeSalesData[selectedBikeBrand] || {}),
                datasets: [{
                    label: selectedBikeBrand,
                    data: Object.values(bikeSalesData[selectedBikeBrand] || {}),
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

        // Destroy existing radar chart instance if it exists
        if (radarChartRef.current) {
            radarChartRef.current.destroy();
        }

        // Update radar chart data
        const radarCtx = document.getElementById('monthlySalesRadar').getContext('2d');
        radarChartRef.current = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: filteredMonths2,
                datasets: [{
                    label: selectedYear2,
                    data: sales2,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }, {
                    label: selectedYear1,
                    data: sales1,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }, [selectedYear1, selectedYear2, monthlySalesData, selectedBikeBrand, bikeSalesData]);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '30vw' }}>
                        <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>Reports</h1>
                        {/* Year selection dropdowns */}
                        <div className='dropdown-container'>
                            <div className='dropdown'>
                                <label htmlFor="year1">Select Year 1: </label>
                                <select id="year1" className='select' value={selectedYear1} onChange={(e) => setSelectedYear1(e.target.value)}>
                                    {Object.keys(monthlySalesData).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='dropdown'>
                                <label htmlFor="year2">Select Year 2: </label>
                                <select id="year2" className='select' value={selectedYear2} onChange={(e) => setSelectedYear2(e.target.value)}>
                                    {Object.keys(monthlySalesData).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Bike brand selection dropdown for pie chart */}
                        <div className='dropdown'>
                            <label htmlFor="bikeBrand">Select Bike Brand for Pie Chart: </label>
                            <select id="bikeBrand" className='select' value={selectedBikeBrand} onChange={(e) => setSelectedBikeBrand(e.target.value)}>
                                {Object.keys(bikeSalesData).map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>

                        <div className='chart-main'>
                            <div className='chart-box'>
                                <h4>Monthly Sales Bar Chart</h4>
                                <canvas id="monthlySalesBar" width="400" height="400"></canvas>
                            </div>

                            <div className='chart-box'>
                                <h4>Bike Sales Pie Chart</h4>
                                <canvas id="bikeSalesPie" width="400" height="300"></canvas>
                            </div>

                            <div className='chart-box'>
                                <h4>Monthly Sales Radar Chart</h4>
                                <canvas id="monthlySalesRadar" width="400" height="300"></canvas>
                            </div>
                        </div>
                    </Box>
                </div>
            </Box>
        </>
    );
};

export default Report;
