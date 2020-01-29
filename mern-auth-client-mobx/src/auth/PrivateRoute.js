import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './helpers';

const PrivateRoute = observer(({ component: Component, userStore: { loadUser }, ...rest }) => {
    useEffect(loadUser, []) // populate user in user store if there's a token

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