<template>
  <v-layout align-center column justify-center>
    <h1>記事一覧</h1>
    <div v-for="(post, i) in posts" :key="i">
      <h3>{{ post.fields.title }}</h3>
      <img v-if="post.fields.image"
           :src="post.fields.image.fields.file.url"
           :alt="post.fields.image.fields.title"
           width="200px">
      <p>{{ (new Date(post.fields.date)).toDateString() }}</p>
      <p>{{ post.fields.tag }}</p>
      <nuxt-link :to="`/posts/${post.fields.url}`"><p>{{ post.fields.url }}</p></nuxt-link>
    </div>
  </v-layout>
</template>

<script>
import { createClient } from '~/plugins/contentful'
const client = createClient()

export default {
  data: () => ({
    posts: []
  }),
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
        console.log(entries.items)
        return {
          posts: entries.items
        }
      })
      .catch(error => {
        console.log('error')
        console.log(error)
      })
  }
}
</script>
