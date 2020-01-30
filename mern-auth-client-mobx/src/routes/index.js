import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import stores from 'stores';
import LandingPage from 'layouts/LandingPage';
import Home from 'layouts/Home';
import Signup from 'layouts/Signup';
import Signin from 'layouts/Signin';
import Activate from 'layouts/Activate';
import Private from 'layouts/Private';
import Admin from 'layouts/Admin';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import Forgot from 'layouts/Forgot';
import Reset from 'layouts/Reset';

const Routes = () => {
  return (
    <Provider {...stores}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <PrivateRoute path="/home" exact component={Home} />
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
