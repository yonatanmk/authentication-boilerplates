import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Activate = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        activateToken: '',
        show: true
    });

    useEffect(() => {
        const activateToken = match.params.activateToken;
        const decodedToken = jwt.decode(activateToken);
        if (activateToken && decodedToken) {
            const { name } = decodedToken;
            setValues({ ...values, name, activateToken });
        }
    }, [match]);

    const { name, activateToken } = values;

    const clickSubmit = event => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: { token: activateToken }
        })
            .then(response => {
                console.log('ACCOUNT ACTIVATION', response);
                setValues({ ...values, show: false });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
                toast.error(error.response.data.error);
            });
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
};

export default Activate;
