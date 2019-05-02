<template>
  <v-subheader class="subheader">
    {{ text }}
  </v-subheader>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 350px) {
  .subheader {
    margin: 15px 15px;
  }
}
@media screen and (min-width: 900px) {
  .subheader {
    width: 60%;
    padding-bottom: 20px;
  }
}
</style>
