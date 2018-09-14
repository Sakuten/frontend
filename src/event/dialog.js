export class DialogObject {
  constructor (store) {
    this.store = store
  }

  onClose = () => {
    this.store.dialog.close()
  }

  onOpen = (title, content, buttonText = 'OK') => {
    this.store.dialog.setTitle(title)
    this.store.dialog.setContent(content)
    this.store.dialog.setButtonText(buttonText)
    this.store.dialog.open()
  }
}
