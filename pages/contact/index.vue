<template>
  <div>
    <v-text-field
      v-model="form.name"
      :rules="nameRules"
      name="name1"
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
  </div>
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
