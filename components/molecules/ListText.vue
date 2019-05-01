<template>
  <v-list-tile-content>
    <v-list-tile-title v-html="date"/>
    <v-list-tile-sub-title v-html="title"/>
  </v-list-tile-content>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
