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
      name="name1"
      label="お名前"
      required
    />
    <v-text-field
      v-model="mail"
      name="mail1"
      label="メールアドレス"
      required
    />
    <v-textarea
      v-model="contents"
      name="contents1"
      label="お問い合わせ内容"
    />
    <v-btn color="success" @click="next()">確認</v-btn>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    form: {
      name: '',
      mail1: '',
      contents1: ''
    }
  }),
  computed: {
    name: {
      get() {
        return this.$store.state.contact.name
      },
      set(value) {
        this.setName(value)
      }
    },
    mail: {
      get() {
        return this.$store.state.contact.mail
      },
      set(value) {
        this.setMail(value)
      }
    },
    contents: {
      get() {
        return this.$store.state.contact.contents
      },
      set(value) {
        this.setContents(value)
      }
    }
  },
  methods: {
    next() {
      console.log('next')
      console.log(this.$store.state.contact.name)
      this.$router.push('/contact/confirm')
    },
    ...mapMutations('contact', ['setName', 'setMail', 'setContents'])
  }
}
</script>
