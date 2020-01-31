import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from 'lib/auth-utils';

const PrivateRoute = observer(({ component: Component, userStore: { loadUser }, ...rest }) => {
  useEffect(() => {
    const loadUserFunc = async () => {
      await loadUser()
    }
    loadUserFunc()
    // return
  }, [loadUser]) // populate user in user store if there's a token

  return (
    <Route
      {...rest}
      render={props =>
        isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    ></Route>
  )
});

export default inject('userStore')(PrivateRoute);