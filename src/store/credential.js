import { observable, computed, action } from 'mobx'
import {getStatus} from '../api/operation'
import qs from 'query-string'

const savedToken = localStorage.getItem('Token')
const paramSecretId = qs.parse(location.search).sid

export class CredentialObject {
  @observable secretId = paramSecretId || ''
  @observable recaptchaResponse = ''
  @observable token = savedToken || ''
  @observable status = new Map()

  @computed get isLoggedIn () {
    return this.token.length !== 0
  }

  @computed get isAbleToAuthenicate () {
    return this.secretId.length !== 0 && this.recaptchaResponse.length !== 0
  }

  @action.bound setSecretId (secretId) {
    this.secretId = secretId
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
