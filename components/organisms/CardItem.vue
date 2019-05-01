<template>
  <v-layout justify-center>
    <v-flex>
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              :key="card.title"
              :class="[isMobile ? 'xs6' : 'xs3']"
            >
              <a :href="`${card.link}`">
                <v-card>
                  <card-Img :src="card.src" :title="card.title" />
                  <card-text :text="card.date" />
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
import device from '~/mixins/device'
import CardText from '~/components/molecules/CardText.vue'
import CardImg from '~/components/molecules/CardImg.vue'

export default {
  components: {
    CardText,
    CardImg
  },
  mixins: [device],
  data: () => ({
    cards: [
      {
        title: '複業家は全員、Twitterとnoteを始めよう！ #複業の教科書',
        date: '2019/04/19',
        link: 'https://comemo.nikkei.com/n/nb743b765e2cb',
        src:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11159283/rectangle_large_type_2_c96590fee6020171b12e3bf9e249a3be.png'
      },
      {
        title:
          '複業が忙しくて時間が足りない！生産性アップのコツは？ #複業の教科書',
        date: '2019/04/21',
        link: 'https://comemo.nikkei.com/n/nf908c86b9fcf',
        src:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11185552/rectangle_large_type_2_3385631a2d0e3c6721e2e23a2e908188.png'
      },
      {
        title: '複業を成功させる5か条 #複業の教科書',
        date: '2019/04/16',
        link: 'https://comemo.nikkei.com/n/n4885b2f48480',
        src:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11084749/rectangle_large_type_2_d8384321f34cef1d272ded75e995190c.jpeg'
      },
      {
        title: '確定申告などの手続きはどうすればいいのか？ #複業の教科書',
        date: '2019/04/22',
        link: 'https://comemo.nikkei.com/n/n666503646bc8',
        src:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11185694/rectangle_large_type_2_be50e9fd93a7da9da2ace171d8e05346.png'
      }
    ]
  }),
  methods: {
    go(url) {
      location.href = url
    }
  }
}
</script>
