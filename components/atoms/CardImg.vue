<template>
  <img v-lazy="src" :alt="alt" src="/loading.png" class="card-img">
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
.card-img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
/* PC版は高さを広げる */
@media screen and (min-width: 800px) {
  .card-img {
    height: 200px;
  }
}
</style>
