import { Store } from '../../store'
import { Event } from '../../event'

describe('events', () => {
  describe('Event', () => {
    let event

    beforeEach(() => {
      event = new Event(new Store())
    })

    it('is constructed', () => {
      expect(event).toBeDefined()
      expect(event.credential).toBeDefined()
      expect(event.application).toBeDefined()
      expect(event.error).toBeDefined()
      expect(event.checker).toBeDefined()
    })

    it('applies to lottery', async () => {
      await event.onApplyLottery()
      const applications = event.store.credential.status.get('application_history')
      expect(applications).toBeDefined()
    })

    it('cancels lottery', async () => {
      await event.onCancelApplication()
      const applications = event.store.credential.status.get('application_history')
      expect(applications).toBeDefined()
    })

    it('logouts on apply when used by staff', async () => {
      Object.defineProperty(event.store.credential, 'isUsedByStaff', {
        get: () => true
      })
      await event.onApplyLottery()
      expect(event.store.credential.isLoggedIn).toBe(false)
    })

    it('logouts on cancel when used by staff', async () => {
      Object.defineProperty(event.store.credential, 'isUsedByStaff', {
        get: () => true
      })
      await event.onCancelApplication()
      expect(event.store.credential.isLoggedIn).toBe(false)
    })
  })
})
