<template>
  <v-chip v-if="isNew" text-color="white" class="newmark">
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

<style lang="scss" scoped>
.newmark {
  font-size: 10px;
  font-weight: bold;
  color: $newmarkColor;
}
</style>
