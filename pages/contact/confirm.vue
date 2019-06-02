<template>
  <form
    name="ask-question"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="ask-question" >
    <div class="form">
      <v-text-field
        v-model="this.$store.state.contact.name"
        :disabled="true"
        class="text-name"
        label="お名前"
        required
      />
      <v-text-field
        v-model="this.$store.state.contact.mail"
        :disabled="true"
        class="text-mail"
        label="メールアドレス"
        required
      />
      <v-textarea
        v-model="this.$store.state.contact.contents"
        :disabled="true"
        outline
        class="text-contents"
        label="お問い合わせ内容"
      />
      <v-layout align-center justify-center row class="btn-layout">
        <v-btn class="btn" @click="back()">戻る</v-btn>
        <v-btn class="btn white--text" color="#134b8a" @click="complete()">送信</v-btn>
      </v-layout>
    </div>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    complete() {
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      console.log(this.$store.state.contact.name)
      axios
        .post(
          '/',
          this.encode({
            'form-name': 'ask-question',
            name1: this.$store.state.contact.name,
            mail1: this.$store.state.contact.mail,
            contents1: this.$store.state.contact.contents
          }),
          axiosConfig
        )
        .then(result => {
          console.log('post')
          console.log(result)
          this.$router.push('/contact/complete')
        })
        .catch(error => {
          console.log('error')
        })
    },
    back() {
      // ブラウザバック
      this.$router.go(-1)
    },
    ...mapMutations('contact', ['setName', 'setMail', 'setContents'])
  }
}
</script>

<style scoped>
@import '~/assets/form.css';
</style>
