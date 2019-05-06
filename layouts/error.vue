<template>
  <div>
    <v-layout align-center column justify-center>
      <div v-if="statusCode === 404" class="error-word" >ページが見つかりません。</div>
      <div v-else class="error-word">エラーです。</div>
      <div class="error-top"><a href="/">トップページ</a>に戻る。</div>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: 'エラー'
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    }
  }
}
</script>

<style scoped>
.error-word {
  padding-top: 150px;
}
.error-top {
  padding-bottom: 170px;
}
</style>
