<template>
  <v-layout align-center column justify-center>
    <img v-if="post.fields.image"
         :src="post.fields.image.fields.file.url"
         :alt="post.fields.image.fields.title"
         class="main-img">
    <div class="main-content">
      <h1>
        <p class="main-title">{{ post.fields.title }}</p>
      </h1>
      <bread-list :items="breadItems"/>
      <p class="main-date">{{ dateString }}</p>
      <sns-post :url="shareUrl" :text="shareText" :tag="shareTag" />
      <v-divider />
      <vue-markdown class="markdown">{{ post.fields.markdown }}</vue-markdown>
      <v-divider />
      <p class="main-tag">
        <tag-list :tags="post.fields.tag" />
      </p>
      <sns-post :url="shareUrl" :text="shareText" :tag="shareTag" />
      <div class="ad">
        <adsbygoogle
          :ad-slot="'7321120508'"
          :ad-format="'auto'"
          class="adsbygoogle" />
      </div>
    </div>
    <div class="list">
      <list-item :items="recomendNews" />
    </div>
  </v-layout>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import BreadList from '~/components/organisms/BreadList.vue'
import SnsPost from '~/components/molecules/SnsPost.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import TagList from '~/components/molecules/TagList.vue'
import { dateString } from '~/lib/date'
import { getEntryById } from '~/plugins/contentful'

const recomendNews = require('~/config/recomendNews.json5')

export default {
  components: {
    VueMarkdown,
    SnsPost,
    BreadList,
    ListItem,
    TagList
  },
  head() {
    return {
      title: `${this.post.fields.title} | ${process.env.constant.title}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.post.fields.tag
        },
        { hid: 'og:url', property: 'og:url', content: this.shareUrl },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.post.fields.title} | ${process.env.constant.title}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.post.fields.image.fields.file.url
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: `https:${this.post.fields.image.fields.file.url}`
        }
      ]
    }
  },
  data: () => ({
    post: [],
    recomendNews: recomendNews
  }),
  computed: {
    dateString() {
      return dateString(this.post.fields.date)
    },
    shareUrl() {
      return `${process.env.constant.url}/posts/${this.post.fields.url}`
    },
    shareText() {
      return this.post.fields.title
    },
    shareTag() {
      // return this.post.fields.tag
      // 記事によらず共通のタグにする
      return '複業,エンジニア'
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
          text: this.post.fields.title.trim(),
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
.list {
  width: 100%;
  margin: 0 auto;
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
  .list {
    width: 60%;
    margin: 0 auto;
  }
}
/* 詳細ページだけ場所を調整 */
.v-breadcrumbs {
  padding: 0px 0px 20px 0px !important;
}
.ad {
  width: 90%;
  margin: 0 auto;
}
</style>
