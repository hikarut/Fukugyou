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

<style lang="scss" scoped>
.date {
  color: $darkGrayLight;
  font-size: 14px;
}
.title {
  color: $darkGray !important;
  font-size: 14px !important;
  font-weight: 400;
  -webkit-line-clamp: 3;
}
.v-list__tile__content {
  margin: 0px 0px 0px 10px;
  width: 50%;
}
</style>
