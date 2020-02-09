<template>
  <div class="form">
    <bread-list :items="breadItems"/>
    <div class="complete">
      お問い合わせありがとうございました。<br>
      お問い合わせ内容をご確認致しますので少々お待ちください。
    </div>
    <v-layout align-center justify-center row class="btn-layout">
      <v-btn class="btn white--text" color="#134b8a" @click="goTop()">トップページに戻る</v-btn>
    </v-layout>
  </div>
</template>

<script>
import BreadList from '~/components/organisms/BreadList.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    BreadList
  },
  middleware: ['contact'],
  computed: {
    breadItems() {
      return [
        {
          text: 'ホーム',
          disabled: false,
          url: '/'
        },
        {
          text: 'お問い合わせ',
          disabled: false,
          url: '/contact'
        },
        {
          text: '完了',
          disabled: true,
          url: ''
        }
      ]
    }
  },
  beforeMount() {
    this.reset()
  },
  methods: {
    goTop() {
      this.$router.push('/')
    },
    ...mapMutations('contact', ['reset'])
  }
}
</script>

<style scoped>
@import '~/assets/form.css';
/* 完了ページだけ上下にスペースを作る */
.complete {
  padding-top: 50px;
}
.btn-layout {
  padding-bottom: 150px;
}
</style>
