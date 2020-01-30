import React from 'react';
import { observer, inject } from 'mobx-react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'; // special import for styling facebook button
// import FacebookLogin from 'react-facebook-login'; import for default facebook sign in button styles

const Facebook = observer(({ text, informParent = f => f, userStore: { facebookAuth } }) => {
  const responseFacebook = async response => {
    try {
      const user = await facebookAuth(response);
      informParent(user);
    } catch(e) {
      console.error('GOOGLE SIGNIN ERROR');
    }
  };

  // facebook component causing componentWillReceiveProps has been renamed error
  return (
    <div className="pb-3">
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={renderProps => (
          <button onClick={renderProps.onClick} className="btn btn-primary btn-lg btn-block">
              <i className="fab fa-facebook pr-2"></i> {text}
          </button>
        )}
      />
    </div>
  );
});

export default inject('userStore')(Facebook);