<template>
  <v-layout align-center column justify-center>
    <img v-if="post.fields.image"
         :src="post.fields.image.fields.file.url"
         :alt="post.fields.image.fields.title"
         class="main-img">
    <div class="main-content">
      <p class="main-title">{{ post.fields.title }}</p>
      <p>{{ dateString }}</p>
      <sns-post :url="shareUrl" :text="shareText" :tag="shareTag"/>
      <v-divider />
      <vue-markdown class="markdown">{{ post.fields.markdown }}</vue-markdown>
      <v-divider />
      <p class="main-tag">{{ post.fields.tag }}</p>
      <sns-post />
    </div>
  </v-layout>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import SnsPost from '~/components/molecules/SnsPost.vue'
import { createClient } from '~/plugins/contentful'
import { dateString } from '~/plugins/date'
const client = createClient()

export default {
  components: {
    VueMarkdown,
    SnsPost
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
  computed: {
    dateString() {
      return dateString(this.post.fields.date)
    },
    shareUrl() {
      return location.href
    },
    shareText() {
      return this.post.fields.title
    },
    shareTag() {
      return this.post.fields.tag
    }
  },
  // ユニークなIDを指定して記事を取得
  asyncData({ params }) {
    return client
      .getEntries({
        content_type: process.env.CONTENT_TYPE,
        'fields.url': params.id
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
}
</script>

<style scoped>
.main-img {
  padding-top: 30px;
  width: 90%;
}
.main-content {
  width: 90%;
}
.markdown {
  line-height: 30px;
  padding-top: 20px;
  font-size: 16px;
}
.main-title {
  padding-top: 20px;
  font-size: 25px;
  font-weight: bold;
}
.main-tag {
  padding-top: 20px;
  font-weight: bold;
}
/* PC版の場合は全体を中央に寄せる */
@media screen and (min-width: 900px) {
  .main-img {
    padding-top: 30px;
    width: 60%;
  }
  .main-content {
    width: 60%;
  }
  .markdown {
    line-height: 36px;
    padding-top: 20px;
    font-size: 18px;
  }
  .main-title {
    font-size: 35px;
  }
}
</style>
