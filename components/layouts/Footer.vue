<template>
  <v-footer class="footer" color="blue">
    <v-flex
      text-xs-center class="footer-title">
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
</style>
