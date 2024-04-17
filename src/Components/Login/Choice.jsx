import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid } from '@mui/material';
import { AccountCircle, Person } from '@mui/icons-material'; // Icons

function Choice(props) {
    const { history } = props;

    const handleAdmin = () => {
        history.push('profile')
    }
    return (
        <Container maxWidth="sm">
            <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}>
                <Grid item>
                    <h2>Welcome to our Application</h2>
                </Grid>
                <Grid item>
                    <p>Please select your role:</p>
                </Grid>
                <Grid item container spacing={2} justifyContent="center">
                    <Grid item>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <Button
                                // onClick={() => handleAdmin()}
                                variant="contained"
                                color="secondary"
                                size="large"
                                style={{ borderRadius: '0px' }}>
                                <AccountCircle style={{ fontSize: '5rem' }} />
                                Admin
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/user" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                style={{ borderRadius: '0px' }}>
                                <Person style={{ fontSize: '5rem' }} />
                                User
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Choice;
