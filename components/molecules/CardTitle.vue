<template>
  <v-card-actions>
    <span v-text="text"/>
    <v-spacer/>
    <newmark :is-new="isNew"/>
  </v-card-actions>
</template>

<script>
import Newmark from '~/components/atoms/Newmark.vue'

export default {
  components: {
    Newmark
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    isNew: {
      type: Boolean,
      default: false
    }
  }
}
</script>
