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
        // this.fetchStatus()
      } else { throw Error('Invalid response returned') }
    })
  }
}


