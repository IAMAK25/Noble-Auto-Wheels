import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import dp from '../../Images/dp.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { auth, app, storage, database } from '../../Firebase/firebase';
import { getDownloadURL, ref as ref_storage, uploadBytes, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { getDatabase, ref, get, set, onValue } from 'firebase/database';
import './Profile.css';
import SideNav from '../SideNav';
import { toast, Toaster } from "react-hot-toast";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Profile = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [getUrl, setgetUrl] = useState('');
    const [getUrlClinic, setgetUrlClinic] = useState('');

    const { id } = useParams();


    const [image, setImage] = useState("")
    const [user, setUser] = useState({
        Prefix: '',
        First: '',
        Middle: '',
        Last: '',
        Email: '',
        Mobile: '',
        Discription: '',
        Qualification1: '',
        Speciality: '',
        Speciality2: '',
        Speciality3: '',
        Speciality4: '',
        ClinicName: '',
        ClinicAddress: '',
        City: '',
        State: '',
        Description: '',
        Locality: '',
        Experience: '',
        Country: '',
        MorStartTime: '',
        MorEndTime: '',
        EveStartTime: '',
        EveEndTime: '',
        DateOfBirth: '',
        Age: ''
    })
    const [formValues, setFormValues] = useState({});

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const putData = (key, data) => set(ref(database, key), data);

    useEffect(() => {
        const fetchClinicData = async () => {
            try {
                const clinicSnapshot = await get(ref(database, `Profile/${id}/Clinic`));
                if (clinicSnapshot.exists()) {
                    const clinicData = clinicSnapshot.val();
                    const clinicUrls = clinicData.urls || []; // assuming the URLs are stored in an array
                    setClinicImageUrls(clinicUrls);
                }
            } catch (error) {
                console.error('Error fetching clinic data:', error);
            }
        };

        // Fetch clinic data on component mount
        fetchClinicData();
    }, [id]);


    const handleImageUpload = async () => {
        if (imageFile) {
            const imgRef = ref_storage(storage, `Profile/${id}/Profile`);
            const uploadTask = uploadBytesResumable(imgRef, imageFile);
            //Handle the promise returned by uploadBytesResumable
            uploadTask
                .then((snapshot) => {
                    console.log('Upload complete', snapshot);

                    // Use snapshot.ref instead of data.ref_storage
                    getDownloadURL(snapshot.ref).then((url) => {
                        // setUrl(url);
                        setImageUrl(url);

                        console.log('Download URL:', url);
                        alert("Data uploaded succesfully, Please refresh the page")
                        putData(`Profile/${id}/Profile`, { url: url })
                        // console.log(text1);
                    });
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                });
        }
        else {
            alert("Please Choose Image for profile")
        }
    };


    const handleImageDelete = async (index) => {
        if (clinicImageUrls.length > 0) {
            const imgRef = ref_storage(storage, `Profile/${id}/Clinic/${clinicImageUrls[index].name}`);

            try {
                await deleteObject(imgRef);

                // Remove the deleted image URL from the state
                const updatedClinicImageUrls = clinicImageUrls.filter((_, i) => i !== index);
                setClinicImageUrls(updatedClinicImageUrls);

                // Update your API to remove the deleted image URL from the data
                putData(`Profile/${id}/Clinic`, { urls: updatedClinicImageUrls });

                alert('Image deleted successfully');
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        } else {
            alert("No image to delete");
        }
    };


    const handleProfileDelete = async () => {
        if (getUrl) {
            const imgRef = ref_storage(storage, `Profile/${id}/Profile`);
            try {
                await deleteObject(imgRef);
                setImageUrl(null);
                alert('Image deleted successfully, Please refresh the page');

                // Remove the URL from your data in the API
                putData(`Profile/${id}/Profile`, { url: null });
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        } else {
            alert("No image to delete");
        }
    };


    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12) || 12; // Convert 0 to 12
        return `${formattedHours}:${minutes} ${period}`;
    };


    const [imageFiles, setImageFiles] = useState([]);
    const [clinicImageUrls, setClinicImageUrls] = useState([]);
    const [clinicImageFiles, setClinicImageFiles] = useState([]);

    const handleClinicImageChange = (e) => {
        const files = e.target.files;
        setClinicImageFiles(files);
    };


    const handleClinicImageUpload = async () => {
        if (clinicImageFiles.length > 0) {
            const newImageUrls = [];

            // Loop through each selected clinic image file
            for (const clinicImageFile of clinicImageFiles) {
                const imgRef = ref_storage(storage, `Profile/${id}/Clinic/${clinicImageFile.name}`);
                const uploadTask = uploadBytesResumable(imgRef, clinicImageFile);

                try {
                    const snapshot = await uploadTask;
                    console.log('Upload complete', snapshot);

                    // Use snapshot.ref instead of data.ref_storage
                    const url = await getDownloadURL(snapshot.ref);
                    newImageUrls.push(url);
                } catch (error) {
                    console.error('Error uploading clinic image:', error);
                }
            }

            // Update state with the new clinic image URLs
            setClinicImageUrls([...clinicImageUrls, ...newImageUrls]);

            // Update your API data with the new clinic image URLs
            putData(`Profile/${id}/Clinic`, { urls: clinicImageUrls });
        } else {
            alert('Please choose at least one image for the clinic');
        }
    };

    const handleClinicImageDelete = (index) => {
        const updatedClinicImageUrls = [...clinicImageUrls];
        updatedClinicImageUrls.splice(index, 1);

        // Update state with the updated clinic image URLs
        setClinicImageUrls(updatedClinicImageUrls);

        // Update your API data with the updated clinic image URLs
        putData(`Profile/${id}/Clinic`, { urls: updatedClinicImageUrls });
    };


    useEffect(() => {

        onValue(ref(database, `Profile/${id}/Profile`), (snapshot) => {
            if (snapshot.exists()) {
                setgetUrl(snapshot.val().url);

            } else {
                // Handle the case when the data doesn't exist
                console.error(`Data for License/${id}/1 does not exist.`);
            }
        });

        onValue(ref(database, `Profile/${id}/Clinic`), (snapshot) => {
            if (snapshot.exists()) {
                setgetUrlClinic(snapshot.val().url);

            } else {
                // Handle the case when the data doesn't exist
                console.error(`Data for License/${id}/1 does not exist.`);
            }
        });


        // Fetch existing data from Firebase on component mount
        const fetchData = async () => {
            try {
                if (id) {
                    const databaseRef = getDatabase(app);

                    // Use the ref function on the database reference
                    const snapshot = await get(ref(databaseRef, `doctor/${id}`));
                    const fetchedData = snapshot.val();

                    if (fetchedData) {
                        console.log('Fetched Data:', fetchedData.Description);
                        setUser(fetchedData);
                        setFormValues(fetchedData);
                        // console.log(fetchedData);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };



        fetchData();
    }, []);

    useEffect(() => {

    }, [formValues, setFormValues])


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get a reference using database.ref()
            const userRef = ref(database, 'doctor/' + id);

            // Use the set function on the reference object
            await set(userRef, formValues);

            toast.success("Profile Updated Successfully..!");

            if (imageFile) {
                await handleImageUpload();

                // Update the user data with the image URL
                setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    image: imageUrl,
                }));
            }

            // Update the user data without the image URL
            await set(userRef, formValues);

            toast.success('Profile Updated Successfully..!');


        } catch (error) {
            toast.error('Error updating profile data');
        }
    };


    const data = (e) => {
        const { value, name } = e.target;
        setFormValues((prevFormValues) => {
            return {
                ...prevFormValues,
                [name]: value
            };
        });
    };

    const history = useHistory();
    const [loading, setLoading] = useState(false); // Add loading state
    const handleLogout = async () => {
        try {
            setLoading(true);
            await auth.signOut();
            setLoading(false);
            // You can redirect to the login page or any other desired behavior after logout
            history.replace('/');
        } catch (error) {
            setLoading(false);
            console.error('Error logging out:', error);
        }
    };

    const handleNext = () => {
        history.push(`/Licence/${id}`)
    }
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav />

                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
                        <DrawerHeader />
                        <div className=''>
                            <Toaster toastOptions={{ duration: 4000 }} />
                            <Form onSubmit={handleSubmit}>
                                <div className="d-flex justify-content-between">
                                    <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>My Profile</h1>
                                    {/* <h5>Form Status: {formStatus}</h5> */}
                                </div>

                            </Form>
                        </div>
                    </Box>
                </div>
            </Box>
        </>
    )
}

export default Profile 