<template>
  <v-layout align-center column justify-center>
    <h1>記事一覧</h1>
    <h3>{{ post.fields.title }}</h3>
    <img v-if="post.fields.image"
         :src="post.fields.image.fields.file.url"
         :alt="post.fields.image.fields.title"
         width="200px">
    <p>{{ (new Date(post.fields.date)).toDateString() }}</p>
    <p>{{ post.fields.content }}</p>
    <p>{{ post.fields.markdouwn }}</p>
    <vue-markdown>{{ post.fields.markdouwn }}</vue-markdown>
    <p>{{ post.fields.tag }}</p>
  </v-layout>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { createClient } from '~/plugins/contentful'
const client = createClient()

export default {
  components: {
    VueMarkdown
  },
  head() {
    return {
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.post.fields.tag
        }
      ]
    }
  },
  data: () => ({
    post: []
  }),
  // ユニークなIDを指定して記事を取得
  asyncData({ params }) {
    return client
      .getEntries({
        content_type: 'blog',
        'fields.url': params.id
      })
      .then(entries => {
        console.log(entries.items[0])
        return {
          post: entries.items[0]
        }
      })
      .catch(error => {
        console.log('error')
        console.log(error)
      })
  }
}
</script>
