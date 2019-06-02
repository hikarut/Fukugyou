<template>
  <form
    name="ask-question"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="ask-question" >
    <div class="form">
      <bread-list :items="breadItems"/>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        class="text-name"
        name="名前"
        label="お名前"
        required
      />
      <v-text-field
        v-model="mail"
        :rules="mailRules"
        class="text-mail"
        name="mail1"
        label="メールアドレス"
        required
      />
      <v-textarea
        v-model="contents"
        :rules="contentsRules"
        class="text-contents"
        outline
        name="contents1"
        label="お問い合わせ内容"
      />
      <v-layout align-center justify-center row class="btn-layout">
        <v-btn
          :disabled="!canClick"
          class="btn white--text"
          color="#134b8a"
          @click="next()">
          確認
        </v-btn>
      </v-layout>
    </div>
  </form>
</template>

<script>
import BreadList from '~/components/organisms/BreadList.vue'
import { mapMutations } from 'vuex'
import { checkName, checkMail, checkContents } from '~/lib/validation'

export default {
  components: {
    BreadList
  },
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
    },
    breadItems() {
      return [
        {
          text: 'トップ',
          disabled: false,
          url: '/'
        },
        {
          text: 'お問い合わせ',
          disabled: true,
          url: '/contact'
        }
      ]
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

<style scoped>
@import '~/assets/form.css';
</style>
