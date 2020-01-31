import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './Layout';

const Forgot = observer(({ userStore: { forgotPassword }, history }) => {
  const [values, setValues] = useState({
    email: '',
    buttonText: 'Request password reset link',
    success: false,
  });

  const { email, buttonText, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async event => {
    event.preventDefault();
    if (success) {
      history.push('/signin')
    } else {
      setValues({ ...values, buttonText: 'Submitting' });
      try {
        const message = await forgotPassword(email)
        toast.success(message);
        setValues({ ...values, buttonText: 'Requested', success: true });
      } catch(err) {
        const { message } = err;
        toast.error(message);
        setValues({ ...values, buttonText: 'Request password reset link' });
      }
    }
  };

  const passwordForgotForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
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
        <h1 className="p-5 text-center">Forgot password</h1>
        {passwordForgotForm()}
      </div>
    </Layout>
  );
});

export default inject('userStore')(Forgot);