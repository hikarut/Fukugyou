/**
 * 名前チェック
 * @param name 名前
 * @return true or string エラーメッセージ
 */
export function checkName(name) {
  if (!name) {
    return '名前は必須入力です'
  }
  return true
}

/**
 * メールアドレスチェック
 * @param mail メールアドレス
 * @return true or string エラーメッセージ
 */
export function checkMail(mail) {
  if (!mail) {
    return 'メールアドレスは必須入力です'
  }
  const regex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
  if (!regex.exec(mail)) {
    return '正しいメールアドレスの形式で入力してください'
  }
  return true
}

/**
 * 問い合わせ内容チェック
 * @param contents 問い合わせ内容
 * @return true or string エラーメッセージ
 */
export function checkContents(contents) {
  if (!contents) {
    return 'お問い合わせ内容は必須入力です'
  }
  return true
}

/**
 * ページングのパラメータチェック
 * @param page ページパラメータ
 * @return Number 数値
 */
export function checkPage(page) {
  if (page === undefined || /^\d$/.test(page) === false) {
    return 1
  }
  return Number(page)
}
