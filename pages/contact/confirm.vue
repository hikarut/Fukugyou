<template>
  <form
    name="ask-question"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="ask-question" >
    <input type="text" name="nameTest" >
    <v-text-field
      v-model="form.name"
      :rules="nameRules"
      name="name"
      label="お名前"
      required
    />
    <v-text-field
      v-model="form.mail"
      :rules="nameRules"
      name="mail"
      label="メールアドレス"
      required
    />
    <v-textarea
      v-model="form.inputText"
      name="contents"
      label="お問い合わせ内容"
    />
    <v-btn color="success" @click="next()">送信</v-btn>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    form: {
      name: '',
      mail: '',
      inputText: '固定の値'
    }
  }),
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    next() {
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      console.log('this.form')
      console.log(this.form)
      axios
        .post(
          '/',
          this.encode({
            'form-name': 'ask-question',
            ...this.form
          }),
          axiosConfig
        )
        .then(result => {
          console.log('post')
          console.log('next')
          console.log(result)
          this.$router.push('/contact/complete')
        })
        .catch(error => {
          console.log('error')
        })
    }
  }
}
</script>
