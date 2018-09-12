import errors from '../errors.json'

describe('errors.json', () => {
  it('has "translation" and "level" key in each element', () => {
    for (const code in errors) {
      expect(errors[code].translation).toBeDefined()
      expect(errors[code].level).toBeDefined()
    }
  })
})
