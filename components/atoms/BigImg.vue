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
  height: 200px;
  object-fit: cover;
}
/* PC版は高さを広げる */
@media screen and (min-width: 1000px) {
  .big-img {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }
}
</style>
