import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import stores from './stores';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Private from './core/Private';
import Admin from './core/Admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Forgot from './auth/Forgot';
import Reset from './auth/Reset';

const Routes = () => {
    
    return (
        <Provider {...stores}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/auth/activate/:activateToken" exact component={Activate} />
                    <PrivateRoute path="/private" exact component={Private} />
                    <AdminRoute path="/admin" exact component={Admin} />
                    <Route path="/auth/password/forgot" exact component={Forgot} />
                    <Route path="/auth/password/reset/:resetPasswordToken" exact component={Reset} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

export default Routes;
