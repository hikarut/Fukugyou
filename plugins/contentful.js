// import { contentful } from 'contentful'
import { dateString } from '~/lib/date'
const contentful = require('contentful')
const constant = require('~/config/constant.json')

// 初期設定
const config = {
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN,
  timeout: 60000,
  retryLimit: 10
}
const client = contentful.createClient(config)

/*
 * 記事の取得
 * @param limit 取得件数
 * @param skip 取得開始位置
 */
export async function getEntries(limit, page = 1) {
  return client
    .getEntries({
      content_type: process.env.CONTENT_TYPE,
      order: '-sys.createdAt',
      limit: limit,
      skip: (page - 1) * constant.postsPerPage
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
