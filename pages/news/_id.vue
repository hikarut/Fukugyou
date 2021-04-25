<template>
  <div>
    <tab />
    <div v-if="newsDetail === null">
      <v-progress-linear :indeterminate="true"/>
    </div>
    <div v-else-if="newsDetail === undefined">
      <v-layout align-center column justify-center>
        データがありません
      </v-layout>
    </div>
    <div v-else>
      <v-layout align-center column justify-center>
        <div class="main-img-out">
          <a @click="go(newsDetail.link)">
            <img v-if="newsDetail.img"
                 :src="newsDetail.img"
                 :alt="newsDetail.title"
                 class="main-img">
          </a>
        </div>
        <div class="main-content">
          <h1>
            <a @click="go(newsDetail.link)">
              {{ newsDetail.title }}
            </a>
          </h1>
          <bread-list :items="breadItems"/>
          <div class="service-info" >
            <div class="service">
              <out-clip :text="newsDetail.service" />
            </div>
            <div class="date">
              {{ changeDateString(newsDetail.date) }}
            </div>
          </div>

          <div class="news-more" @click="go(newsDetail.link)">
            <button-link class="news-more2" text="続きを読む" />
            <button-link class="favorite" text="お気に入り" />
          </div>
        </div>

      </v-layout>
    </div>
  </div>
</template>

<script>
import Tab from '~/components/layouts/Tab.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import OutClip from '~/components/atoms/OutClip.vue'
import ButtonLink from '~/components/atoms/Button.vue'
import { mapActions, mapGetters } from 'vuex'
import { dateString, addSlash } from '~/lib/date'
import method from '~/mixins/method'

export default {
  components: { Tab, BreadList, OutClip, ButtonLink },
  mixins: [method],
  head() {
    console.log('head')
    const title =
      this.newsDetail !== undefined
        ? this.newsDetail.title
        : 'データがありません'
    return {
      title: `${title} | ${process.env.constant.title}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'aa'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'aa'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'aa'
        },
        { hid: 'og:url', property: 'og:url', content: this.shareUrl },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'aa'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'aa'
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: 'aa'
        }
      ],
      script: [
        {
          src: 'https://platform.twitter.com/widgets.js',
          defer: true,
          async: true
          // body: true
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
    // breadItems: null
  }),
  computed: {
    shareUrl() {
      // return `${process.env.constant.url}/posts/${this.post.fields.url}/`
      return `${process.env.constant.url}`
    },
    breadItems() {
      console.log('breadItems')
      const title =
        this.newsDetail !== undefined
          ? this.newsDetail.title
          : 'データがありません'
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
          text: title.trim(),
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
          // '@id': `${process.env.constant.url}/posts/${this.post.fields.url}`
          '@id': `${process.env.constant.url}/news/`
        },
        // headline: this.post.fields.title,
        headline: 'aaa',
        description: process.env.constant.description,
        image: {
          '@type': 'ImageObject',
          // url: this.post.fields.image.fields.file.url,
          url: 'aaa',
          width: 1200,
          height: 800
        },
        author: {
          '@type': 'Person',
          name: 'hikaru takahashi'
        }
        // datePublished: this.dateString(this.post.sys.createdAt, true),
        // dateModified: this.dateString(this.post.sys.updatedAt, true)
      })
    },
    ...mapGetters('newsV2', ['newsDetail'])
  },
  async beforeMount() {
    console.log('beforeMount')
    // await this.$store.dispatch('newsV2/getNewsById', this.$route.params.id)
  },
  methods: {
    changeDateString(date) {
      return dateString(addSlash(date))
    },
    ...mapActions('newsV2', ['getNewsById'])
  },
  async fetch({ store, params }) {
    console.log('fetch')
    // await store.dispatch('news/getTopNews')
    await store.dispatch('newsV2/getNewsById', params.id)
  }
}
</script>

<style lang="scss" scoped>
.main-img-out {
  padding-top: 20px;
  text-align: center;
}
.main-content {
  width: 90%;
}
a {
  color: $black;
}
h1 {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
}
.service-info {
  display: flex;
}
.date {
  margin-left: 10px;
  margin-top: -3px;
}
.service {
  margin-left: -7px;
}
.news-more {
  margin-top: 50px;
}
.favorite {
  margin-top: 20px;
  margin-bottom: 50px;
}
/* PC版の場合は全体を中央に寄せる */
@media screen and (min-width: 900px) {
  .main-content {
    width: 60%;
  }
  .main-img {
    width: 100%;
  }
  .news-more {
    width: 50%;
    margin: 0 auto;
    margin-top: 50px;
  }
}
/* スマホの場合は上下左右にスペースを開ける */
@media screen and (max-width: 400px) {
  .main-img {
    width: 90%;
  }
  .date {
    margin-top: -2px;
  }
}
</style>
