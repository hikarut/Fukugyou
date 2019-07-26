<template>
  <v-layout justify-center>
    <v-flex class="main">
      <subheader v-if="items.header" :text="items.header" />
      <updated-at-text v-if="items.updatedAt" :text="items.updatedAt" />
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-for="card in items.data"
              :key="card.title"
              class="xs6 card-box"
            >
              <!-- <a :href="`${card.link}`" target="blank"> -->
              <a @click="go(card.link)">
                <v-card class="card">
                  <card-Img :src="card.img" :alt="card.title"/>
                  <card-date :text="card.date" class="date"/>
                  <card-title :text="card.title" :is-new="card.isNew"/>
                </v-card>
              </a>
            </v-flex>
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

export default {
  components: {
    CardDate,
    CardTitle,
    CardImg,
    Subheader,
    UpdatedAtText
  },
  props: {
    items: {
      type: Object,
      default: null
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
  padding-bottom: 30px;
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
}
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .main {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
