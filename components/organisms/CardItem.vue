<template>
  <v-layout justify-center>
    <v-flex class="main">
      <subheader v-if="items.header" :text="items.header" :tag="tag" />
      <updated-at-text v-if="items.updatedAt" :text="items.updatedAt" />
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap>

            <template v-for="(card, index) in items.data">

              <!-- 広告表示の場合は横幅一杯のレイアウトにする -->
              <template v-if="isShowWide(index)">
                <v-flex :key="index" class="xs12 card-box">
                  <template v-if="isShowAd(index)">
                    <adsbygoogle
                      :ad-slot="'8969297024'"
                      :ad-format="'fluid'"
                      :ad-layout-key="'-70+dz+1u-28+2r'"
                      class="adsbygoogle infeed" />
                  </template>
                  <a @click="go(card.link)">
                    <v-card class="card">
                      <card-Img :src="card.img" :alt="card.title" :is-big="true"/>
                      <card-date :text="card.date" class="date"/>
                      <card-title :text="card.title" :is-new="card.isNew"/>
                      <div class="out-clip">
                        <out-clip :text="card.service"/>
                      </div>
                    </v-card>
                  </a>
                </v-flex>
              </template>

              <template v-else>
                <v-flex :key="index" class="xs6 card-box">
                  <a @click="go(card.link)">
                    <v-card class="card">
                      <card-Img :src="card.img" :alt="card.title"/>
                      <card-date :text="card.date" class="date"/>
                      <card-title :text="card.title" :is-new="card.isNew"/>
                      <out-clip :text="card.service"/>
                    </v-card>
                  </a>
                </v-flex>
              </template>

            </template>

          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CardDate from '~/components/molecules/CardDate.vue'
import CardTitle from '~/components/molecules/CardTitle.vue'
import CardImg from '~/components/atoms/CardImg.vue'
import Subheader from '~/components/atoms/Subheader.vue'
import UpdatedAtText from '~/components/atoms/UpdatedAtText.vue'
import OutClip from '~/components/atoms/OutClip.vue'

export default {
  components: {
    CardDate,
    CardTitle,
    CardImg,
    Subheader,
    UpdatedAtText,
    OutClip
  },
  props: {
    items: {
      type: Object,
      default: null
    },
    tag: {
      type: String,
      default: 'h1'
    }
  },
  methods: {
    // TODO:ListItemと共通化
    go(url) {
      // 同じサイトないでパス指定の場合(httpが入ってない場合)は通常の画面遷移にする
      if (!url.match(/http/)) {
        this.$router.push(url)
      } else if (url.match(/fukugyou\.dev/)) {
        location.href = url
      } else {
        // 別サイトの場合は別ウィンドウにする
        open(url, '_blank')
      }
    },
    isShowWide(index) {
      // 0スタートなのでわかりやすく1スタートにする
      const number = index + 1
      // 間隔
      const interval = 3

      if (number % interval === 1) {
        return true
      } else if (number % interval === 2) {
        return false
      } else if (number % interval === 0) {
        return false
      }
    },
    isShowAd(index) {
      // 0スタートなのでわかりやすく1スタートにする
      const number = index + 1
      // 間隔
      const interval = 3
      // 1番目は表示しない
      if (number !== 1 && number % interval === 1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.card-box a:hover {
  text-decoration: underline;
  text-decoration-color: rgba(19, 75, 138, 0.7);
}
.card {
  padding-bottom: 15px;
}
/* 枠線を消す */
.v-card {
  box-shadow: initial;
}
.date span {
  /* color: '#9e9e9e'; */
}
.date {
  color: rgba(0, 0, 0, 0.54);
  background-color: whitesmoke;
}
.card.v-card.v-sheet.theme--light {
  background-color: whitesmoke;
  border-radius: 10px 10px 10px 10px;
  margin-bottom: 15px;
}
/* vuetifyから上書き */
.v-card > *:first-child:not(.v-btn):not(.v-chip) {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .main {
    width: 60%;
    margin: 0 auto;
  }
}
.infeed {
  height: 250px;
  margin-bottom: 40px;
  font-family: sans-serif !important;
}
</style>
