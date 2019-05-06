<template>
  <v-img
    :src="src"
    class="big-img"
    lazy-src="/loading.png"
  >
    <template v-slot:placeholder>
      <v-layout
        fill-height
        align-center
        justify-center
      >
        <v-progress-circular indeterminate color="grey lighten-5"/>
      </v-layout>
    </template>
  </v-img>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.big-img {
  width: 100%;
  height: 200px;
  object-position: 50% 50%;
}
</style>
