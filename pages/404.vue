<template>
  <div>
    <v-layout align-center column justify-center>
      <div class="error-word" >ページが見つかりません。</div>
      <div class="error-top"><nuxt-link to="/">ホーム</nuxt-link>に戻る。</div>
    </v-layout>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'エラー'
    }
  }
}
</script>

<style scoped>
.error-word {
  padding-top: 150px;
}
.error-top {
  padding-bottom: 150px;
}
</style>
