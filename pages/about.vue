<template>
  <div class="main">
    <bread-list :items="breadItems"/>
    <v-layout align-center column justify-center>
      <h4 class="subheading">
        <p>
          「Fukugyou」はエンジニア向け複業メディアサイトです。<br>
          多様な働き方が選択できる今、複業(副業)は誰にでも可能性のある働き方です。<br><br>
          私自身エンジニアとして複業(副業)を始めてから非常に良い経験ができていると思っています。<br>
          特に複業(副業)を通して「働くことの楽しさ」を実感することができました。<br>
          そんな複業(副業)の楽しさを1人でも多くの方に知って頂ければ幸いです。<br><br>
          特にエンジニアの方がもっと楽しく自由に開発ができるように、複業(副業)に関する情報を集約し、またどんどん発信もしていきたいと思います。<br>
          そしてエンジニアにとって「働くって楽しい」と思える社会を創れるように貢献していきたいと思います。
        </p>
      </h4>
    </v-layout>

    <v-layout align-center column justify-center class="author">
      author
    </v-layout>

    <v-layout align-center column justify-center>
      <v-flex>
        <v-avatar size="100">
          <img
            src="~/assets/profile.jpg"
            alt="hikaru takahashi"
          >
        </v-avatar>
      </v-flex>
      <v-flex>
        <h4 class="subheading">
          <p>
            ・本業：Web系企業エンジニア/マネージャー/データサイエンティスト<br>
            ・複業：株式会社エッグシステムCTO<br>
            ・2つの会社で正社員として働いており「複業」を体現中<br>
            ・複業先の株式会社エッグシステムでは同じように複業で参加しているエンジニアのコミュニティ作りにも貢献<br>
            ・フロントエンドはNuxt+Netlify+Vuetify+Contentful、バックエンドはPython+Firebase+Herokuを使って当サイトを開発
          </p>
        </h4>
        <v-layout align-center row justify-space-around class="sns">
          <a href="https://github.com/hikarut" target="blank"><fa :icon="faGithubSquare" class="square github" /></a>
          <a href="https://twitter.com/light940" target="blank"><fa :icon="faTwitterSquare" class="square twitter" /></a>
          <a href="https://www.facebook.com/hikaru.takahashi.5031" target="blank"><fa :icon="faFacebookSquare" class="square facebook" /></a>
          <a href="https://qiita.com/hikarut" target="blank"><img src="~/assets/qiita-favicon.png" class="qiita"></a>
        </v-layout>
      </v-flex>
    </v-layout>
    <script type="application/ld+json" v-html="ldJson" />
  </div>
</template>

<script>
import BreadList from '~/components/organisms/BreadList.vue'

import {
  faGithubSquare,
  faTwitterSquare,
  faFacebookSquare
} from '@fortawesome/free-brands-svg-icons'

export default {
  components: { BreadList },
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
    faGithubSquare() {
      return faGithubSquare
    },
    faTwitterSquare() {
      return faTwitterSquare
    },
    faFacebookSquare() {
      return faFacebookSquare
    },
    breadItems() {
      return [
        {
          text: 'ホーム',
          disabled: false,
          url: '/'
        },
        {
          text: 'Fukugyouとは',
          disabled: true,
          url: '/'
        }
      ]
    },
    ldJson() {
      return JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Person',
        name: 'hikaru takahashi',
        url: `${process.env.constant.url}/about`,
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
  padding-top: 30px;
}
h4 p {
  width: 90%;
  margin: 0 auto;
}
.author {
  padding-top: 50px;
  padding-bottom: 10px;
  font-size: 20px;
}
.sns {
  margin: 5px 0px 30px 0px;
}
.square {
  font-size: 35px;
}
a {
  text-decoration: none;
}
.qiita {
  width: 30px;
  border-radius: 5px;
  margin-top: 3px;
}
.github {
  color: $githubColor;
}
.twitter {
  color: $twitterColor;
}
.facebook {
  color: $facebookColor;
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
