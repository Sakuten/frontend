import { observable, computed, action } from 'mobx';
import {fetchApi} from './api'

export class CredentialStore {
  @observable password = ""
  @observable username = ""
  @observable token = ""
  @observable status = new Map()

  @action.bound login() {
    fetchApi('auth/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        password: this.password,
        username: this.username
      }
    }).then(async (response) => {
      const json = response.data
      if ('token' in json) {
        this.token = json.token
        this.password = ''
        this.fetchStatus()
      } else { throw Error('Invalid response returned') }
    })
  }

  @action.bound fetchStatus() {
    fetchApi(`api/status`, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    })
      .then(response => {
        Object.keys(response.data.status).forEach(key => {
              this.status.set(key, response.data.status[key]);
          });
      })
      .catch(error => {
        if (error.response && error.response.data.message === 'Unauthorized') {
          this.logout()
        } else {
          throw error
        }
      })
  }

  @action.bound logout() {
    this.token = ''
  }

  @computed get isLoggedIn() {
    return this.token.length !== 0
  }

}


