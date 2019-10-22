import { checkName, checkMail, checkContents } from '~/lib/validation'

describe('lib/validation', () => {
  describe('checkName', () => {
    test('お問い合わせ内容が空', () => {
      const name = ''
      const ret = checkName(name)
      expect(ret).toBe('名前は必須入力です')
    })
    test('正しいお問い合わせ内容', () => {
      const name = 'テスト'
      const ret = checkName(name)
      expect(ret).toBe(true)
    })
  })

  describe('checkMail', () => {
    test('メールアドレスが空', () => {
      const mail = ''
      const ret = checkMail(mail)
      expect(ret).toBe('メールアドレスは必須入力です')
    })
    test('メールアドレスの形式が間違っている', () => {
      const mail = 'ei999aef'
      const ret = checkMail(mail)
      expect(ret).toBe('正しいメールアドレスの形式で入力してください')
    })
    test('正しいメールアドレス', () => {
      const mail = 'test1@test'
      const ret = checkMail(mail)
      expect(ret).toBe(true)
    })
  })

  describe('checkContents', () => {
    test('お問い合わせ内容が空', () => {
      const contents = ''
      const ret = checkContents(contents)
      expect(ret).toBe('お問い合わせ内容は必須入力です')
    })
    test('正しいお問い合わせ内容', () => {
      const contents = 'テスト'
      const ret = checkContents(contents)
      expect(ret).toBe(true)
    })
  })
})
