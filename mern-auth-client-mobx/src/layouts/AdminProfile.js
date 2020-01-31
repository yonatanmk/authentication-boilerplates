import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './Layout';
// import { updateUser } from 'lib/helpers';
// import request from 'lib/request';

const AdminProfile = observer(({ userStore: { user, updateUser }, history }) => {
  const [values, setValues] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  useEffect(() => {
    if (user) {
      const { role, name, email } = user;
      setValues({ ...values, role, name, email });
    }
    // eslint-disable-next-line
  }, [user]);

  const { role, name, email, password, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async event => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    try {
      const user = await updateUser({ name, email, password, admin: true })
      if (user) {
        setValues({ ...values, buttonText: 'Submitted' });
        toast.success('Admin Profile updated successfully');
      }
    } catch(err) {
      const { message } = err;
      console.log('UPDATE PROFILE ERROR', message);
      setValues({ ...values, buttonText: 'Submit' });
      toast.error(message);
    }
  };

  const updateForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Role</label>
        <input defaultValue={role} type="text" className="form-control" disabled />
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input defaultValue={email} type="email" className="form-control" disabled />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
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
        <h1 className="pt-5 text-center">Admin</h1>
        <p className="lead text-center">Profile update</p>
        {updateForm()}
      </div>
    </Layout>
  );
});

export default inject('userStore')(AdminProfile);