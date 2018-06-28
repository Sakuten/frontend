import {CredentialObject} from './credential'
import {ApplicationObject} from './application'

export class Store {
  constructor() {
    this.credential = new CredentialObject();
    this.application = new ApplicationObject()
  }
}
