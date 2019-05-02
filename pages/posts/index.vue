<template>
  <div>
    <big-img-item :items="listData" />
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful'
import { dateString } from '~/plugins/date'
import ListItem from '~/components/organisms/ListItem.vue'
import BigImgItem from '~/components/organisms/BigImgItem.vue'

const client = createClient()

export default {
  components: {
    ListItem,
    BigImgItem
  },
  // 投稿内容を取得
  asyncData() {
    return client
      .getEntries({
        content_type: 'blog',
        // order: '-fields.date',
        order: '-sys.updatedAt',
        limit: 3
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
}
</script>

<style scoped>
h1 {
  padding-top: 20px;
}
.post {
  width: 90%;
  padding-bottom: 10px;
}
</style>
