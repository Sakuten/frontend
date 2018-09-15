import {CredentialObject} from './credential'
import {ApplicationObject} from './application'
import {CheckerObject} from './checker'
import {DialogObject} from './dialog'
import { RouterStore } from 'mobx-react-router'
import {ErrorObject} from './error'

export class Store {
  constructor () {
    this.credential = new CredentialObject()
    this.application = new ApplicationObject()
    this.checker = new CheckerObject()
    this.dialog = new DialogObject()
    this.router = new RouterStore()
    this.error = new ErrorObject()
  }

  // Called in Event's constructor
  fetchStatus = async () => {
    await this.credential.fetchStatus()
    if (!this.credential.isLoggedInAsChecker) {
      await this.application.fetchApplicationList(this.credential.token)
    }
  }
}
