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
.subheader {
  margin: 15px 0px;
  color: #424242 !important;
}
</style>
