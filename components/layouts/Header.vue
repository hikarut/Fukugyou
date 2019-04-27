<template>
  <div>
    <v-toolbar color="blue lighten-1">
      <v-toolbar-title>
        <nuxt-link
          to="/"
          class="logo">
          Fukugyou
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer/>

      <v-btn icon>
        <v-icon color="white">fa-info-circle</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="white">fa-envelope</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<style>
a.logo:link,
a.logo:visited,
a.logo:active,
a.logo:hover {
  text-decoration: none;
  color: white;
}
</style>
