<template>
  <div class="main">
    <bread-list :items="breadItems"/>
    <v-layout align-center column justify-center>

      <h3>Google Analyticsの利用について</h3>
      <h4 class="subheading">
        <p>
          より良いサービスを提供するために、当サービスでは Google Analytics を利用する場合があります。<br>
          Google Analytics ではクッキーや類似技術を利用して情報を収集します。<br>
          なお、収集される情報はGoogle社のプライバシーポリシーに基づいて管理されます。
        </p>
      </h4>
    </v-layout>
  </div>
</template>

<script>
import BreadList from '~/components/organisms/BreadList.vue'

export default {
  components: { BreadList },
  head() {
    return {
      title: 'プライバシーポリシー'
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
  padding-top: 30px;
}
h4 p {
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
