import {CredentialObject} from './credential'
import {ApplicationObject} from './application'

export class Event {
  constructor(store) {
    this.store = store;
    this.credential = new CredentialObject(store.credential)
    this.application = new ApplicationObject(store)
  }
}
