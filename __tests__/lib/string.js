import { cutString } from '~/lib/string'

describe('lib/string', () => {
  describe('cutString', () => {
    test('記事タイトルが短い場合', () => {
      const title = '複業の記事タイトル'
      const ret = cutString(title)
      expect(ret).toBe('複業の記事タイトル')
    })
    test('記事タイトルが長い場合', () => {
      const title =
        '記事タイトルが長い場合のテストです。60文字以上ある場合はレイアウトが崩れてしまうため...をつなげてタイトルを短くする処理を入れています。'
      const ret = cutString(title)
      expect(ret).toBe(
        '記事タイトルが長い場合のテストです。60文字以上ある場合はレイアウトが崩れてしまうため...をつなげてタイトルを短くする...'
      )
    })
  })
})
