import { Store } from '../../store'
import { Event } from '../../event'

describe('events', () => {
  describe('Event', () => {
    it('is constructed', () => {
      const event = new Event(new Store())
      expect(event).toBeDefined()
      expect(event.credential).toBeDefined()
      expect(event.application).toBeDefined()
    })
  })
})
