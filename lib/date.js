export function dateString(str) {
  let date = new Date(str)
  const year = date.getFullYear()
  const month = toDoubleDigits(date.getMonth() + 1)
  const day = toDoubleDigits(date.getDate())
  const weekNumber = date.getDay()
  const weekString = ['日', '月', '火', '水', '木', '金', '土'][weekNumber]

  return `${year}/${month}/${day}(${weekString})`
}

function toDoubleDigits(num) {
  num += ''
  if (num.length === 1) {
    num = '0' + num
  }
  return num
}
