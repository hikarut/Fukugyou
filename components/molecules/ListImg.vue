<template>
  <div class="tile-parent">
    <div>
      <img v-lazy="img" :alt="alt" :class="[isDesktop ? 'responsive' : '']"
           src="/loading.png"
           class="tile">
    </div>
  </div>
</template>

<script>
import device from '~/mixins/device'

export default {
  mixins: [device],
  props: {
    img: {
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
.tile-parent {
  display: flex;
  justify-content: flex-start;
  min-width: 56px;
}
.tile {
  width: 150px;
  height: 80px;
  object-fit: cover;
  margin: 15px 0px 0px -5px;
}
.tile img {
  /* border-radius: 50%; */
  display: inline-flex;
  height: inherit;
  width: inherit;
}
@media screen and (max-width: 1100px) {
  .responsive {
    width: 100px;
    height: 80px;
    object-fit: cover;
    margin: 15px 0px 0px -5px;
  }
}
</style>
