<template>
  <v-footer class="footer" color="light-blue lighten-2" height="100">
    <v-flex
      text-xs-center class="footer-title">
      <v-btn icon>
        <v-icon color="wihte">fa-twitter</v-icon>
      </v-btn><br>
      &copy;{{ date }} — <strong>Fukugyou</strong>
    </v-flex>
  </v-footer>
</template>

<script>
export default {
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
</style>
