import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from 'core/Layout';
import { authenticate } from './helpers';
import Google from './Google';
import Facebook from './Facebook';

const Signin = observer(({ history, userStore: { signIn, isAuth } }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const informParent = response => {
        authenticate(response, () => {
            isAuth && isAuth.role === 'admin' ? history.push('/admin') : history.push('/private');
        });
    };

    const clickSubmit = async event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });

        try {
            const user = await signIn({ email, password })
            if (user) {
                setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                isAuth && isAuth.role === 'admin' ? history.push('/admin') : history.push('/private');
            }
        } catch(err) {
            const { message } = err;
            console.log('SIGNIN ERROR', message);
            setValues({ ...values, buttonText: 'Submit' });
            toast.error(message);
        }

        // console.log({ email, password })
        
        // axios({
        //     method: 'POST',
        //     url: `${process.env.REACT_APP_API}/signin`,
        //     data: { email, password }
        // })
        //     .then(response => {
        //         console.log('SIGNIN SUCCESS', response);
        //         // save the response (user, token) localstorage/cookie
        //         authenticate(response, () => {
        //             setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
        //             // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
        //             isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
        //         });
        //     })
        //     .catch(error => {
        //         console.log('SIGNIN ERROR', error.response.data);
        //         setValues({ ...values, buttonText: 'Submit' });
        //         toast.error(error.response.data.error);
        //     });
    };

    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" autoComplete="off" />
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
                {isAuth ? <Redirect to="/" /> : null}
                <h1 className="p-5 text-center">Sign In</h1>
                <Google text="Login with Google" informParent={informParent} />
                <Facebook text="Login with Facebook" informParent={informParent} />
                {signinForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>
            </div>
        </Layout>
    );
});

export default inject('userStore')(Signin);