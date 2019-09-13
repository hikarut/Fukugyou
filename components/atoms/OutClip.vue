<template>
  <div :class="text" class="outclip">{{ title }}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    title() {
      return this.text === 'newspicks'
        ? 'NewsPicks'
        : this.text === 'hatena'
          ? 'hatena'
          : this.text === 'note'
            ? 'note'
            : ''
    }
  }
}
</script>

<style scoped>
.outclip {
  font-size: 11px;
  width: 80px;
  background-color: black;
  color: white;
  text-align: center;
  /* border-radius: 5px; */
  margin: 0 0 0 10px;
}
.newspicks {
  background-color: black;
}
.hatena {
  background-color: #008fde;
}
.note {
  background-color: #2cb696;
}
</style>
