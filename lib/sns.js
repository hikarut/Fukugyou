/*
 * twitterシェアURL
 * @param url シェアURL
 * @param text 文言
 * @param tag ハッシュタグ(カンマ区切りで複数指定可)
 */
export function twitterUrl(url, text = '', tag = '') {
  // return `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${tag}`
  // ハッシュタグをつけるとOGPが表示されない事があるのでいったん無しにする
  return `https://twitter.com/intent/tweet?url=${url}&text=${text}`
}

/*
 * facebookシェアURL
 * @param url シェアURL
 */
export function facebookUrl(url) {
  return `https://www.facebook.com/sharer/sharer.php?u=${url}`
}

/*
 * はてぶシェアURL
 * @param url シェアURL
 */
export function hatenaUrl(url) {
  // httpsを除外する
  const urlString = url.replace('https://', '')
  return `http://b.hatena.ne.jp/entry/s/${urlString}`
}

/*
 * LINEシェアURL
 * @param url シェアURL
 * @param text 文言
 */
export function lineUrl(url, text = '') {
  // URLとテキストをエンコードする
  const shareText = encodeURI(`${text}　${url}`)
  return `http://line.me/R/msg/text/?${shareText}`
}
