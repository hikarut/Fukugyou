<template>
  <div class="date-subheader">
    {{ text }}&nbsp;更新
  </div>
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
.date-subheader {
  font-size: 14px;
  width: 90%;
  /* margin: -20px auto 0px 20px; */
  margin: 0px 20px 5px 30px;
  color: rgba(0, 0, 0, 0.54);
  text-align: left;
}
</style>
