import { observable, computed, action } from 'mobx';

export class CredentialObject {
  @observable password = ""
  @observable username = ""
  @observable token = ""
  @observable status = new Map()

  @computed get isLoggedIn() {
    return this.token.length !== 0
  }

  @action.bound setUsername(username) {
    this.username = username
  }

  @action.bound setPassword(password) {
    this.password = password
  }

  @action.bound setToken(token) {
    this.token = token
  }

  @action.bound setStatus(obj) {
    Object.keys(obj).forEach(key => {
          this.status.set(key, obj[key]);
      });
  }

  @action.bound clearPassword() {
    this.password = ''
  }

}


