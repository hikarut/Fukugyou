<template>
  <div class="menu">
    <v-layout align-center row justify-space-around>
      <nuxt-link to="/fukugyou/why/">
        <v-btn outline color="#134b8a">
          複業をする理由<br>複業のメリット
        </v-btn>
      </nuxt-link>
      <nuxt-link to="/fukugyou/job/">
        <v-btn outline color="#134b8a">
          複業の探し方
        </v-btn>
      </nuxt-link>
    </v-layout>
    <v-layout align-center row justify-space-around>
      <nuxt-link to="/news/fukugyou/">
        <v-btn outline color="#134b8a">
          複業<br>ニュース
        </v-btn>
      </nuxt-link>
      <nuxt-link to="/news/tech/">
        <v-btn outline color="#134b8a">
          エンジニア向け<br>ニュース
        </v-btn>
      </nuxt-link>
    </v-layout>

  </div>
</template>

<script>
import ButtonLink from '~/components/atoms/Button.vue'

export default {
  components: {
    ButtonLink
  }
}
</script>


<style scoped>
.menu {
  padding-top: 20px;
  padding-bottom: 20px;
}
.v-btn {
  width: 150px;
  height: 60px;
}
/* PC版はボタンを大きくする */
@media screen and (min-width: 800px) {
  .v-btn {
    width: 200px;
    height: 60px;
  }
}
@media screen and (min-width: 1000px) {
  .v-btn {
    width: 300px;
    height: 60px;
  }
}
</style>
