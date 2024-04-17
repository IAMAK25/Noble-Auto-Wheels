import { useState } from 'react';
import { database, ref, push, set } from '../../Firebase/firebase';

const AddData = () => {
    const [data, setData] = useState({
        name: '',
        age: '',
    });

    const handleSubmit = async () => {
        try {
            const dataRef = ref(database, 'collectionName'); // Specify the collection or path in the database
            await push(dataRef, data); // Use push to add data with auto-generated unique key
            // Alternatively, you can use set to overwrite data at a specific path:
            // await set(ref(database, 'collectionName/' + newKey), data);
            console.log('Data added successfully!');
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Age"
                value={data.age}
                onChange={(e) => setData({ ...data, age: e.target.value })}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default AddData;
