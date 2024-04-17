import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Components/Home';

import About from './Components/About';
import Navbar from './Components/Navbar';
import Test from './Components/Test/Test';
import AuthenticationMain from './Components/Authentication/AuthenticationMain';
import UserRegister from './Components/Authentication/Register/UserRegister';
import DriverRegister from './Components/Authentication/Register/DriverRegister';
import Footer from './Components/Footer/Footer';
import FeaturesSection from './Components/Homepage/FeaturesSection';
import Bikes from './Components/Bikes/Bike';
import Choice from './Components/Login/Choice';
import AdminLogin from './Components/Login/AdminLogin';
import Profile from './Components/Dashboard/Dashpages/Profile';
import AddBikes from './Components/Dashboard/Dashpages/AddBikes';
import AddData from './Components/Dashboard/Dashpages/AddData';

function App() {
  return (
    <Router>
      <div>

        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>

          {/* Home */}
          <Route exact path="/FeaturesSection">
            <FeaturesSection />
          </Route>


          {/* Authentication */}
          <Route exact path="/Authentication">
            <AuthenticationMain />
          </Route>
          <Route exact path="/userRegister">
            <UserRegister />
          </Route>
          <Route exact path="/driverRegister">
            <DriverRegister />
          </Route>


          {/* Test */}
          <Route exact path="/test">
            <Test />
          </Route>
          <Route exact path="/adddata">
            <AddData />
          </Route>


          <Route exact path="/bikes">
            <Bikes />
          </Route>

          <Route exact path="/ChooseLogin">
            <Choice />
          </Route>

          <Route exact path="/admin">
            <AdminLogin />
          </Route>


          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/addBikes">
            <AddBikes />
          </Route>



        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>

  );
}

export default App;
