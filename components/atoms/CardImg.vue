<template>
  <img v-lazy="src" src="/loading.png" class="card-img">
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
.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
