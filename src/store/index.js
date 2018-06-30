import {CredentialObject} from './credential'
import {ApplicationObject} from './application'
import {ErrorObject} from './error'

export class Store {
  constructor () {
    this.credential = new CredentialObject()
    this.application = new ApplicationObject()
    this.error = new ErrorObject()
  }
}
