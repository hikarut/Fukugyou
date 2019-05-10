<template>
  <div class="button">
    <nuxt-link :to="link">
      <v-btn block outline color="#134b8a">
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

<style scoped>
.button {
  width: 90%;
  margin: 0 auto;
}
</style>
