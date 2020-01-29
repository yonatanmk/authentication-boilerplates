import _ from 'lodash'
import { observable, action, decorate, computed } from "mobx";
import request from 'lib/request'
import { authenticate, isAuth, setLocalStorage, getLocalStorage, signout } from 'auth/helpers';

class UserStore {
  user = null
  // token = null // not used

  async loadUser () {
    console.log('loadUser')
    const token = localStorage.getItem('token');

    // if (token && !this.token) {
    //   this.token = token
    // }

    if (token && !this.user) {
      const user = await this.getUser();
      this.user = user
    }

    // const authSuccess = !!this.user && !!this.token;

    if (!this.user) signout();

    return this.user;
  }

  async signIn(data) {
    const { email, password } = data;
    try {
      const resp = await request({
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

  async getUser() {
    try {
      const resp = await request({
        method: 'GET',
        url: `${process.env.REACT_APP_API}/user`,
      })

      if (resp && resp.data) {
        this.user = resp.data
        return resp.data;
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
  loadUser: action.bound,
  signIn: action.bound,
});

export default UserStore;
