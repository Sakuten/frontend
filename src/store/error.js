import { observable, action } from 'mobx'

export class ErrorObject {
  @observable errorList = []
  @observable ignoreErrorCodeList = []

  @action.bound addErrorCodeToIgnore (code) {
    this.ignoreErrorCodeList.push(code)
  }

  @action.bound addError (message) {
    this.errorList.push(message)
  }

  @action.bound deleteError (idx) {
    this.errorList.splice(idx, 1)
  }
}
