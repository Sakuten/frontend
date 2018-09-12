import { CheckerObject } from '../checker'
import { Store } from '../../store'

describe('events', () => {
  describe('CheckerObject', () => {
    let event

    beforeEach(() => {
      event = new CheckerObject(new Store())
    })

    it('changes classroom', () => {
      event.onChangeClassroom(2)
      expect(event.store.checker.classroom).toBe(2)
    })

    it('fetches the status and public id of secret id', async () => {
      await event.onQRScan('https://sakuten.jp/lottery/login?sid=secret_id')
      expect(event.store.checker.lastStatus).toBe('pending')
      expect(event.store.checker.publicId).toBe('ABCD')
    })

    it('doesn\t fetch for same url twice in a row', async () => {
      event.onQRScan('https://sakuten.jp/lottery/login?sid=secret_id')
      const mock = jest.fn()
      event.store.checker.setLastStatus = mock
      event.onQRScan('https://sakuten.jp/lottery/login?sid=secret_id')
      expect(mock).not.toBeCalled()
    })
  })
})
