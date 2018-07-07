import { observable, computed, action } from 'mobx'
import {getStatus} from '../api/operation'

const savedToken = localStorage.getItem('Token')

export class CredentialObject {
  @observable password = ''
  @observable username = ''
  @observable token = savedToken || ''
  @observable status = new Map()

  constructor () {
    if (savedToken) {
      this.fetchStatus()
    }
  }

  @computed get isLoggedIn () {
    return this.token.length !== 0
  }

  @action.bound setUsername (username) {
    this.username = username
  }

  @action.bound setPassword (password) {
    this.password = password
  }

  @action.bound setToken (token) {
    localStorage.setItem('Token', token)
    this.token = token
  }

  @action.bound setStatus (obj) {
    Object.keys(obj).forEach(key => {
      this.status.set(key, obj[key])
    })
  }

  @action.bound clearPassword () {
    this.password = ''
  }

  @action.bound async fetchStatus () {
    const response = await getStatus(this.token)
    this.setStatus(response.data.status)
  }
}
