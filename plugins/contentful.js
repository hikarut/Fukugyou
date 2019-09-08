// import { contentful } from 'contentful'
import { dateString } from '~/lib/date'
const contentful = require('contentful')

// 初期設定
const config = {
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN
}
const client = contentful.createClient(config)

/*
 * 記事の取得
 * @param limit 取得件数
 */
export function getEntries(limit) {
  return client
    .getEntries({
      content_type: process.env.CONTENT_TYPE,
      order: '-sys.updatedAt',
      limit: limit
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
          link: `/posts/${value.fields.url}`,
          tag: value.fields.tag
        }
        return entryItem
      })

      const listData = {}
      listData.data = data
      listData.header = 'エンジニア向け複業(副業)ニュース'
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
