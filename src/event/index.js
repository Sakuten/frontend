import {CredentialObject} from './credential'
import {ApplicationObject} from './application'
import {ErrorObject} from './error'

export class Event {
  constructor (store) {
    this.store = store
    this.error = new ErrorObject(store)
    this.credential = new CredentialObject(store)
    this.application = new ApplicationObject(store)

    // This can cause network error, to be caught in ErrorObject
    // So fetchStatus() have to be placed in here
    if (this.store.credential.isLoggedIn) { this.store.fetchStatus() }
  }
}
