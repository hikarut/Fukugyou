<template>
  <div class="main">
    <bread-list :items="breadItems"/>
    <v-layout align-center column justify-center>
      <h4 class="subheading">
        <p>
          「Fukugyou」はエンジニア向け複業メディアサイトです。<br>
          多様な働き方が選択できる今、複業・副業は誰にでも可能性のある働き方です。<br><br>
          私自身エンジニアとして複業・副業を始めてから非常に良い経験ができていると思っています。<br>
          複業・副業をすることで自身のスキルアップができだけでなく、なにより「働くことの楽しさ」を実感することができました。<br>
          そんな複業・副業の楽しさを1人でも多くの方に知って頂ければ幸いです。<br><br>
          特にエンジニアの方がもっと楽しく自由に開発ができるように、複業・副業に関する情報を集約し、またどんどん発信もしていきたいと思います。<br>
          そしてエンジニアにとって「働くって楽しい」と思える社会を創れるように貢献していきたいと思います。
        </p>
      </h4>
      <author class="author-profile" />
    </v-layout>

    <script type="application/ld+json" v-html="ldJson" />
  </div>
</template>

<script>
import Author from '~/components/molecules/Author.vue'
import BreadList from '~/components/organisms/BreadList.vue'

export default {
  components: {
    BreadList,
    Author
  },
  head() {
    return {
      title: 'Fukugyouとは',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'エンジニアのための複業メディアサイト「Fukugyou」について'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'エンジニアのための複業メディアサイト「Fukugyou」について'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Fukugyouとは'
        }
      ]
    }
  },
  computed: {
    breadItems() {
      return [
        {
          text: 'ホーム',
          disabled: false,
          url: process.env.constant.sitePathHome
        },
        {
          text: 'Fukugyouとは',
          disabled: true,
          url: process.env.constant.sitePathHome
        }
      ]
    },
    ldJson() {
      return JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Person',
        name: 'hikaru takahashi',
        url: `${process.env.constant.url}${process.env.constant.sitePathAbout}`,
        image:
          'https://pbs.twimg.com/profile_images/1134099996658192384/eYLwf5HY_400x400.jpg',
        sameAs: [
          'https://twitter.com/light940/',
          'https://github.com/hikarut',
          'https://www.facebook.com/hikaru.takahashi.5031'
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* h1 img { */
h4 {
  padding-top: 10px;
  padding-bottom: 30px;
}
h4 p {
  width: 90%;
  margin: 0 auto;
}
.author-profile {
  width: 90%;
  padding-bottom: 30px;
}
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .main {
    width: 80%;
    margin: 0 auto;
  }
}
@media screen and (min-width: 1000px) {
  .main {
    width: 60%;
    margin: 0 auto;
  }
}
/* 場所を調整 */
.v-breadcrumbs {
  padding: 20px 0px 20px 24px !important;
}
</style>
