import { CheckerObject } from '../checker'

describe('stores', () => {
  describe('CheckerObject', () => {
    let store

    beforeEach(() => {
      store = new CheckerObject()
    })

    it('can have classroom id', () => {
      store.setClassroom(2)
      expect(store.classroom).toBe(2)
    })

    it('can have last status', () => {
      store.setLastStatus('Unknown')
      expect(store.lastStatus).toBe('Unknown')
    })

    it('can have public id', () => {
      store.setPublicId(2)
      expect(store.publicId).toBe(2)
    })
  })
})
