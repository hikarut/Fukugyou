<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-card-title class="light-blue lighten-2">
          <logo />
          <v-spacer/>
          <header-menu />
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/layouts/Logo.vue'
import HeaderMenu from '~/components/layouts/Menu.vue'

export default {
  components: {
    Logo,
    HeaderMenu
  }
}
</script>
