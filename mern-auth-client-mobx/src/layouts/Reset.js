import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './Layout';

const Reset = observer(({ userStore: { resetPassword }, history, match }) => {
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
    if (decodedToken) {
      const { name } = decodedToken;
      setValues({ ...values, name, resetPasswordToken });
    }

    // eslint-disable-next-line
  }, [match]);

  const { name, resetPasswordToken, newPassword, buttonText, resetSuccess } = values;

  const handleChange = event => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = async event => {
    event.preventDefault();
    if (resetSuccess) {
      history.push('/signin')
    } else {
      setValues({ ...values, buttonText: 'Submitting' });
      try {
        const message = await resetPassword({ newPassword, resetPasswordLink: resetPasswordToken })
        toast.success(message);
        setValues({ ...values, buttonText: 'Done', resetSuccess: true });
      } catch(err) {
        const { message } = err;
        toast.error(message);
        setValues({ ...values, buttonText: 'Reset password' });
      }
    }
  };

  const passwordResetForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Password</label>
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
});

export default inject('userStore')(Reset);