<template>
  <div class="button">
    <nuxt-link :to="link">
      <v-btn block outline class="button-line">
        {{ text }}
      </v-btn>
    </nuxt-link>
  </div>

</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  width: 90%;
  margin: 0 auto;
}
.button-line {
  color: $mainColor;
}
</style>
