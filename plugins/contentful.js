// import { contentful } from 'contentful'
import { dateString } from '~/plugins/date'
const contentful = require('contentful')

const config = {
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN
}

export function createClient() {
  return contentful.createClient(config)
}

/*
 * 記事の取得
 * @param 取得件数
 */
export function getEntries(limit) {
  const client = createClient()

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
      console.log(data)

      const listData = {}
      listData.data = data
      listData.header = '記事一覧'
      return {
        listData
      }
    })
    .catch(error => {
      console.log('error')
      console.log(error)
    })
}
