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
      label="お名前"
      required
    />
    <v-text-field
      v-model="mail"
      :rules="nameRules"
      label="メールアドレス"
      required
    />
    <v-textarea
      name="input-7-1"
      label="お問い合わせ内容"
    />
    <v-btn color="success" @click="next()">送信</v-btn>
  </form>
</template>

<script>
export default {
  data: () => ({
    name: '',
    mail: '',
    inputText: ''
  }),
  methods: {
    updatePanelist(ev) {
      this.currentPanelist = ev.target.value
    },
    next() {
      console.log('next')
      this.$router.push('/contact/confirm')
    }
  }
}
</script>
