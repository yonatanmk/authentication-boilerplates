import React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = observer(({ component: Component, userStore: { checkStoreAuth }, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            checkStoreAuth() ? (
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
));

export default inject('userStore')(PrivateRoute);