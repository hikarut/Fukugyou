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

  // return `${year}/${month}/${day}(${weekString})`
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
  const beforeDay = 8

  // 現在日時
  const now = new Date()
  const endYear = now.getFullYear()
  const endMonth = toDoubleDigits(now.getMonth() + 1)
  const endDay = toDoubleDigits(now.getDate())
  const end = `${endYear}${endMonth}${endDay}`

  // 8日前
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
  // 開始日
  const startDay = '20190716'
  let endDay = ''
  const dateArray = []

  // 現在日時をセット
  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = toDoubleDigits(now.getMonth() + 1)
  const nowDay = toDoubleDigits(now.getDate())
  const nowKey = `${nowYear}${nowMonth}`
  const nowValue = `${nowYear}${nowMonth}${nowDay}`
  // let nowData = {}
  // nowData[nowKey] = nowValue
  // dateArray.push(nowData)
  dateArray.push({ key: nowKey, value: nowValue })

  while (startDay !== endDay) {
    // 1日前の日付をセット
    now.setDate(now.getDate() - 1)
    const tmpYear = now.getFullYear()
    const tmpMonth = toDoubleDigits(now.getMonth() + 1)
    const tmpDay = toDoubleDigits(now.getDate())
    const tmpKey = `${tmpYear}${tmpMonth}`
    const tmpValue = `${tmpYear}${tmpMonth}${tmpDay}`
    // let tmpData = {}
    // tmpData[tmpKey] = tmpValue
    // dateArray.push(tmpData)
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
