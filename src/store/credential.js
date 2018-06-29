import { observable, computed, action } from 'mobx';
import {fetchApi} from '../util/api'

const savedToken = localStorage.getItem('Token')

export class CredentialObject {
  @observable password = ""
  @observable username = ""
  @observable token = savedToken || ""
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
    localStorage.setItem('Token', token)
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

  @action.bound fetchStatus() {
    fetchApi(`api/status`, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    })
      .then(response => {
        this.setStatus(response.data.status)
      })
  }

}


