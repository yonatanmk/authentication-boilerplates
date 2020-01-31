import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import stores from 'stores';
import LandingPage from 'layouts/LandingPage';
import Home from 'layouts/Home';
import Signup from 'layouts/Signup';
import Signin from 'layouts/Signin';
import Activate from 'layouts/Activate';
import Profile from 'layouts/Profile';
import AdminProfile from 'layouts/AdminProfile';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import AuthRoute from './AuthRoute';
import Forgot from 'layouts/Forgot';
import ResetPassword from 'layouts/ResetPassword';

const Routes = () => {
  return (
    <Provider {...stores}>
      <BrowserRouter>
        <Switch>
          <AuthRoute path="/" exact component={LandingPage} />
          <PrivateRoute path="/home" exact component={Home} />
          <AuthRoute path="/signup" exact component={Signup} />
          <AuthRoute path="/signin" exact component={Signin} />
          <AuthRoute path="/auth/activate/:activateToken" exact component={Activate} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <AdminRoute path="/admin" exact component={AdminProfile} />
          <AuthRoute path="/auth/password/forgot" exact component={Forgot} />
          <AuthRoute path="/auth/password/reset/:resetPasswordToken" exact component={ResetPassword} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Routes;
