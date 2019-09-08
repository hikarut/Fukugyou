<template>
  <v-subheader class="subheader">
    <h1 v-if="tag === 'h1'">{{ text }}</h1>
    <h2 v-else-if="tag === 'h2'">{{ text }}</h2>
    <template v-else>{{ text }}</template>
  </v-subheader>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'h1'
    }
  }
}
</script>

<style scoped>
.subheader {
  margin: 20px 0px 5px 15px;
  color: #424242 !important;
  background: transparent;
  border-left: solid 5px rgba(19, 75, 138, 0.6);
}
h1,
h2 {
  font-size: 20px;
  font-weight: normal;
}
</style>
