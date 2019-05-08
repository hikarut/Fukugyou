<template>
  <div class="tile-parent">
    <div>
      <img v-lazy="img" src="/loading.png" class="tile">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.tile-parent {
  display: flex;
  justify-content: flex-start;
  min-width: 56px;
}
.tile {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.tile img {
  /* border-radius: 50%; */
  display: inline-flex;
  height: inherit;
  width: inherit;
}
</style>
