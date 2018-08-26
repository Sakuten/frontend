import { observable, action } from 'mobx'

export class ErrorObject {
  @observable errorList = []

  @action.bound addError (message) {
    this.errorList.push(message)
  }
}
