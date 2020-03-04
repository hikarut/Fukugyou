<template>
  <div>
    <tab />
    <v-layout align-center column justify-center>
      <img v-if="post.fields.image"
           :src="imgUrl"
           :alt="post.fields.image.fields.title"
           class="main-img">
      <div class="main-content">
        <h1>
          {{ post.fields.title }}
        </h1>
        <bread-list :items="breadItems"/>
        <p class="main-date">{{ dateString(post.sys.createdAt) }}</p>
        <p class="sub-date">【更新：{{ dateString(post.sys.updatedAt) }}】</p>
        <author :show-sns="false" class="author-top" />
        <sns-post :url="shareUrl" :text="shareText" :tag="shareTag" />
        <v-divider />
        <div class="markdown" v-html="$md.render(post.fields.markdown)"/>
        <v-divider />
        <p class="main-tag">
          <tag-list :tags="post.fields.tag" />
        </p>
        <sns-post :url="shareUrl" :text="shareText" :tag="shareTag" />
        <div class="ad">
          <ad-sense-display />
        </div>
      </div>
      <author />
      <div class="list">
        <list-item :items="recomendNews" />
      </div>
      <script type="application/ld+json" v-html="ldJson" />
    </v-layout>
  </div>
</template>

<script>
import AdSenseDisplay from '~/components/atoms/AdSenseDisplay.vue'
import SnsPost from '~/components/molecules/SnsPost.vue'
import TagList from '~/components/molecules/TagList.vue'
import Author from '~/components/molecules/Author.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import Tab from '~/components/layouts/Tab.vue'
import { dateString } from '~/lib/date'
import { getEntryById } from '~/lib/contentful'
import recomendNews from '~/config/recomendNews.json5'

export default {
  components: {
    SnsPost,
    BreadList,
    ListItem,
    TagList,
    Tab,
    AdSenseDisplay,
    Author
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
        {
          hid: 'description',
          name: 'description',
          content: this.post.fields.description
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.fields.description
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
          content: `https:${this.post.fields.image.fields.file.url}`
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: `https:${this.post.fields.image.fields.file.url}`
        }
      ],
      script: [
        {
          src: 'https://platform.twitter.com/widgets.js',
          defer: true
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: this.shareUrl
        }
      ]
    }
  },
  data: () => ({
    post: [],
    recomendNews: recomendNews
  }),
  computed: {
    imgUrl() {
      return `${this.post.fields.image.fields.file.url}?w=${
        process.env.constant.imageWidth
      }`
    },
    shareUrl() {
      return `${process.env.constant.url}/posts/${this.post.fields.url}/`
    },
    shareText() {
      return this.post.fields.title
    },
    shareTag() {
      // return this.post.fields.tag
      // 記事によらず共通のタグにする
      return process.env.constant.twitterTag
    },
    breadItems() {
      return [
        {
          text: 'ホーム',
          disabled: false,
          url: process.env.constant.sitePathHome
        },
        {
          text: process.env.constant.postList,
          disabled: false,
          url: process.env.constant.sitePathPosts
        },
        {
          text: this.post.fields.title.trim(),
          disabled: true,
          url: process.env.constant.sitePathHome
        }
      ]
    },
    ldJson() {
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${process.env.constant.url}/posts/${this.post.fields.url}`
        },
        headline: this.post.fields.title,
        description: process.env.constant.description,
        image: {
          '@type': 'ImageObject',
          url: this.post.fields.image.fields.file.url,
          width: 1200,
          height: 800
        },
        author: {
          '@type': 'Person',
          name: 'hikaru takahashi'
        },
        datePublished: this.dateString(this.post.sys.createdAt, true),
        dateModified: this.dateString(this.post.sys.updatedAt, true)
      })
    }
  },
  methods: {
    dateString(date) {
      const detail = true
      return dateString(date, detail)
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
  padding-top: 20px;
}
.main-content {
  width: 90%;
}
.markdown {
  line-height: 30px;
  padding-top: 20px;
  font-size: 16px;
  margin-top: -30px;
}
h1 {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
}
.sub-date {
  font-size: 12px;
  margin-top: -10px;
}
.main-tag {
  padding-top: 20px;
  font-weight: bold;
}
.list {
  width: 100%;
  margin: 0 auto;
}
.author-top {
  width: 100%;
  margin-bottom: 15px;
  padding-top: 10px;
}
/* PC版の場合は全体を中央に寄せる */
@media screen and (min-width: 900px) {
  .main-img {
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
/* スマホの場合は上下左右にスペースを開ける */
@media screen and (max-width: 400px) {
  .main-img {
    padding-top: 20px;
    width: 90%;
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
