<template>
  <form
    name="ask-question-2"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="ask-question-2" >
    <v-text-field
      v-model="name"
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
    <v-btn color="success" @click="complete()">送信</v-btn>
  </form>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  data: () => ({
    form: {
      name: '',
      mail: '',
      inputText: '固定の値'
    }
  }),
  computed: {
    name: {
      get() {
        return this.$store.state.contact.name
        // return 'aa'
        // return this.name
      },
      set(value) {
        this.setName(value)
      }
    }
  },
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
      console.log('this.form')
      console.log(this.form)
      axios
        .post(
          '/',
          this.encode({
            'form-name': 'ask-question-2',
            ...this.form,
            'name-test': this.name
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
    ...mapMutations('contact', ['setName', 'setMail', 'setContents']),
    ...mapState('contact', ['name', 'mail', 'contents'])
  }
}
</script>
