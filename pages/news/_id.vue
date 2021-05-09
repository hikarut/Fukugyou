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
              <out-clip :text="newsDetail.service" class="out-clip" />
            </div>
            <div class="date">
              {{ changeDateString(newsDetail.date) }}
            </div>
          </div>
          <sns-post :url="shareUrl" :text="shareText" :tag="shareTag" class="sns-post" />

          <div class="news-more">
            <v-btn block outline class="action-button" @click="go(newsDetail.link)">
              続きを読む
            </v-btn>
            <div v-if="uid === null" class="not-login">
              ログインしてお気に入り登録する
              <v-btn outline >
                <login-modal class="login" />
              </v-btn>
            </div>
            <v-btn v-if="uid !== null && !favoriteFlag" :disabled="favoriteFlag" block 
                   outline 
                   class="action-button favorite-button"
                   @click="favorite">
              お気に入り 
            </v-btn>
            <div v-if="favoriteFlag" class="not-login">
              <nuxt-link to="/mypage/">お気に入りページで確認する</nuxt-link>
            </div>
          </div>
        </div>

        <div class="list">
          <list-item :items="recomendPosts" />
          <div class="ad">
            <ad-sense-display />
          </div>
        </div>

        <script type="application/ld+json" v-html="ldJson" />
      </v-layout>
    </div>
  </div>
</template>

<script>
import Tab from '~/components/layouts/Tab.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import OutClip from '~/components/atoms/OutClip.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import LoginModal from '~/components/molecules/LoginModal.vue'
import AdSenseDisplay from '~/components/atoms/AdSenseDisplay.vue'
import SnsPost from '~/components/molecules/SnsPost.vue'
import { mapActions, mapGetters } from 'vuex'
import { dateString, addSlash } from '~/lib/date'
import method from '~/mixins/method'
import recomendPosts from '~/config/recomendPosts.json5'

export default {
  components: {
    Tab,
    BreadList,
    OutClip,
    ListItem,
    LoginModal,
    AdSenseDisplay,
    SnsPost
  },
  mixins: [method],
  head() {
    const title =
      this.newsDetail !== undefined
        ? this.newsDetail.title
        : 'データがありません'
    const image =
      this.newsDetail !== undefined
        ? this.newsDetail.img
        : process.env.constant.newsImage
    return {
      title: `${title} | ${process.env.constant.title}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: process.env.constant.keywords
        },
        {
          hid: 'description',
          name: 'description',
          content: title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: title
        },
        { hid: 'og:url', property: 'og:url', content: this.shareUrl },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: image
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
    favoriteFlag: false,
    recomendPosts: recomendPosts
  }),
  computed: {
    imgUrl() {
      return this.newsDetail.img
    },
    shareUrl() {
      return `${process.env.constant.url}/news/${this.newsDetail.id}`
    },
    shareText() {
      return this.newsDetail.title
    },
    shareTag() {
      // return this.post.fields.tag
      // 記事によらず共通のタグにする
      return process.env.constant.twitterTag
    },
    breadItems() {
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
          text: process.env.constant.newsList,
          disabled: false,
          url: process.env.constant.sitePathNews
        },
        {
          text: title.trim(),
          disabled: true,
          url: process.env.constant.sitePathHome
        }
      ]
    },
    ldJson() {
      const title =
        this.newsDetail !== undefined
          ? this.newsDetail.title
          : 'データがありません'
      const image =
        this.newsDetail !== undefined
          ? this.newsDetail.img
          : process.env.constant.newsImage
      const updatedAt =
        this.newsDetail !== undefined ? this.newsDetail.date : ''
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${process.env.constant.url}/news/${this.newsDetail.id}`
        },
        headline: title,
        description: process.env.constant.description,
        image: {
          '@type': 'ImageObject',
          url: image,
          width: 1200,
          height: 800
        },
        author: {
          '@type': 'Person',
          name: 'hikaru takahashi'
        },
        datePublished: this.changeDateString(updatedAt),
        dateModified: this.changeDateString(updatedAt)
      })
    },
    ...mapGetters('newsV2', ['newsDetail']),
    ...mapGetters('login', ['uid'])
  },
  methods: {
    changeDateString(date) {
      return dateString(addSlash(date))
    },
    async favorite() {
      const uid = this.uid
      const id = this.$route.params.id
      try {
        const docRef = this.$firebase
          .firestore()
          .collection(uid)
          .doc('news')
          .collection('data')
          .doc(id)
        await docRef.set({
          id: this.newsDetail.id,
          date: this.newsDetail.date,
          img: this.newsDetail.img,
          service: this.newsDetail.service,
          title: this.newsDetail.title
        })
        this.favoriteFlag = true
      } catch (error) {
        console.log(error)
      }
    },
    ...mapActions('newsV2', ['getNewsById'])
  },
  async fetch({ store, params }) {
    await store.dispatch('newsV2/getNewsById', params.id)
  }
}
</script>

<style lang="scss" scoped>
.main-img {
  width: 90%;
}
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
.sns-post {
  margin-top: 20px;
}
.out-clip {
  margin: 0 0 0 5px;
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
.action-button {
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 30px;
  color: $mainColor;
}
.not-login {
  text-align: center;
}
.login {
  color: $black !important;
}
.list {
  margin-top: 20px;
}
.ad {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
}
/* PC版の場合は全体を中央に寄せる */
@media screen and (min-width: 900px) {
  .main-content {
    width: 60%;
  }
  .main-img {
    width: 60%;
  }
}
/* スマホの場合は上下左右にスペースを開ける */
@media screen and (max-width: 400px) {
  .date {
    margin-top: -2px;
  }
  .action-button {
    width: 80%;
  }
}
/* 場所を調整 */
.v-breadcrumbs {
  padding: 20px 0px 20px 0px !important;
}
</style>
