<template>
  <v-footer class="footer" color="#134b8a" height="200">
    <v-flex
      text-xs-center class="footer-title">
      <logo /><br>
      <v-btn icon>
        <a href="https://twitter.com/intent/tweet?url=https://fukugyou.dev&text=エンジニアのための複業メディアサイト&hashtags=複業" target="blank"><v-icon>fa-twitter</v-icon></a>
      </v-btn><br>
      <div>
        <li v-for="(item, i) in menus" :key="i" class="link">
          <nuxt-link :to="`${item.url}`">{{ item.title }}</nuxt-link>
        </li>
      </div>
      <div class="copyright">
        Copyright &copy;&nbsp;{{ date }}&nbsp;-&nbsp;<strong>Fukugyou</strong>
      </div>
    </v-flex>
  </v-footer>
</template>

<script>
import Logo from '~/components/layouts/Logo.vue'
import menu from '~/mixins/menu'

export default {
  components: {
    Logo
  },
  mixins: [menu],
  data: () => ({
    date: new Date().getFullYear()
  })
}
</script>

<style>
.footer {
  position: absolute;
  width: 100%;
}
.footer-title {
  color: white;
}
/* twitter icon */
.v-btn .v-btn__content .v-icon {
  color: white;
}
.link {
  list-style: none;
  display: inline;
  padding: 0 5px 0 5px;
}
.link a {
  text-decoration: none;
  /* color: black; */
  color: white;
}
.link a:hover {
  text-decoration: underline;
}
.copyright {
  margin-top: 10px;
  /* color: black; */
  color: white;
}
</style>
