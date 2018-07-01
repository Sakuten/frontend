import { ApplicationObject } from '../application'
import { Store } from '../../store'

describe('events', () => {
  describe('ApplicationObject', () => {
    let event

    beforeEach(() => {
      event = new ApplicationObject(new Store())
    })

    it('fetches lists in constructor', () => {
      expect(event.store.application.classroomList.length).not.toBe(0)
      expect(event.store.application.lotteryList.length).not.toBe(0)
    })

    it('changes classroom', () => {
      event.onChangeClassroom(2)
      expect(event.store.application.classroom).toBe(2)
    })

    it('changes lottery', () => {
      event.onChangeLottery(2)
      expect(event.store.application.lottery).toBe(2)
    })

    it('applies to lottery', async () => {
      await event.onApply()
      const applications = event.store.credential.status.get('applications')
      expect(applications).toBeDefined()
    })

    it('cancels lottery', async () => {
      await event.onCancel()
      const applications = event.store.credential.status.get('applications')
      expect(applications).toBeDefined()
    })
  })
})
