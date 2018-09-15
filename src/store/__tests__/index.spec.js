import { Store } from '../../store'

describe('Store', () => {
  it('is constructed', () => {
    const store = new Store()
    expect(store).toBeDefined()
    expect(store.credential).toBeDefined()
    expect(store.application).toBeDefined()
    expect(store.error).toBeDefined()
    expect(store.checker).toBeDefined()
  })
})
