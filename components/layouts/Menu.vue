<template>
  <div>
    <v-btn icon>
      <fa :icon="faBars" style="font-size: 23px" color="white" @click.stop="drawer = !drawer" />
    </v-btn>

    <v-navigation-drawer v-model="drawer"
                         class="side-menu"
                         fixed
                         temporary
                         right
    >
      <v-list class="pt-0 list" dense>
        <v-list-tile
          v-for="(item, i) in menus"
          :key="i"
          class="list-tile"
          @click="go(item.url)"
        >
          <v-list-tile-action>
            <fa :icon="item.icon" class="menu-icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="list-title">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import menu from '~/mixins/menu'
import method from '~/mixins/method'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default {
  mixins: [menu, method],
  data: () => ({
    drawer: null
  }),
  computed: {
    faBars() {
      return faBars
    }
  }
}
</script>

<style scoped>
/* スマホの場合は小さくする */
@media screen and (max-width: 400px) {
  .side-menu {
    width: 200px !important;
  }
}
.side-menu {
  /* height: 100vh !important; */
}
.list-title {
  font-size: 16px;
}
.list {
  margin-top: 10px;
}
.list-tile {
  margin-top: 10px;
}
.menu-icon {
  font-size: 23px;
  color: gray;
}
</style>
