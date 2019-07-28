<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-list three-line>
          <subheader v-if="items.header" :text="items.header" />
          <updated-at-text v-if="items.updatedAt" :text="items.updatedAt" />
          <template v-for="(item, index) in items.data">
            <v-list-tile
              :key="item.subtitle"
              avatar
              @click="go(item.link)"
            >
              <list-img :img="item.img" :alt="item.title"/>
              <list-text :date="item.date" :title="item.title" />
              <!-- <out-clip /> -->
              <newmark :is-new="item.isNew"/>
            </v-list-tile>
            <v-divider v-if="index !== (items.data.length - 1)" :key="index" inset />
            <!-- 2,8番目に広告を挿入 -->
            <template v-if="index === 2 || index === 8">
              <adsbygoogle
                :key="index"
                :ad-slot="'5591791813'"
                :ad-format="'fluid'"
                :ad-layout-key="'-fb+5w+4e-db+86'"
                class="adsbygoogle infeed" />
              <v-divider :key="index" inset />
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
.infeed {
  height: 88px;
}
</style>
