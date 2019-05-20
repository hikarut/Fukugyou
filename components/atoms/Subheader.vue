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
  /* margin: 15px 0px; */
  margin: 20px 0px 5px 15px;
  /* margin: 20px 0px 30px 15px; */
  color: #424242 !important;

  background: transparent;
  border-left: solid 5px rgba(19, 75, 138, 0.6);
}
</style>
