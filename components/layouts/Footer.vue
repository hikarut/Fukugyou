<template>
  <v-footer class="footer" color="light-blue lighten-2" height="120">
    <v-flex
      text-xs-center class="footer-title">
      <v-btn icon>
        <v-icon color="wihte">fa-twitter</v-icon>
      </v-btn><br>
      <div>
        <li v-for="(item, i) in menus" :key="i" class="link">
          <nuxt-link :to="`${item.url}`">{{ item.title }}</nuxt-link>
        </li>
      </div>
      <div class="copyright">
        &copy;{{ date }} - <strong>Fukugyou</strong>
      </div>
    </v-flex>
  </v-footer>
</template>

<script>
import menu from '~/mixins/menu'

export default {
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
  color: white;
}
.link a:hover {
  text-decoration: underline;
}
.copyright {
  margin-top: 10px;
}
</style>
