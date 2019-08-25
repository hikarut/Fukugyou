// 一番昔の記事(これ以前の記事は存在しない)
const minDate = '20190716'
const minMonth = '201907'

/*
 * 表示用日付文字列に変換
 * @param str 日付文字列(yyyy/mm/dd)
 * @return str `yyyy/mm/dd/(week)`
 */
export function dateString(str) {
  let date = new Date(str)
  const year = date.getFullYear()
  const month = toDoubleDigits(date.getMonth() + 1)
  const day = toDoubleDigits(date.getDate())
  const weekNumber = date.getDay()
  const weekString = ['日', '月', '火', '水', '木', '金', '土'][weekNumber]

  return `${year}年${month}月${day}日(${weekString})`
}

/*
 * 日付を0付きにする
 * @param num 日付
 * @return str 0付き日付
 */
function toDoubleDigits(num) {
  num += ''
  if (num.length === 1) {
    num = '0' + num
  }
  return num
}

/*
 * トップに表示する用の期間を取得
 * @return obj {yyyymmdd, yyyymmdd}
 */
export function getTopTerm() {
  // 何日前の日付を取得するか
  const beforeDay = 7

  // 現在日時
  const now = new Date()
  const endYear = now.getFullYear()
  const endMonth = toDoubleDigits(now.getMonth() + 1)
  const endDay = toDoubleDigits(now.getDate())
  const end = `${endYear}${endMonth}${endDay}`

  // 9日前
  now.setDate(now.getDate() - beforeDay)
  const startYear = now.getFullYear()
  const startMonth = toDoubleDigits(now.getMonth() + 1)
  const startDay = toDoubleDigits(now.getDate())
  const start = `${startYear}${startMonth}${startDay}`

  return { start, end }
}

/*
 * 静的ページに必要な期間を取得
 * @return obj {yyyymmdd, yyyymmdd}
 */
export function getAllTerm() {
  let endDay = ''
  const dateArray = []

  // 現在日時をセット
  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = toDoubleDigits(now.getMonth() + 1)
  const nowDay = toDoubleDigits(now.getDate())
  const nowKey = `${nowYear}${nowMonth}`
  const nowValue = `${nowYear}${nowMonth}${nowDay}`
  dateArray.push({ key: nowKey, value: nowValue })

  while (minDate !== endDay) {
    // 1日前の日付をセット
    now.setDate(now.getDate() - 1)
    const tmpYear = now.getFullYear()
    const tmpMonth = toDoubleDigits(now.getMonth() + 1)
    const tmpDay = toDoubleDigits(now.getDate())
    const tmpKey = `${tmpYear}${tmpMonth}`
    const tmpValue = `${tmpYear}${tmpMonth}${tmpDay}`
    dateArray.push({ key: tmpKey, value: tmpValue })
    endDay = `${tmpYear}${tmpMonth}${tmpDay}`
  }

  return dateArray
}

/*
 * yyyymmddからyyyy/mm/ddに変換する
 * @param str yyyymmdd
 * @return str yyyy/mm/dd
 */
export function addSlash(str) {
  if (String(str).length === 8) {
    const year = str.substr(0, 4)
    const month = str.substr(4, 2)
    const day = str.substr(6, 2)

    return `${year}/${month}/${day}`
  } else if (String(str).length === 6) {
    const year = str.substr(0, 4)
    const month = str.substr(4, 2)

    return `${year}/${month}`
  } else {
    return str
  }
}

/*
 * yyyymmddからyyyy年mm月dd日に変換する
 * @param str yyyymmdd
 * @return str yyyy年mm月dd日
 */
export function addDateString(str) {
  if (String(str).length === 8) {
    const year = str.substr(0, 4)
    const month = str.substr(4, 2)
    const day = str.substr(6, 2)

    return `${year}年${month}月${day}日`
  } else if (String(str).length === 6) {
    const year = str.substr(0, 4)
    const month = str.substr(4, 2)

    return `${year}年${month}月`
  } else {
    return str
  }
}

/*
 * 翌日(翌月)を取得
 * @param str yyyymmdd or yyyymm
 * @return str yyyymmdd or yyyymm
 */
export function getNextDate(str) {
  if (String(str).length === 8) {
    // スラッシュ付きに変換して日付を取得
    const now = new Date(addSlash(str))
    now.setDate(now.getDate() + 1)
    const year = now.getFullYear()
    const month = toDoubleDigits(now.getMonth() + 1)
    const day = toDoubleDigits(now.getDate())

    return `${year}${month}${day}`
  } else if (String(str).length === 6) {
    // スラッシュ付きに変換して日付を取得
    const now = new Date(addSlash(str))
    now.setMonth(now.getMonth() + 1)
    const year = now.getFullYear()
    const month = toDoubleDigits(now.getMonth() + 1)

    return `${year}${month}`
  } else {
    return str
  }
}

/*
 * 前日(前月)を取得
 * @param str yyyymmdd or yyyymm
 * @return str yyyymmdd or yyyymm
 */
export function getBeforeDate(str) {
  if (String(str).length === 8) {
    // スラッシュ付きに変換して日付を取得
    const now = new Date(addSlash(str))
    now.setDate(now.getDate() - 1)
    const year = now.getFullYear()
    const month = toDoubleDigits(now.getMonth() + 1)
    const day = toDoubleDigits(now.getDate())

    return `${year}${month}${day}`
  } else if (String(str).length === 6) {
    // スラッシュ付きに変換して日付を取得
    const now = new Date(addSlash(str))
    now.setMonth(now.getMonth() - 1)
    const year = now.getFullYear()
    const month = toDoubleDigits(now.getMonth() + 1)

    return `${year}${month}`
  } else {
    return str
  }
}

/*
 * URL用の日付を取得
 * @param str yyyymmdd
 * @return str yyyymm/yyyymmdd
 */
export function getDateLink(str) {
  // 現在日付
  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = toDoubleDigits(now.getMonth() + 1)
  const nowDay = toDoubleDigits(now.getDate())
  const nowDateLink = `${nowYear}${nowMonth}${nowDay}`
  const nowMonthLink = `${nowYear}${nowMonth}`

  if (String(str).length === 8) {
    const year = str.substr(0, 4)
    const month = str.substr(4, 2)
    const day = str.substr(6, 2)
    const dateLink = `${year}${month}${day}`
    // 存在しない日付のチェック
    if (dateLink > nowDateLink || dateLink < minDate) {
      return ''
    } else {
      return `${year}${month}/${year}${month}${day}`
    }
  } else if (String(str).length === 6) {
    const year = str.substr(0, 4)
    const month = str.substr(4, 2)
    const monthLink = `${year}${month}`
    // 存在しない日付のチェック
    if (monthLink > nowMonthLink || monthLink < minMonth) {
      return ''
    } else {
      return `${year}${month}`
    }
  } else {
    return ''
  }
}
