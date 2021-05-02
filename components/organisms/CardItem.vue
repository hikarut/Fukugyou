<template>
  <v-layout justify-center>
    <v-flex class="main">
      <div v-if="items === null">
        <v-progress-linear :indeterminate="true"/>
      </div>
      <div v-else>
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
                      <ad-sense-infeed-big class="ad" />
                    </template>
                    <nuxt-link :to="`/${card.type}/${card.id}/`">
                      <v-card class="card">
                        <card-Img :src="card.img" :alt="card.title" :is-big="true"/>
                        <card-date :text="changeDateString(card.date)" class="date"/>
                        <card-title :text="card.title" :is-new="card.isNew" class="card-title"/>
                        <div class="out-clip">
                          <out-clip :text="card.service" class="out-clip-cnt"/>
                          <div v-if="card.cnt" class="cnt">他{{ card.cnt }}件</div>
                        </div>
                      </v-card>
                    </nuxt-link>
                  </v-flex>
                </template>

                <template v-else>
                  <v-flex :key="index" class="xs6 card-box">
                    <nuxt-link :to="`/${card.type}/${card.id}/`">
                      <v-card class="card">
                        <card-Img v-if="card.img !==''" :src="card.img" :alt="card.title"/>
                        <card-Img v-else :src="defaultImage" :alt="card.title"/>
                        <card-date :text="changeDateString(card.date)" class="date"/>
                        <card-title :text="cut(card.title)" :is-new="card.isNew" class="card-title"/>
                        <out-clip :text="card.service"/>
                        <div v-if="card.cnt" class="sm-cnt">他{{ card.cnt }}件</div>
                      </v-card>
                    </nuxt-link>
                  </v-flex>
                </template>

              </template>

            </v-layout>
          </v-container>
        </v-card>
      </div>
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
import AdSenseInfeedBig from '~/components/atoms/AdSenseInfeedBig.vue'
import { cutString } from '~/lib/string'
import { dateString, addSlash } from '~/lib/date'
import method from '~/mixins/method'

export default {
  components: {
    CardDate,
    CardTitle,
    CardImg,
    Subheader,
    UpdatedAtText,
    OutClip,
    AdSenseInfeedBig
  },
  mixins: [method],
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
  data: () => ({
    defaultImage: process.env.constant.newsImage
  }),
  methods: {
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
      // いったん広告は外す(2021/01/22)
      return false

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
    },
    cut(title) {
      return cutString(title)
    },
    changeDateString(date) {
      return dateString(addSlash(date))
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
.date {
  color: rgba(0, 0, 0, 0.54);
  background-color: whitesmoke;
  margin-left: 8px;
  margin-right: 8px;
  text-align: left;
}
.card-title {
  margin-left: 8px;
  margin-right: 8px;
  text-align: left;
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
.ad {
  height: 250px;
  margin-bottom: 25px;
}
.v-card > *:last-child:not(.v-btn):not(.v-chip) {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.cnt {
  border: solid 1px gray;
  width: 90px;
  margin-top: -20px;
  float: right;
  margin-right: 10px;
  color: gray;
}
.sm-cnt {
  border: solid 1px gray;
  width: 55px;
  margin-top: 10px;
  margin-top: -20px;
  float: right;
  margin-right: 10px;
  color: gray;
}
</style>
