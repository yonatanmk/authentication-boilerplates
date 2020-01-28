import { observable, computed, action, decorate } from "mobx";

class UserStore {
  user = {}
  token = {}

  // async signIn() {

  // }

}

decorate(UserStore, {
  user: observable,
  token: observable,
  // signIn: action.bound,
});

export default UserStore;
