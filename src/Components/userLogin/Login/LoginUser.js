import React from 'react';
import Card from 'react-bootstrap/Card';
import bikeRider from '../../Images/user.png';
import bikeShop from '../../Images/admin.png';
import { withRouter } from 'react-router-dom';

const LoginUser = ({ history }) => {

  const handleUserLoginClick = () => {
    history.push('/login-user');
  }
  const handleAdminLoginClick = () => {
    history.push('/admin');
  }

  return (
    <div className="container mb-4 h-100 d-flex align-items-center" style={{ color: '#135078', minHeight: '100vh' }}>
      <div className=" text-center">
        <h1>Who are you?</h1>
        <div className='d-flex justify-content-center align-items-center'>
          <p className='w-75'>
            Whether you're a bike enthusiast looking for rides or a bike shop owner managing your business, our platform provides a seamless experience for all bike enthusiasts.
          </p>
        </div>
        <div className="row d-flex justify-content-around row mt-4">
          <div className="col-xl-2 col-md-6 col-sm-12 m-3">
            <button style={{ border: 'none', borderRadius: '25px' }} onClick={handleUserLoginClick}>
              <Card style={{ width: '12rem', border: 'none', margin: '5px', borderRadius: '25px', background: 'white' }}>
                <Card.Img style={{ padding: '3vh' }} variant="top" src={bikeRider} />
                <Card.Title className="mx-auto" style={{ color: '#135078' }}>User</Card.Title>
              </Card>
            </button>
          </div>
          <div className="col-xl-2 col-md-6 col-sm-12 m-3" style={{ marginBottom: '5vh' }}>
            <button style={{ border: 'none', borderRadius: '25px' }} onClick={handleAdminLoginClick}>
              <Card style={{ width: '12rem', border: 'none', margin: '5px', borderRadius: '25px', background: 'white' }}>
                <Card.Img style={{ padding: '1vh' }} variant="top" src={bikeShop} />
                <Card.Title className="mx-auto" style={{ color: '#135078' }}>Admin</Card.Title>
              </Card>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginUser);
