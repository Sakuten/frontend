import {extractId} from '../extractId'

describe('utils', () => {
  describe('extractId', () => {
    it('extracts secret id from url', () => {
      const id = extractId('https://sakuten.jp/lottery/login?sid=secert_id')
      expect(id).toBe('secert_id')
    })

    it('extracts from another domain', () => {
      const id = extractId('https://sakuten-dev.netlify.com/lottery/login?sid=secert_id')
      expect(id).toBe('secert_id')
    })

    it('extracts null if url is invalid', () => {
      const id = extractId('https://sakuten.jp/lotteries/login?sid=secert_id')
      expect(id).toBeNull()
    })
  })
})
