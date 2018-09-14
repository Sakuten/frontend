import { DialogObject } from '../dialog'

describe('stores', () => {
  describe('DialogObject', () => {
    let store

    beforeEach(() => {
      store = new DialogObject()
    })

    it('can open', () => {
      store.open()
      expect(store.isOpen).toBe(true)
    })

    it('can close', () => {
      store.close()
      expect(store.isOpen).toBe(false)
    })

    it('can toggle', () => {
      store.open()
      expect(store.isOpen).toBe(true)
      store.toggle()
      expect(store.isOpen).toBe(false)
    })

    it('can have title', () => {
      store.setTitle('Hehehe')
      expect(store.title).toBe('Hehehe')
    })

    it('can have content', () => {
      store.setContent('Hehehe')
      expect(store.content).toBe('Hehehe')
    })

    it('can have buttonText', () => {
      store.setButtonText('Hehehe')
      expect(store.buttonText).toBe('Hehehe')
    })

    it('can have enable state of button', () => {
      store.setButtonEnabled(false)
      expect(store.isButtonEnabled).toBe(false)
    })
  })
})
