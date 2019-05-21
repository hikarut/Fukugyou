<template>
  <form
    name="ask-question"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="ask-question" >
    <v-text-field
      v-model="name"
      label="お名前"
      required
    />
    <v-text-field
      v-model="form.mail1"
      label="メールアドレス"
      required
    />
    <v-textarea
      v-model="form.contents1"
      label="お問い合わせ内容"
    />
    <v-btn color="success" @click="complete()">送信</v-btn>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  data: () => ({
    form: {
      name: '',
      mail1: '',
      contents1: '固定の値'
    }
  }),
  computed: {
    name: {
      get() {
        return this.$store.state.contact.name
        // return this.contact.name
      },
      set(value) {
        this.setName(value)
        // this.form.name = value
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
      console.log(this.$store.state.contact.name)
      axios
        .post(
          '/',
          this.encode({
            'form-name': 'ask-question',
            name1: this.$store.state.contact.name,
            ...this.form
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
    ...mapMutations('contact', ['setName', 'setMail', 'setContents'])
  }
}
</script>
