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
      name="name1"
      label="お名前"
      required
    />
    <v-text-field
      v-model="mail"
      :rules="mailRules"
      name="mail1"
      label="メールアドレス"
      required
    />
    <v-textarea
      v-model="contents"
      :rules="contentsRules"
      name="contents1"
      label="お問い合わせ内容"
    />
    <v-btn :disabled="!canClick" color="primary" @click="next()">確認</v-btn>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'
import { checkName, checkMail, checkContents } from '~/lib/validation'

export default {
  data: () => ({
    nameRules: [name => checkName(name)],
    mailRules: [mail => checkMail(mail)],
    contentsRules: [contents => checkContents(contents)]
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
    },
    canClick() {
      // バリデーションチェック
      if (
        checkName(this.$store.state.contact.name) !== true ||
        checkMail(this.$store.state.contact.mail) !== true ||
        checkContents(this.$store.state.contact.contents) !== true
      ) {
        return false
      }
      return true
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
