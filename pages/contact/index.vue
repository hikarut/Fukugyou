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
      :rules="nameRules"
      name="name"
      label="お名前"
      required
    />
    <v-text-field
      v-model="form.mail"
      :rules="nameRules"
      name="mail1"
      label="メールアドレス"
      required
    />
    <v-textarea
      v-model="form.inputText"
      name="contents1"
      label="お問い合わせ内容"
    />
    <v-btn color="success" @click="next()">送信</v-btn>
  </form>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data: () => ({
    form: {
      name: '',
      mail: '',
      inputText: ''
    }
  }),
  computed: {
    name: {
      get() {
        // return this.$store.state.contact.name
        return 'aa'
        // return this.name
      },
      set(value) {
        this.setName(value)
      }
    }
  },
  methods: {
    next() {
      console.log('next')
      this.$router.push('/contact/confirm')
    },
    ...mapMutations('contact', ['setName', 'setMail', 'setContents']),
    ...mapState('contact', ['name', 'mail', 'contents'])
  }
}
</script>
