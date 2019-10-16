<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-list three-line>
          <subheader v-if="items.header" :text="items.header" :tag="tag" />
          <updated-at-text v-if="items.updatedAt" :text="items.updatedAt" />
          <template v-for="(item, index) in items.data">
            <v-list-tile
              :key="item.subtitle"
              avatar
              class="list"
              @click="go(item.link)"
            >
              <list-img :img="item.img" :alt="item.title"/>
              <list-text :date="item.date" :title="item.title" />
              <!-- <out-clip /> -->
              <newmark :is-new="item.isNew"/>
            </v-list-tile>
            <!-- エラー対応で暫定でkeyにプラスする -->
            <v-divider v-if="index !== (items.data.length - 1) || (index + 1) === 4" :key="index + 100" />
            <!-- 4つづつに広告を挿入 -->
            <template v-if="(index + 1) % 4 === 0">
              <adsbygoogle
                :key="index"
                :ad-slot="'5591791813'"
                :ad-format="'fluid'"
                :ad-layout-key="'-ff+64+2d-c2+cy'"
                class="adsbygoogle infeed" />
              <!-- エラー対応で暫定でkeyにプラスする -->
              <v-divider v-if="index !== (items.data.length - 1) || (index + 1) !== 4" :key="index + 200" />
            </template>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import OutClip from '~/components/atoms/OutClip.vue'
import Newmark from '~/components/atoms/Newmark.vue'
import Subheader from '~/components/atoms/Subheader.vue'
import ListImg from '~/components/molecules/ListImg.vue'
import ListText from '~/components/molecules/ListText.vue'
import UpdatedAtText from '~/components/atoms/UpdatedAtText.vue'

export default {
  components: {
    OutClip,
    Newmark,
    Subheader,
    ListImg,
    ListText,
    UpdatedAtText
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
    // TODO:CardItemと共通化
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
/* 枠線を消す */
.v-card {
  box-shadow: initial;
}
.list {
  height: 100px;
}
.infeed {
  height: 88px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: sans-serif !important;
}
</style>
