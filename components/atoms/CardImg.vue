<template>
  <img v-lazy="src" :alt="alt" :class="[isBig ? 'card-img-big' : 'card-img']" src="/loading.png">
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
    },
    isBig: {
      type: Boolean,
      default: false
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
.card-img-big {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
/* PC版は高さを広げる */
@media screen and (min-width: 800px) {
  .card-img {
    height: 200px;
  }
}
</style>
