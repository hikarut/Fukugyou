<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>fa-bars</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-tile
        v-for="(item, i) in menus"
        :key="i"
        @click="go(item.url)"
      >
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import menu from '~/mixins/menu'

export default {
  mixins: [menu],
  methods: {
    go(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style>
.v-menu__content {
  width: 180px;
}
</style>
