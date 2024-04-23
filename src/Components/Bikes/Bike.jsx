import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getDatabase, ref, onValue, off } from 'firebase/database'; // Import off function for removing listener
import './BikeList.css'; // Import CSS file for styling
import { Button } from 'react-bootstrap';

function Bike() {
    const history = useHistory(); // Access the history object

    const [bikes, setBikes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const db = getDatabase();
        const bikesRef = ref(db, 'bikes');

        const handleData = (snapshot) => {
            try {
                const bikesData = snapshot.val();
                if (bikesData) {
                    const bikesArray = Object.keys(bikesData).map(key => ({ id: key, ...bikesData[key] }));
                    setBikes(bikesArray);
                } else {
                    setBikes([]);
                }
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        const onError = (error) => {
            setError(error);
            setLoading(false);
        };

        const bikesListener = onValue(bikesRef, handleData, { errorCallback: onError });

        // Clean up function to remove the Firebase listener when the component unmounts
        return () => {
            off(bikesRef, 'value', handleData); // Remove the listener when the component unmounts
        };
    }, []);



    // Filter bikes based on search term
    const filteredBikes = bikes.filter(bike => {
        return bike.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleDetailPage = (id) => {
        history.push(`/Details/${id}`); // Navigate to the details page
    }

    return (
        <div className='mainList'>
            <h3>Popular Bikes by Noble Auto Wheels</h3>
            <input
                type="text"
                placeholder="Search bikes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <div className="bike-list">
                {filteredBikes.map(bike => (
                    <div className="bike-card" key={bike.id}>
                        <div className="bike-image">
                            <img src={bike.imageUrls[0]} alt={bike.name} />
                        </div>
                        <div className="bike-info">
                            <h2>{bike.name}</h2>
                            <p>Price: ${bike.price}</p>
                            {/* Use an arrow function to pass the id */}
                            <Button onClick={() => handleDetailPage(bike.id)} className="view-button">View Bike</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bike;
