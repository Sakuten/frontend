import {CredentialObject} from './credential'

export class Event {
  constructor(store) {
    this.store = store;
    this.credential = new CredentialObject(store)
  }
}
