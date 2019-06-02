<template>
  <form
    name="ask-question"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="ask-question" >
    <v-text-field
      v-model="this.$store.state.contact.name"
      :disabled="true"
      label="お名前"
      required
    />
    <v-text-field
      v-model="this.$store.state.contact.mail"
      :disabled="true"
      label="メールアドレス"
      required
    />
    <v-textarea
      v-model="this.$store.state.contact.contents"
      :disabled="true"
      label="お問い合わせ内容"
    />
    <v-btn @click="back()">戻る</v-btn>
    <v-btn color="primary" @click="complete()">送信</v-btn>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  // computed: {
  //   name: {
  //     get() {
  //       return this.$store.state.contact.name
  //     },
  //     set(value) {
  //       this.setName(value)
  //     }
  //   },
  //   mail: {
  //     get() {
  //       return this.$store.state.contact.mail
  //     },
  //     set(value) {
  //       this.setMail(value)
  //     }
  //   },
  //   contents: {
  //     get() {
  //       return this.$store.state.contact.contents
  //     },
  //     set(value) {
  //       this.setContents(value)
  //     }
  //   }
  // },
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
