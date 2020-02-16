<template>
  <div class="main">
    <bread-list :items="breadItems"/>
    <v-layout align-center column justify-center>

      <h3>個人情報の管理</h3>
      <p>
        お客さまからお預かりした個人情報は、当サイトからのご連絡やご質問に対する回答として、電子メールや資料のご送付に利用いたします。
      </p>

      <h3>個人情報の第三者への開示・提供の禁止</h3>
      <p>
        お客さまよりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。<br>
        ・お客さまの同意がある場合<br>
        ・法令に基づき開示することが必要である場合<br>
      </p>

      <h3>個人情報の安全対策</h3>
      <p>
        個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じています。
      </p>

      <h3>ご本人の照会</h3>
      <p>
        お客さまがご本人から、個人情報の照会・修正・削除などを求められたときは、ご本人であることを確認の上、対応いたします。
      </p>

      <h3>法令、規範の遵守と見直し</h3>
      <p>
        保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。
      </p>

      <h3>Google Analyticsの利用について</h3>
      <p>
        より良いサービスを提供するために、当サービスでは Google Analytics を利用する場合があります。<br>
        Google Analytics ではクッキーや類似技術を利用して情報を収集します。<br>
        なお、収集される情報はGoogle社のプライバシーポリシーに基づいて管理されます。
      </p>
    </v-layout>
  </div>
</template>

<script>
import BreadList from '~/components/organisms/BreadList.vue'

export default {
  components: { BreadList },
  head() {
    return {
      title: 'プライバシーポリシー',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'エンジニアのための複業メディアサイト「Fukugyou」のプライバシーポリシーについて'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'エンジニアのための複業メディアサイト「Fukugyou」のプライバシーポリシーについて'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'プライバシーポリシー'
        }
      ]
    }
  },
  computed: {
    breadItems() {
      return [
        {
          text: 'ホーム',
          disabled: false,
          url: '/'
        },
        {
          text: 'プライバシーポリシー',
          disabled: true,
          url: '/'
        }
      ]
    }
  }
}
</script>

<style scoped>
h3 {
  padding-top: 20px;
  padding-bottom: 10px;
  width: 90%;
  text-align: left;
}
p {
  padding-bottom: 30px;
  width: 90%;
  margin: 0 auto;
}
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .main {
    width: 60%;
    margin: 0 auto;
  }
}
/* 場所を調整 */
.v-breadcrumbs {
  padding: 20px 0px 20px 24px !important;
}
</style>
