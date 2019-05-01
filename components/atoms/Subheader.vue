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
