<template>
  <img v-lazy="src" :alt="alt" src="/loading.png" class="big-img">
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.big-img {
  width: 100%;
  object-fit: cover;
}
</style>
