import { observable, action } from 'mobx'

export class DialogObject {
  @observable isOpen = false
  @observable isButtonEnabled = false
  @observable content = ''
  @observable title = ''
  @observable buttonText = ''

  @action.bound open () {
    this.isOpen = true
  }

  @action.bound close () {
    this.isOpen = false
  }

  @action.bound toggle () {
    this.isOpen = !this.isOpen
  }

  @action.bound setTitle (title) {
    this.title = title
  }

  @action.bound setContent (content) {
    this.content = content
  }

  @action.bound setButtonText (buttonText) {
    this.buttonText = buttonText
  }

  @action.bound setButtonEnabled (enabled) {
    this.isButtonEnabled = enabled
  }
}
