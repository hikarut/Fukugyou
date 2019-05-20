<template>
  <form
    name="ask-question"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    action="/contact/complete"
  >
    <input type="hidden" name="form-name" value="ask-question" >
    <v-text-field
      v-model="name"
      :value="name"
      name="name"
      label="お名前"
      required
    />
    <v-text-field
      v-model="form.mail"
      :value="form.mail"
      name="mail"
      label="メールアドレス"
      required
    />
    <v-textarea
      v-model="form.inputText"
      :value="form.contents"
      name="contents"
      label="お問い合わせ内容"
    />
    <v-btn color="success" @click="complete()">送信</v-btn>
    <!-- <v-btn color="success" type="submit">送信</v-btn> -->
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
        // return this.contact.name
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
            'form-name': 'ask-question',
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
    ...mapMutations('contact', ['setName', 'setMail', 'setContents']),
    ...mapState({ contact: state => state.contact })
  }
}
</script>
