<template>
  <v-layout row class="box">
    <v-flex xs3 class="profile">
      <p>
        <v-avatar size="70">
          <profile-img />
        </v-avatar>
      </p>
    </v-flex>
    <v-flex xs9>
      <p class="author-name">高橋 光</p>
      <p class="author-text">
        ・本業：Webエンジニアを経てマネジメントやデータアナリストとして活動<br>
        ・複業 / 副業：ベンチャー企業CTOを経てB.LEAGUEクラブチームのマーケティングストラテジストとしてデータ分析を担当。個人で当サイトであるエンジニア向け副業・複業メディアサイト<nuxt-link :to="sitePathHome">「Fukugyou 」</nuxt-link>を運営<br>
      </p>
      <div v-if="showSns">
        <profile-github />
        <profile-twitter />
        <profile-facebook />
        <profile-qiita />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import ProfileImg from '~/components/atoms/ProfileImg.vue'
import ProfileGithub from '~/components/atoms/ProfileGithub.vue'
import ProfileTwitter from '~/components/atoms/ProfileTwitter.vue'
import ProfileFacebook from '~/components/atoms/ProfileFacebook.vue'
import ProfileQiita from '~/components/atoms/ProfileQiita.vue'

export default {
  components: {
    ProfileImg,
    ProfileGithub,
    ProfileTwitter,
    ProfileFacebook,
    ProfileQiita
  },
  props: {
    showSns: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    sitePathHome: process.env.constant.sitePathHome
  })
}
</script>

<style lang="scss" scoped>
.profile p {
  margin: auto;
  text-align: center;
}
.author-name {
  margin: auto;
  font-weight: bold;
}
.author-text {
  margin: auto;
  font-size: 12px;
}
.box {
  width: 60%;
}
/* スマホの場合は横幅いっぱいにする */
@media screen and (max-width: 900px) {
  .box {
    width: 95%;
  }
  .author-text {
    margin-right: 20px;
  }
}
</style>
