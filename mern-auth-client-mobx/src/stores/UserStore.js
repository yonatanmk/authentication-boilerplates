import _ from 'lodash'
import { observable, action, decorate } from "mobx";
import request from 'lib/request'
import { setLocalStorage, signout } from 'lib/helpers';

class UserStore {
  user = null
  // token = null // not used

  async loadUser () {
    const token = localStorage.getItem('token');

    // if (token && !this.token) {
    //   this.token = token
    // }

    if (token && !this.user) {
      
      const user = await this.getUser();
      console.log('USER LOADED')
      this.user = user
    }

    // const authSuccess = !!this.user && !!this.token;

    if (!this.user) signout();

    return this.user;
  }

  async signUp(data) {
    try {
      const resp = await request({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/signup`,
        data, // { name, email, password }
      })

      if (resp && resp.data) {
        console.log('SIGNUP SUCCESS', resp);
        return resp.data.message;
      } else {
        throw new Error('Something Went Wrong'); // redundant message
      }
    } catch (e) {
      console.error(e)
      const errorMessage = _.get(e, 'response.data.error') || 'Something Went Wrong';
      throw new Error(errorMessage);
    }
  }

  async activateAccounf(token) {
    try {
      const resp = await request({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/account-activation`,
        data: { token },
      })

      if (resp && resp.data) {
        console.log('ACCOUNT ACTIVATION', resp);
        return resp.data.message;
      } else {
        throw new Error('Something Went Wrong'); // redundant message
      }
    } catch (e) {
      console.error(e)
      const errorMessage = _.get(e, 'response.data.error') || 'Something Went Wrong';
      throw new Error(errorMessage);
    }
  }

  async signIn(data) {
    try {
      const resp = await request({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/signin`,
        data, // { email, password }
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

  async googleAuth(googleResponse) {
    try {
      const resp = await request({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/google-login`,
        data: { idToken: googleResponse.tokenId }
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

  async facebookAuth(fbResponse) {
    try {
      const resp = await request({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/facebook-login`,
        data: { userID: fbResponse.userID, accessToken: fbResponse.accessToken }
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

  signOut(cb) {
    this.user = null;
    signout(cb)
  }

  async getUser() {
    try {
      const resp = await request({
        method: 'GET',
        url: `${process.env.REACT_APP_API}/user`,
      })

      if (resp && resp.data) {
        console.log('GET USER SUCCESS', resp);
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

  async forgotPassword(email) {
    try {
      const resp = await request({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/forgot-password`,
        data: { email }
      })

      if (resp && resp.data) {
        console.log('FORGOT PASSWORD SUCCESS', resp);
        return resp.data.message;
      } else {
        throw new Error('Something Went Wrong'); // redundant message
      }
    } catch (e) {
      console.error(e)
      const errorMessage = _.get(e, 'response.data.error') || 'Something Went Wrong';
      throw new Error(errorMessage);
    }
  }

  async resetPassword(data) {
    try {
      const resp = await request({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/reset-password`,
        data,
      })

      if (resp && resp.data) {
        console.log('RESET PASSWORD SUCCESS', resp);
        return resp.data.message;
      } else {
        throw new Error('Something Went Wrong'); // redundant message
      }
    } catch (e) {
      console.error(e)
      const errorMessage = _.get(e, 'response.data.error') || 'Something Went Wrong';
      throw new Error(errorMessage);
    }
  }

  async updateUser(data) {
    try {
      const resp = await request({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/user/update`,
        data,
      })

      if (resp && resp.data) {
        console.log('UPDATE USER SUCCESS', resp);
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
  signUp: action.bound,
  signIn: action.bound,
  googleAuth: action.bound,
  facebookAuth: action.bound,
  signOut: action.bound,
  forgotPassword: action.bound,
  resetPassword: action.bound,
  updateUser: action.bound,
});

export default UserStore;
