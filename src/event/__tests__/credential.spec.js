import { CredentialObject } from '../credential'
import { Store } from '../../store'

describe('events', () => {
  describe('CredentialObject', () => {
    let event

    beforeEach(() => {
      event = new CredentialObject(new Store())
    })

    it('changes secretId', () => {
      event.onChangeSecretId('secretId')
      expect(event.store.credential.secretId).toBe('secretId')
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
  })
})
