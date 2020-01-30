import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './Layout';

const Reset = ({ history, match }) => {
  // props.match from react router dom
  const [values, setValues] = useState({
    name: '',
    resetPasswordToken: '',
    resetSuccess: false,
    newPassword: '',
    buttonText: 'Reset password'
  });

  useEffect(() => {
    const resetPasswordToken = match.params.resetPasswordToken;
    const decodedToken = jwt.decode(resetPasswordToken);
    if (resetPasswordToken && decodedToken) {
      const { name } = decodedToken;
      setValues({ ...values, name, resetPasswordToken });
    }
    // let { name } = jwt.decode(resetPasswordToken);
    // if (resetPasswordToken) {
    //   setValues({ ...values, name, resetPasswordToken });
    // }

    // eslint-disable-next-line
  }, [match]);

  const { name, resetPasswordToken, newPassword, buttonText } = values;

  const handleChange = event => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    if (values.resetSuccess) {
      history.push('/signin')
    } else {
      setValues({ ...values, buttonText: 'Submitting' });
      axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/reset-password`,
        data: { newPassword, resetPasswordLink: resetPasswordToken }
      })
        .then(response => {
          console.log('RESET PASSWORD SUCCESS', response);
          toast.success(response.data.message);
          setValues({ ...values, buttonText: 'Done', resetSuccess: true });
        })
        .catch(error => {
          console.log('RESET PASSWORD ERROR', error.response.data);
          toast.error(error.response.data.error);
          setValues({ ...values, buttonText: 'Reset password' });
        });
    }
  };

  const passwordResetForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange}
          value={newPassword}
          type="password"
          className="form-control"
          placeholder="Type new password"
          required
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {!name && <h1 className="p-5 text-center">Pasword Reset Failed</h1>}
        {name && <h1 className="p-5 text-center">Hey {name}, Type your new password</h1>}
        {name && passwordResetForm()}
      </div>
    </Layout>
  );
};

export default Reset;
