import React from 'react';
import NavigationBar from './components/NavigationBar';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './funct/PrivateRoute';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login/Login';
import SignUp from './components/Login/Signup';
import DirectionPage from './mainApp/DirectionPage';
import DonateFood from './mainApp/DonateFood';
import Volunteering from './mainApp/Volunteering';
import DashBoard from './mainApp/Dashboard';

function App() {
    return (
        <div>
            <NavigationBar />
            <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route exact path='/about' component={About}></Route>
                <Route exact path='/contact' component={Contact}></Route>
                <Route exact path='/login' component={Login}></Route>

                <Route exact path='/signup' component={SignUp}></Route>
                <PrivateRoute
                    exact
                    path='/direction-page'
                    component={DirectionPage}
                ></PrivateRoute>

                <PrivateRoute
                    exact
                    path='/direction-page/donate-food'
                    component={DonateFood}
                ></PrivateRoute>

                <PrivateRoute
                    exact
                    path='/direction-page/volunteering'
                    component={Volunteering}
                ></PrivateRoute>

                <PrivateRoute
                    exact
                    path='/dashboard'
                    component={DashBoard}
                ></PrivateRoute>
            </Switch>
        </div>
    );
}

export default App;
