<template>
  <v-layout align-center column justify-center>
    <img v-if="post.fields.image"
         :src="post.fields.image.fields.file.url"
         :alt="post.fields.image.fields.title"
         class="main-img">
    <div class="main-content">
      <p class="main-title">{{ post.fields.title }}</p>
      <bread-list :items="breadItems"/>
      <p class="main-date">{{ dateString }}</p>
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
import BreadList from '~/components/organisms/BreadList.vue'
import SnsPost from '~/components/molecules/SnsPost.vue'
import { dateString } from '~/plugins/date'
import { getEntryById } from '~/plugins/contentful'

export default {
  components: {
    VueMarkdown,
    SnsPost,
    BreadList
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
      return `https://fukugyou.dev/posts/${this.post.fields.url}`
    },
    shareText() {
      return this.post.fields.title
    },
    shareTag() {
      return this.post.fields.tag
    },
    breadItems() {
      return [
        {
          text: 'トップ',
          disabled: false,
          url: '/'
        },
        {
          text: '記事一覧',
          disabled: false,
          url: '/posts'
        },
        {
          text: this.post.fields.title,
          disabled: true,
          url: '/'
        }
      ]
    }
  },
  // ユニークなIDを指定して記事を取得
  asyncData({ params }) {
    return getEntryById(params.id)
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
.main-date {
  padding-top: 20px;
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
/* 詳細ページだけ場所を調整 */
ul li {
  /* list-style: none;
  display: inline; */
}
.v-breadcrumbs {
  padding: 0px 0px 20px 0px !important;
  /* margin: 0px 0px 20px 0px !important; */
}
</style>
