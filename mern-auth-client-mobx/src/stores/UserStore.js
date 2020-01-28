import _ from 'lodash'
import { observable, action, decorate, computed } from "mobx";
import axios from 'axios';
import { authenticate, isAuth, setLocalStorage, getLocalStorage } from 'auth/helpers';

class UserStore {
  user = null
  token = null // not used

  // get isAuth() {
  //   console.log('isAuth')
  //   const token = getLocalStorage('token');
  //   console.log({ token })
  //   if (this.user) {
  //     return this.user;
  //   } else {
  //     return false;
  //   }
  // }

  checkAuth () { // place in Private Route component
    const token = localStorage.getItem('token');

    if (token && !this.token) {
      this.token = token
    }

    if (token && !this.user) {
      // fetch user data, see Private component
    }

  }

  async signIn(data) {
    const { email, password } = data;
    console.log({ email, password })
    try {
      const resp = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/signin`,
        data: { email, password }
      })

      const token = _.get(resp, 'data.token');
      const user = _.get(resp, 'data.user');

      if (token && user) {
        console.log('SIGNIN SUCCESS', resp);
        setLocalStorage('token', token);
        this.token = token;
        this.user = user;
        return user;
      } else {
        throw new Error('Something Went Wrong'); // redundant message
      }
    } catch (e) {
      console.error(e)
      const errorMessage = _.get(e, 'response.data.error') || 'Something Went Wrong';
      throw new Error(errorMessage);
    }
  }
}

decorate(UserStore, {
  user: observable,
  token: observable,
  // isAuth: computed,
  signIn: action.bound,
});

export default UserStore;
