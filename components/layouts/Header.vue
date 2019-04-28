<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-card-title class="light-blue lighten-2">
          <nuxt-link
            to="/"
            class="logo">
            <span class="headline">Fukugyou</span>
          </nuxt-link>

          <v-spacer/>

          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                v-on="on"
              >
                <v-icon>fa-bars</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-tile
                v-for="(item, i) in menus"
                :key="i"
                @click="go"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-title>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    menus: [{ title: 'Fukugyouとは' }, { title: '問い合わせ' }]
  }),
  methods: {
    go() {}
  }
}
</script>

<style>
a.logo:link,
a.logo:visited,
a.logo:active,
a.logo:hover {
  text-decoration: none;
  color: white;
}
.v-menu__content {
  width: 200px;
}
</style>
