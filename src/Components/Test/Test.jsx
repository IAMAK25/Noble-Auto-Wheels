import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { db } from '../Firebase/firebase';
import { Button } from '@mui/material';

function Test() {
    const [fname, setFname] = useState('');

    const fetchData = async () => {
        const userRef = ref(db, 'users/ajay/fname');

        try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                setFname(snapshot.val());
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div>Test</div>
            <div>Fname: {fname}</div>
            <Button variant="contained" onClick={fetchData}>Fetch Data</Button>
        </>
    );
}

export default Test;
