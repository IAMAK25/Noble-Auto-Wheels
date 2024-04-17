import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import default styles
import AdminLogin from './Login/AdminLogin';
import AgentLogin from './Login/AgentLogin';
import DriverLogin from './Login/DriverLogin';
import UserLogin from './Login/UserLogin';
import '../css/AuthenticationMain.css'; // Import a CSS file for additional styling

function AuthenticationMain() {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const handleTabSelect = (index) => {
        setSelectedTabIndex(index);
    };

    const renderLoginForm = () => {
        switch (selectedTabIndex) {
            case 1:
                return <DriverLogin />;
            case 2:
                return <AdminLogin />;
            case 3:
                return <AgentLogin />;
            case 0:
                return <UserLogin />;
            default:
                return null;
        }
    };

    return (
        <div className="authentication-container">
            <div className='main'>
                <h2>Login as</h2>
                <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
                    <TabList className="role-tabs">
                        <Tab>User</Tab>
                        <Tab>Driver</Tab>
                        <Tab>Admin</Tab>
                        <Tab>Agent</Tab>

                    </TabList>

                </Tabs>
                <div className='tab-panel'>
                    {renderLoginForm()}
                </div>
            </div>
        </div>
    );

}

export default AuthenticationMain;
