<template>
  <div>
    <span v-for="(tag, i) in tags.split(',')" :key="i" class="tag_text">
      {{ tag }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.tag_text {
  background-color: #bbb;
  border-radius: 5%;
  margin-left: 10px;
  color: white;
  padding: 0px 5px 0px 5px;
  margin: 5px 5px 5px 5px;
  line-height: 30px;
  display: inline-block;
  font-size: 12px;
}
.tag_text:after {
  content: '';
  margin-right: 1px;
  float: right;
}
</style>
