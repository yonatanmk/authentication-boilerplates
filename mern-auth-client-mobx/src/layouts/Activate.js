import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './Layout';

const Activate = observer(({ match, userStore: { activateAccounf } }) => {
  const [values, setValues] = useState({
    name: '',
    activateToken: '',
  });

  useEffect(() => {
    const activateToken = match.params.activateToken;
    const decodedToken = jwt.decode(activateToken);
    if (activateToken && decodedToken) {
      const { name } = decodedToken;
      setValues({ ...values, name, activateToken });
    }
    // eslint-disable-next-line
  }, [match]); 

  const { name, activateToken } = values;

  const clickSubmit = async event => {
    event.preventDefault();

    try {
      const message = await activateAccounf(activateToken)
      console.log('ACCOUNT ACTIVATION', message);
      toast.success(message);
    } catch(err) {
      const { message } = err;
      console.log('ACCOUNT ACTIVATION ERROR', message);
      toast.error(message);
    }
  };

  const activationLink = () => (
    <div className="text-center">
      <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {!name && <h1 className="p-5 text-center">Account Activation Failed</h1>}
        {name && activationLink()}
      </div>
    </Layout>
  );
});

export default inject('userStore')(Activate);