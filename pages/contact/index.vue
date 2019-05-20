<template>
  <form
    name="ask-question"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="ask-question" >
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
export default {
  data: () => ({
    form: {
      name: '',
      mail: '',
      inputText: ''
    }
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
