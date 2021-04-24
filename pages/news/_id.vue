<template>
  <div>
    <div v-if="title === null">
      <v-progress-linear :indeterminate="true"/>
    </div>
    <div v-else>
      {{ title }}
    </div>
    <!-- <bread-list :items="breadItems"/>
    ニュース詳細
    <div v-if="newsDetail === null">
      <v-progress-linear :indeterminate="true"/>
    </div>
    <div v-else>
      {{ newsDetail }}
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BreadList from '~/components/organisms/BreadList.vue'

export default {
  components: { BreadList },
  head() {
    return {
      // title: `${this.newsDetail.title} | ${process.env.constant.title}`,
      // title: `news`,
      title: this.title,
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
    flag: null,
    title: null
  }),
  computed: {
    shareUrl() {
      // return `${process.env.constant.url}/posts/${this.post.fields.url}/`
      return `${process.env.constant.url}`
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
          // text: this.post.fields.title.trim(),
          text: 'aaa',
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
    this.title = 'ニュース詳細'
  },
  methods: {
    ...mapActions('newsV2', ['getNewsById'])
  },
  async asyncData({ store, params }) {
    console.log('asyncData')
    // await store.dispatch('newsV2/getNewsById', params.id)
  }
}
</script>

<style scoped>
</style>
