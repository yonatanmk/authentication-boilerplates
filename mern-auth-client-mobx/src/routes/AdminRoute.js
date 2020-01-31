import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from 'lib/helpers';
import Layout from 'layouts/Layout'

const AdminRoute = observer(({ component: Component, userStore: { loadUser }, ...rest }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserFunc = async () => {
      const loadedUser = await loadUser()
      setUser(loadedUser)
    }
    loadUserFunc()
    // return
  }, [loadUser]) // populate user in user store if there's a token

  const renderMethod = props => {
    const authed =  isAuth();
    if (authed && user && user.role === 'admin') {
      return <Component {...props} />
    } else if (!authed) {
      return (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      );
    } else if (user && user.role !== 'admin') {
      return (
        <Redirect
          to={{
            pathname: '/profile',
            state: { from: props.location }
          }}
        />
      );
    } else {
      return <Layout />;
    }
  }

  return (
    <Route
      {...rest}
      render={renderMethod}
    ></Route>
  )
});

export default inject('userStore')(AdminRoute);