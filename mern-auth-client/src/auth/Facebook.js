import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'; // special import for styling facebook button
// import FacebookLogin from 'react-facebook-login'; import for default facebook sign in button styles
import axios from 'axios';

const Facebook = ({ text, informParent = f => f }) => {
  const responseFacebook = response => {
    console.log(response);
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/facebook-login`,
      data: { userID: response.userID, accessToken: response.accessToken }
    })
      .then(response => {
        console.log('FACEBOOK SIGNIN SUCCESS', response);
        // inform parent component
        informParent(response);
      })
      .catch(error => {
        console.log('FACEBOOK SIGNIN ERROR', error.response);
      });
  };

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
};

export default Facebook;
