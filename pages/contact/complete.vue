<template>
  <div class="form">
    <div class="complete">
      お問い合わせありがとうございました。<br>
      こちらからご連絡致しますので少々お待ちください。
    </div>
    <v-layout align-center justify-center row class="btn-layout">
      <v-btn class="btn" color="primary" @click="goTop()">トップページに戻る</v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  methods: {
    goTop() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
@import '~/assets/form.css';
/* 完了ページだけ上下にスペースを作る */
.form {
  padding-top: 50px;
}
.btn-layout {
  padding-bottom: 150px;
}
</style>
