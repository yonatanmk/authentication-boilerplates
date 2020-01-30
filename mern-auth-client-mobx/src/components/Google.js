import React from 'react';
import { observer, inject } from 'mobx-react';
import GoogleLogin from 'react-google-login';

const Google = observer(({ text, informParent = f => f, userStore: { googleAuth } }) => {
  const responseGoogle = async response => {
    try {
      const user = await googleAuth(response);
      informParent(user);
    } catch(e) {
      console.error('GOOGLE SIGNIN ERROR');
    }
  };
  
  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="btn btn-danger btn-lg btn-block"
          >
            <i className="fab fa-google pr-2"></i> {text}
          </button>
        )}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
});

export default inject('userStore')(Google);