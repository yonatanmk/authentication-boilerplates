import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from 'lib/auth-utils';

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/home',
              state: { from: props.location }
            }}
          />
        )
      }
    ></Route>
  )
};

export default AuthRoute;