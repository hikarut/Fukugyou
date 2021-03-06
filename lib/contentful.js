require('dotenv').config()
// nuxt.config.jsからも呼び出すため相対パスにする
import { dateString, getAllTerm } from './date'
const contentful = require('contentful')

// 初期設定
const client = contentful.createClient({
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN,
  timeout: 60000,
  retryLimit: 10
})

/*
 * ルーティングのパス取得
 * @return array ページパス一覧
 */
export function routing(postsPerPage) {
  // ルーティングの際は全件取得
  // const isAll = true
  // const allTerm = getAllTerm(isAll)
  return client
    .getEntries({
      content_type: process.env.CONTENT_TYPE
    })
    .then(entries => {
      const page = Math.ceil(entries.total / postsPerPage)
      return [
        ...entries.items.map(entry => `/posts/${entry.fields.url}/`),
        // ページング
        ...[...Array(page).keys()].map(i => `/posts/page/${i + 1}/`)
        // 日次のパス生成
        // ...allTerm.map(data => `/news/${data.key}/${data.value}/`),
        // 月次のパス生成
        // ...allTerm.map(data => `/news/${data.key}/`)
      ]
    })
    .catch(error => {
      console.log(error)
    })
}
/*
 * 記事の取得
 * @param postsPerPage 1ページあたりの取得件数
 * @param skip 取得開始位置
 */

export async function getEntries(postsPerPage = 2, page = 1) {
  return client
    .getEntries({
      content_type: process.env.CONTENT_TYPE,
      order: '-sys.createdAt',
      limit: postsPerPage,
      skip: (page - 1) * postsPerPage
    })
    .then(entries => {
      // 表示用データに整形
      const data = entries.items.map(value => {
        const entryItem = {
          img:
            value.fields.image === undefined
              ? 'favicon.ico'
              : value.fields.image.fields.file.url,
          date: dateString(value.fields.date),
          title: value.fields.title,
          link: `/posts/${value.fields.url}/`,
          tag: value.fields.tag
        }
        return entryItem
      })

      const listData = {}
      listData.data = data
      listData.total = entries.total
      listData.header = process.env.constant.postList
      return {
        listData
      }
    })
    .catch(error => {
      console.log('error')
      console.log(error)
    })
}

/*
 * IDを指定して特定の記事を取得
 * @param id ID
 */
export function getEntryById(id) {
  return client
    .getEntries({
      content_type: process.env.CONTENT_TYPE,
      'fields.url': id
    })
    .then(entries => {
      return {
        post: entries.items[0]
      }
    })
    .catch(error => {
      console.log('error')
      console.log(error)
    })
}
