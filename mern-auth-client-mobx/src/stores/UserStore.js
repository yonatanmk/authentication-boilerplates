import _ from 'lodash'
import { observable, action, decorate, computed } from "mobx";
import axios from 'axios';
import { authenticate, isAuth, setLocalStorage, getLocalStorage } from 'auth/helpers';

class UserStore {
  user = {}
  token = {}

  get isAuth() {
    const token = getLocalStorage('token');
    if (token && this.user) {
      return this.user;
    } else {
      return false;
    }
  }

  async signIn(data) {
    const { email, password } = data;
    console.log({ email, password })
    let resp;
    try {
      resp = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/signin`,
        data: { email, password }
      })
    } catch (e) {
      console.error('CALL FAILED')
      console.error(e)
      resp = e.response
    }

    const token = _.get(resp, 'data.token');
    const user = _.get(resp, 'data.user');
    
    if (token && user) {
      console.log('SIGNIN SUCCESS', resp);
      setLocalStorage('token', token);
      this.token = token;
      this.user = user;
      return user;
    } else {
      console.log({ resp })
      const error = _.get(resp, 'data.error');
      throw new Error(error || 'Something Went Wrong');
    }
  }


//   axios({
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
}

decorate(UserStore, {
  user: observable,
  token: observable,
  isAuth: computed,
  signIn: action.bound,
  
});

export default UserStore;
