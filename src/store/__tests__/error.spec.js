import { ErrorObject } from '../error'

describe('stores', () => {
  describe('ErrorObject', () => {
    let store

    beforeEach(() => {
      store = new ErrorObject()
    })

    it('creates new errors', () => {
      store.addError(0, 'Error1')
      store.addError(1, 'Error2')
      expect(store.errorList.length).toBe(2)
      expect(store.errorList[0]).toEqual({code: 0, message: 'Error1'})
      expect(store.errorList[1]).toEqual({code: 1, message: 'Error2'})
    })
  })
})
