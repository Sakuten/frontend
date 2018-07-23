import {CredentialObject} from './credential'
import {ApplicationObject} from './application'
import { RouterStore } from 'mobx-react-router'
import {ErrorObject} from './error'

export class Store {
  constructor () {
    this.credential = new CredentialObject()
    this.application = new ApplicationObject()
    this.router = new RouterStore()
    this.error = new ErrorObject()

    this.fetchStatus()
  }

  fetchStatus = async () => {
    await Promise.all([
      this.store.credential.fetchStatus(),
      this.store.application.fetchApplicationList()
    ])
  }
}
