<template>
  <v-footer height="250">
    <v-flex
      text-xs-center class="footer-title">
      <logo /><br>
      <p class="description">エンジニアのための複業メディアサイト。<br>
        エンジニアのための技術情報や<br>
        複業・副業の情報を提供します。</p>
      <v-btn icon>
        <a :href="twitterUrl" target="blank"><fa :icon="faTwitter" style="font-size: 23px" color="white" /></a>
      </v-btn><br>
      <div>
        <li v-for="(item, i) in menus" :key="i" class="link">
          <nuxt-link :to="`${item.url}`">{{ item.title }}</nuxt-link>
        </li>
      </div>
      <div class="copyright">
        Copyright &copy;&nbsp;{{ date }}&nbsp;-&nbsp;Fukugyou
      </div>
    </v-flex>
  </v-footer>
</template>

<script>
import Logo from '~/components/layouts/Logo.vue'
import menu from '~/mixins/menu'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { twitterUrl } from '~/lib/sns'

export default {
  components: {
    Logo
  },
  mixins: [menu],
  data: () => ({
    date: new Date().getFullYear(),
    twitterUrl: process.env.constant.twitterUrl
  }),
  computed: {
    faTwitter() {
      return faTwitter
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-title {
  color: white;
}
.theme--light.v-footer {
  background: $mainColor;
}
/* twitter icon */
.v-btn .v-btn__content .v-icon {
  color: $white;
}
.link {
  list-style: none;
  display: inline;
  padding: 0 5px 0 5px;
}
.link a {
  text-decoration: none;
  color: $white;
}
.link a:hover {
  text-decoration: underline;
}
.copyright {
  margin-top: 10px;
  color: $white;
}
.description {
  font-size: 12px;
}
</style>
