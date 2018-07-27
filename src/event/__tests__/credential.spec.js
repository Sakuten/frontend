import { CredentialObject } from '../credential'
import { Store } from '../../store'

describe('events', () => {
  describe('CredentialObject', () => {
    let event

    beforeEach(() => {
      event = new CredentialObject(new Store())
    })

    it('changes username', () => {
      event.onChangeUsername('username')
      expect(event.store.credential.username).toBe('username')
    })

    it('clears the token in logout', () => {
      event.onLogout()
      expect(event.store.credential.token.length).toBe(0)
    })

    it('can login', async () => {
      await event.onLogin()
      expect(event.store.credential.token.length).not.toBe(0)
    })

    it('fetches status in login', async () => {
      await event.onLogin()
      expect(event.store.credential.status.size).not.toBe(0)
    })

    it('redirects to /lottery in login', async () => {
      const mock = jest.fn()
      event.store.router.history = {
        push: mock
      }
      await event.onLogin()
      expect(mock).toHaveBeenCalledWith('/lottery')
    })

    it('redirects to /lottery/login in logout', async () => {
      const mock = jest.fn()
      event.store.router.history = {
        push: mock
      }
      event.store.credential.token = 'token'
      await event.onLogout()
      expect(mock).toHaveBeenCalledWith('/lottery/login')
    })
  })
})
