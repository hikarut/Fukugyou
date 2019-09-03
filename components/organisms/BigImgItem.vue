<template>
  <v-layout column>
    <subheader v-if="items.header" :text="items.header"/>
    <template v-for="(item, index) in items.data">
      <v-flex :key="item.subtitle" class="main">
        <nuxt-link :to="item.link" >
          <v-card class="card-tile">
            <big-img :src="item.img" :alt="item.title"/>

            <v-card-title primary-title>
              <div>
                <div class="date">{{ item.date }}</div>
                <div class="title">{{ item.title }}</div>
                <div class="tag">{{ item.tag }}</div>
              </div>
            </v-card-title>

          </v-card>
        </nuxt-link>
        <v-divider v-if="index !== (items.data.length - 1)" :key="index" />
        <template v-if="isShowAd(index)">
          <adsbygoogle
            :ad-slot="'8969297024'"
            :ad-format="'fluid'"
            :ad-layout-key="'-6x+ct+5n-11-7j'"
            class="adsbygoogle infeed" />
        </template>
        <v-divider v-if="index !== (items.data.length - 1)" :key="index" />
      </v-flex>
    </template>
  </v-layout>

</template>

<script>
import Subheader from '~/components/atoms/Subheader.vue'
import BigImg from '~/components/atoms/BigImg.vue'

export default {
  components: {
    Subheader,
    BigImg
  },
  props: {
    items: {
      type: Object,
      default: null
    }
  },
  methods: {
    isShowAd(index) {
      // 0スタートなのでわかりやすく1スタートにする
      const number = index + 1
      // 間隔
      const interval = 3

      if (number % interval === 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.main a:hover {
  text-decoration: underline;
  text-decoration-color: rgba(19, 75, 138, 0.7);
}
@media screen and (min-width: 350px) {
  .main {
    /* 見出しがない場合は上にスペースをあける */
    padding-top: 30px;
    width: 90%;
    margin: 0 auto;
    padding-bottom: 20px;
  }
}
/* 枠線を消す */
.v-card {
  box-shadow: initial;
}
.title {
  font-size: 30px;
  line-height: 1.5 !important;
}
.title,
.tag {
  padding-top: 10px;
}
.date,
.tag {
  color: rgba(0, 0, 0, 0.54);
}
</style>
