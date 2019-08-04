<template>
  <v-list-tile-content>
    <v-list-tile-title class="date" v-html="date" />
    <v-list-tile-sub-title class="title" v-html="title" />
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

<style scoped>
.date {
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
}
.title {
  color: #424242 !important;
  font-size: 14px !important;
}
.v-list__tile__content {
  margin: 0px 0px 0px 10px;
  width: 50%;
}
</style>
