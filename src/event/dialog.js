export class DialogObject {
  constructor (store) {
    this.store = store
  }

  onClose = () => {
    this.store.dialog.close()
  }

  onOpen = (title, content, buttonText = 'OK', enableButton = true) => {
    this.store.dialog.setTitle(title)
    this.store.dialog.setContent(content)
    this.store.dialog.setButtonText(buttonText)
    this.store.dialog.setButtonEnabled(enableButton)
    this.store.dialog.open()
  }
}
