import { DialogObject } from '../dialog'
import { Store } from '../../store'

describe('events', () => {
  describe('DialogObject', () => {
    let event

    beforeEach(() => {
      event = new DialogObject(new Store())
    })

    it('opens and closes dialog', () => {
      event.onOpen('', '')
      expect(event.store.dialog.isOpen).toBe(true)
      event.onClose()
      expect(event.store.dialog.isOpen).toBe(false)
    })

    it('opens dialog with specified title and content', () => {
      event.onOpen('Hello', 'World')
      expect(event.store.dialog.isOpen).toBe(true)
      expect(event.store.dialog.title).toBe('Hello')
      expect(event.store.dialog.content).toBe('World')
    })

    it('opens dialog with specified button text and the state of enabled', () => {
      event.onOpen('', '', 'Yeah', false)
      expect(event.store.dialog.isButtonEnabled).toBe(false)
      expect(event.store.dialog.buttonText).toBe('Yeah')
    })
  })
})
