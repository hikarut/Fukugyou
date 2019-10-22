/**
 * 文字列のカット
 * @param string 文字列
 * @return string 編集後の文字列
 */
export function cutString(title) {
  const maxLength = 60
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...'
  } else {
    return title
  }
}
