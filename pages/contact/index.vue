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
        name="お名前"
        label="お名前"
        required
      />
      <v-text-field
        v-model="mail"
        :rules="mailRules"
        class="text-mail"
        name="メールアドレス"
        label="メールアドレス"
        required
      />
      <v-textarea
        v-model="contents"
        :rules="contentsRules"
        class="text-contents"
        outline
        name="お問い合わせ内容"
        label="お問い合わせ内容"
      />
      <v-layout align-center justify-center row class="btn-layout">
        <v-btn
          :disabled="!canClick"
          class="btn white--text"
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
  head() {
    return {
      title: 'お問い合わせ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'エンジニアのための複業メディアサイト「Fukugyou」へのお問い合わせ'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'エンジニアのための複業メディアサイト「Fukugyou」へのお問い合わせ'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'お問い合わせ'
        }
      ]
    }
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
          text: 'ホーム',
          disabled: false,
          url: process.env.constant.sitePathHome
        },
        {
          text: 'お問い合わせ',
          disabled: true,
          url: process.env.constant.sitePathContact
        }
      ]
    }
  },
  methods: {
    next() {
      this.$router.push('/contact/confirm/')
    },
    ...mapMutations('contact', ['setName', 'setMail', 'setContents'])
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/form.scss';

.btn {
  background-color: $mainColor !important;
  border-color: $mainColor !important;
}
</style>
