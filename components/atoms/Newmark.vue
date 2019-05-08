<template>
  <v-chip v-if="isNew" color="#e6b276" text-color="white" class="newmark">
    new!
  </v-chip>
</template>

<script>
export default {
  props: {
    isNew: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.newmark {
  font-size: 10px;
  font-weight: bold;
}
</style>
