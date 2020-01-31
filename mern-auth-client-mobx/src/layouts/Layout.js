import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { isAuth } from 'lib/helpers';

const Layout = observer(({ children, match, history, userStore, userStore: { user, signOut } }) => {
  const isActive = path => {
    if (match.path === path) {
      return { color: '#000' };
    } else {
      return { color: '#fff' };
    }
  };

  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      {!isAuth() && (
        <li className="nav-item">
          <Link to="/" className="nav-link" style={isActive('/')}>
            Home
          </Link>
        </li>
      )}

      {isAuth() && (
        <li className="nav-item">
          <Link to="/home" className="nav-link" style={isActive('/home')}>
            Home
          </Link>
        </li>
      )}

      {!isAuth() && (
        <Fragment>
          <li className="nav-item">
            <Link to="/signin" className="nav-link" style={isActive('/signin')}>
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" style={isActive('/signup')}>
              Sign Up
            </Link>
          </li>
        </Fragment>
      )}

      {isAuth() && user && user.role === 'admin' && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive('/admin')} to="/admin">
            {user.name}
          </Link>
        </li>
      )}

      {isAuth() && user && user.role === 'subscriber' && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive('/profile')} to="/profile">
            {user.name}
          </Link>
        </li>
      )}

      {isAuth() && (
        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: 'pointer', color: '#fff' }}
            onClick={() => {
              signOut(() => {
                history.push('/');
              });
            }}
          >
            Sign Out
          </span>
        </li>
      )}
    </ul>
  );

  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
});

export default compose(
  inject('userStore'),
  withRouter,
)(Layout)