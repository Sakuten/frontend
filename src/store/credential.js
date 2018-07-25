import { observable, computed, action } from 'mobx'
import {getStatus} from '../api/operation'

const savedToken = localStorage.getItem('Token')

export class CredentialObject {
  @observable username = ''
  @observable recaptchaResponse = ''
  @observable token = savedToken || ''
  @observable status = new Map()

  @computed get isLoggedIn () {
    return this.token.length !== 0
  }

  @action.bound setUsername (username) {
    this.username = username
  }

  @action.bound setRecaptchaResponse (recaptchaResponse) {
    this.recaptchaResponse = recaptchaResponse
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

  @action.bound async fetchStatus () {
    const response = await getStatus(this.token)
    this.setStatus(response.data)
  }
}
