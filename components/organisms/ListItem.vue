<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-list three-line>
          <subheader v-if="items.header" :text="items.header" />
          <template v-for="(item, index) in items.data">
            <v-list-tile
              :key="item.subtitle"
              avatar
              @click="go(item.link)"
            >
              <list-img :img="item.img" />
              <list-text :date="item.date" :title="item.title" />
              <!-- <out-clip /> -->
            </v-list-tile>
            <v-divider v-if="index !== (items.data.length - 1)" :key="index" inset />
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import OutClip from '~/components/atoms/OutClip.vue'
import Subheader from '~/components/atoms/Subheader.vue'
import ListImg from '~/components/molecules/ListImg.vue'
import ListText from '~/components/molecules/ListText.vue'

export default {
  components: {
    OutClip,
    Subheader,
    ListImg,
    ListText
  },
  props: {
    items: {
      type: Object,
      default: null
    }
  },
  methods: {
    go(url) {
      if (url.match(/fukugyou\.dev/)) {
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
</style>
