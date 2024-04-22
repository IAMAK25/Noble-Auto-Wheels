import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import userRegisterImg from '../../image/userRegisterImg.jpg';
import Form from 'react-bootstrap/Form';
import { BsTelephoneFill, BsShieldLockFill } from 'react-icons/bs';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { GrLinkNext } from 'react-icons/gr';
import PhoneInput from "react-phone-input-2";
import OTPInput from 'otp-input-react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { auth, app } from '../../Firebase/firebase.config';
import firebase from 'firebase/app';
import { getDatabase, ref, set, push } from 'firebase/database'; // Updated import for Firebase Realtime Database

import 'firebase/database';

import '../../css/register.css';
import '../../css/userotp.css';

const fireDB = getDatabase(app);


const UserOtp = ({ history }) => {
  const [regUser, setRegUser] = useState(
    {
      First: '',
      Middle: '',
      Last: '',
      Mobile: '',
      Password: '',
      Email: '',

    }
  )

  const [otp, setOtp] = useState("");
  const [phoneNo, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [userVal, setUserVal] = useState(true);



  const handleOnClickLogin = () => {
    history.push('/patient-login');
  }

  const onSignup = () => {
    console.log(phoneNo);
    setLoading(true);
    onCaptchVerify();
    console.log(phoneNo);
    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phoneNo;
    console.log(formatPh);
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {

        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });


  }


  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container',
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          'expired-callback': () => { }
        })
    }
  }
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
      const dbRef = ref(fireDB, "users");
      const newUserRef = push(dbRef); // Create a new child location with a unique key
      set(newUserRef, regUser)
        .then(() => {
          toast.success("User Added Successfully");
        })
        .catch((err) => {
          toast.error(err);
        });
  }

  const data = (e) => {
    const { value, name } = e.target;
    setRegUser(() => {
      return {
        ...regUser,
        [name]: value
      };
    });
  }

  function validateName(name) {
    return /^[a-zA-Z\s]*$/.test(name.trim());
  }
  function validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  function validatePassword(password) {
    // Add your password requirements here, e.g., minimum length
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  }
  function validateIndianMobileNumber(mobileNumber) {
    return /^(\+\d{1,3}[-]?)?\d{10}$/.test(mobileNumber);
  }


  const getData = (e) => {
    e.preventDefault();
    // var First = document.getElementById('First').value;
    // var Middle = document.getElementById('Middle').value;
    // var Last = document.getElementsByName('Last').value;
    // var Email = document.getElementById('Email').value;
    // var Mobile = document.getElementsByName('Mobile').value;
    // var Password = document.getElementsByName('Password').value;
    // var phoneRGEX = /^(\+\d{1,3}[-]?)?\d{10}$/;
    // var emailREX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // var passREX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    // var phoneResult = phoneRGEX.test(Mobile);
    // var emailResult = emailREX.test(Email);
    // var passResult = passREX.test(Password);
    if(regUser.First == '' ){
      toast.error("First Name is required", { autoClose: 100000 });
    }
    else if(regUser.Middle == '' ){
      toast.error("Middle Name is required", { autoClose: 100000 });
    }
    else if(regUser.Last == '' ){
      toast.error("Last Name is required", { autoClose: 100000 });
    }
    else if(regUser.Email == '' ){
      toast.error("Email is required", { autoClose: 100000 });
    }
    else if(regUser.Mobile == '' ){
      toast.error("Mobile is required", { autoClose: 100000 });
    }
    else if(regUser.Password == '' ){
      toast.error("Password is required", { autoClose: 100000 });
    }
    else if (!validateName(regUser.First) ) {
      // Handle invalid name input
      // Display an error message or prevent form submission
      toast.error("Enter Correct First Name without Containing numbers or any special characters ", { autoClose: 100000 });
    }
    else if ( !validateName(regUser.Middle)) {
      // Handle invalid name input
      // Display an error message or prevent form submission
      toast.error("Enter Correct Middele Name without Containing numbers or any special characters ", { autoClose: 100000 });
    }
    else if (!validateName(regUser.Last)) {
      // Handle invalid name input
      // Display an error message or prevent form submission
      toast.error("Enter Correct Last Name without Containing numbers or any special characters ", { autoClose: 100000 });
    }
    else if (!validateEmail(regUser.Email)) {
      // Handle invalid email input
      toast.error("Please enter valid email address", { autoClose: 100000 });
    }
    else if (!regUser.Email.includes('@')) {
      toast.error("Please enter valid email address", { autoClose: 100000 });
    }
    else if (!validatePassword(regUser.Password)) {
      // Handle invalid password input
      toast.error("Please enter valid Password that contains one Special Character and Should Contain Alteat 8 characters", { autoClose: 100000 });
    }
    else if (!validateIndianMobileNumber(regUser.Mobile)) {
      toast.error("Please enter valid Mibile No", { autoClose: 100000 });
    }
    else {
      setUserVal(false);
     
    }
  }


  return (
    <>
      <div className='row h-100 d-flex justify-content-center align-content-center align-items-center'>
        <div className='col-7'>
          <section className='d-flex align-items-center justify-content-center h-screen'>
            <div>
              <Toaster toastOptions={{ duration: 4000 }} />
              <div id='recaptcha-container'>

              </div>

              {
                userVal ?
                  (

                    <div className=''>
                      <div className='d-flex align-items-center justify-content-center'>
                        <Form style={{ padding: '5vh' }}>
                          <div className='container m-3 text-primary'>
                            <h2 className='text-center' style={{ textAlign: 'center' }}>Welcome to Trusty Doctor</h2>
                            <p className='mt-0 pt-0 text-center' color='#135078'>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry
                            </p>
                          </div>
                          <div className='row'>

                            <div className='col-4'>

                              <Form.Group className="mb-3" controlId="formBasicFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control className='input-background-color' onChange={data} name='First' type="text" placeholder="First Name" style={{ fontSize: '2vh', padding: '2vh' }} />
                              </Form.Group>
                            </div>
                            <div className='col-4'>
                              <Form.Group className="mb-3" controlId="formBasicMiddleName">
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control type="text" className='input-background-color' onChange={data} name='Middle' placeholder="Middle Name" style={{ fontSize: '2vh', padding: '2vh' }} />
                              </Form.Group>
                            </div>
                            <div className='col-4'>
                              <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" className='input-background-color' onChange={data} name='Last' placeholder="Last Name" style={{ fontSize: '2vh', padding: '2vh' }} />
                              </Form.Group>
                            </div>
                          </div>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className='input-background-color' type="email" onChange={data} name='Email' id='Email' placeholder="Email" style={{ fontSize: '2vh', padding: '2vh' }} />
                            <Form.Text className="text-muted" style={{ fontSize: '12px' }}>
                              We'll never share your email with anyone else.
                            </Form.Text>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicAge">
                            <Form.Label>Enter Mobile No</Form.Label>
                            <Form.Control className='input-background-color' type="number" onChange={data} name='Mobile' placeholder="Mobile number" style={{ fontSize: '2vh', padding: '2vh' }} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className='input-background-color' type="password" onChange={data} name='Password' placeholder="Password" style={{ fontSize: '2vh', padding: '2vh' }} />
                          </Form.Group>

                          <div className='d-flex justify-content-between' style={{ height: '8vh' }}>
                            <Button onClick={getData} className='' style={{ width: '15%', padding: '0', margin: '0' }} variant="primary" type="submit">
                              Next    <GrLinkNext className='text-white' />
                            </Button>
                            <button onClick={handleOnClickLogin} style={{ border: 'none', background: 'white' }} >
                              <p >Already have an Account? Login</p>
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>

                  )
                  :
                  (
                    user ?
                      (
                        (
                          <div className='text-center'>
                            <h2>Login Succes</h2>
                          </div>
                        )
                      ) :
                      (
                        <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
                          <h2 className='text-center' style={{ textAlign: 'center' }}>Welcome to Trusty Doctor</h2>
                          <p className='mt-0 pt-0 text-center' color='#135078'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry
                          </p>
                          {
                            showOTP ?
                              (<>
                                <div className='mx-auto bg-primary text-white p-3' style={{ width: '4vw', height: '9vh', borderRadius: '50%' }}>
                                  <BsShieldLockFill size={20} />
                                </div>
                                <label htmlFor='otp' className='font-bold text-2xl text-white text-center '>
                                  Enter your OTP
                                </label>
                                <div className='d-flex justify-content-center'>
                                  <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    autoFocus
                                    className="otp-container"
                                  ></OTPInput>
                                </div>
                                <button onClick={onOTPVerify} className="btn btn-primary w-100 mt-4" >
                                  {loading && <FaSpinner size={20} style={{ color: 'white' }} className='mt-0 text-white animate-spin' />}
                                  <span>Verify Otp</span>
                                </button>
                              </>)
                              :

                              (<>
                                <div className='mx-auto bg-primary text-white p-3' style={{ width: '4vw', height: '9vh', borderRadius: '50%' }}>
                                  <BsTelephoneFill size={20} />
                                </div>
                                <label className='font-bold' style={{ fontSize: '3vh', textAlign: 'center', marginLeft: '30%', marginTop: '2%', marginBottom: '4%' }}>
                                  Verify Your phone number
                                </label>

                                <PhoneInput
                                  className='react-tel-input text-center ml-4'
                                  country="in"
                                  value={phoneNo}
                                  onChange={setPhoneNumber} >
                                </PhoneInput>

                                <button
                                  onClick={onSignup}
                                  className="btn btn-primary w-100 mt-4" >
                                  {loading && <FaSpinner size={20} style={{ color: 'white' }} className='mt-0 text-white animate-spin' />}
                                  <span>Send code via SMS</span>
                                </button>
                              </>)

                          }
                        </div>
                      )

                  )
              }
            </div>
          </section>
        </div>
        <div className='col-5'>
          <img src={userRegisterImg} style={{ maxWidth: '100%', height: '100vh' }} />
        </div>
      </div>
    </>
  );
}

export default withRouter(UserOtp);
