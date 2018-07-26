import { CredentialObject } from '../credential'
import { Store } from '../../store'

describe('events', () => {
  describe('CredentialObject', () => {
    let event

    beforeEach(() => {
      event = new CredentialObject(new Store())
    })

    it('changes secretId on scan', () => {
      event.onQRScan('https://sakuten.jp/lottery/login?sid=abcd')
      expect(event.store.credential.secretId).toBe('abcd')
    })

    it('don\'t changes secretId on invalid scan', () => {
      event.onQRScan('https://sakuten.jp/')
      expect(event.store.credential.secretId.length).toBe(0)
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
