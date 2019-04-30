<template>
  <div>
    <v-layout justify-center>
      <v-flex>

        <v-card>
          <v-container
            fluid
            grid-list-md
          >
            <v-layout row wrap>
              <v-flex
                v-for="card in cards"
                :key="card.title"
                :class="[isMobile ? 'xs6' : 'xs3']"
              >
                <a :href="`${card.link}`">
                  <v-card>
                    <v-img :src="card.src" height="200px">
                      <v-container
                        fill-height
                        fluid
                        pa-2
                      >
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <span class="black--text" v-text="card.title"/>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>

                    <v-card-actions>
                      <span class="black--text" v-text="card.date"/>
                      <v-spacer/>
                      <v-chip color="indigo" text-color="white" class="outclip">
                        外部<br>サイト
                      </v-chip>
                    </v-card-actions>
                  </v-card>
                </a>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>



    <v-layout row>
      <v-flex>
        <v-card>

          <v-list three-line class="list-items">
            <template v-for="(item, index) in items">
              <v-subheader
                v-if="item.header"
                :key="item.header"
                class="subheader"
              >
                {{ item.header }}
              </v-subheader>

              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              />

              <v-list-tile
                v-else
                :key="item.subtitle"
                avatar
                @click="go(item.link)"
              >
                <div class="tile-parent">
                  <div class="tile">
                    <img :src="item.avatar">
                  </div>
                </div>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"/>
                  <v-list-tile-sub-title v-html="item.subtitle"/>
                </v-list-tile-content>

                <v-chip color="indigo" text-color="white" class="outclip">
                  外部<br>サイト
                </v-chip>

              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex>
        <v-card>

          <v-list three-line class="list-items">
            <template v-for="(item, index) in techItems">
              <v-subheader
                v-if="item.header"
                :key="item.header"
                class="subheader"
              >
                {{ item.header }}
              </v-subheader>

              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              />

              <v-list-tile
                v-else
                :key="item.subtitle"
                avatar
                @click="go(item.link)"
              >
                <div class="tile-parent">
                  <div class="tile">
                    <img :src="item.avatar">
                  </div>
                </div>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"/>
                  <v-list-tile-sub-title v-html="item.subtitle"/>
                </v-list-tile-content>

                <v-chip color="indigo" text-color="white" class="outclip">
                  外部<br>サイト
                </v-chip>

              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>



  </div>
</template>

<script>
import device from '~/mixins/device'

export default {
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
    ],
    items: [
      { header: '複業ニュース' },
      {
        avatar:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11159697/rectangle_large_type_2_8646061e83883fc66e9aba4745e8e09f.png',
        title: '2019/04/20',
        subtitle: '自分の仕事に対する値段はどうつければいい？ #複業の教科書',
        link: 'https://comemo.nikkei.com/n/n510fa99d48f9'
      },
      { divider: true, inset: true },
      {
        avatar:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/9333965/profile_bc3dc9b97f3569bd26dd537a3f9f68e8.jpeg',
        title: '2019/04/28',
        subtitle: '夢追い人こそ効率のいい副業を',
        link: 'https://note.mu/okuyamatsundi/n/n9eb0de1c6c11'
      },
      { divider: true, inset: true },
      {
        avatar:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/10847061/profile_6d2a40723adc1ecf6b5ce45be1d2fb94.jpeg',
        title: '2019/04/28',
        subtitle:
          'クライミングをしながらブログで月数万の副業を達成した稼ぎ方と去年の収入を大公開！！',
        link: 'https://note.mu/allez/n/nb782fac11968'
      },
      { divider: true, inset: true },
      {
        avatar:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/10750222/rectangle_large_type_2_f1e32382e95912ee8eeb953a07c029a9.png',
        title: '2019/04/27',
        subtitle:
          '副業からはじめる「コーチングビジネス入門」オンラインプロブラム',
        link: 'https://note.mu/yuhito1010/n/n3e8621244812'
      },
      { divider: true, inset: true },
      {
        avatar:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11213899/rectangle_large_type_2_17df249fec770eb129e6645b1669e23f.jpeg',
        title: '2019/04/22',
        subtitle: '2019.04.22 副業は本業になる',
        link: 'https://note.mu/yu_ki_camera/n/n4829aad5fd82'
      },
      { divider: true, inset: true },
      {
        avatar:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11239808/rectangle_large_type_2_b6c211dc4f3553b63c7029c382887db1.jpg',
        title: '2019/04/23',
        subtitle: '【#副業は「やるかやらないか」だけの差】',
        link: 'https://note.mu/aito2214/n/nb4b258474e3c'
      },
      { divider: true, inset: true },
      {
        avatar:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11228379/rectangle_large_type_2_836b896b44381d17ddce3d9ac4631041.jpeg',
        title: '2019/04/23',
        subtitle: '海外ビジネスから副業まで、土台になるのは「個性」',
        link: 'https://comemo.nikkei.com/n/n5636cdc6011b'
      }
    ],
    techItems: [
      { header: 'エンジニア向けピックアップニュース' },
      {
        avatar:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11159697/rectangle_large_type_2_8646061e83883fc66e9aba4745e8e09f.png',
        title: '2019/04/20',
        subtitle: '自分の仕事に対する値段はどうつければいい？ #複業の教科書',
        link: 'https://comemo.nikkei.com/n/n510fa99d48f9'
      },
      { divider: true, inset: true },
      {
        avatar:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/9333965/profile_bc3dc9b97f3569bd26dd537a3f9f68e8.jpeg',
        title: '2019/04/28',
        subtitle: '夢追い人こそ効率のいい副業を',
        link: 'https://note.mu/okuyamatsundi/n/n9eb0de1c6c11'
      },
      { divider: true, inset: true },
      {
        avatar:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11213899/rectangle_large_type_2_17df249fec770eb129e6645b1669e23f.jpeg',
        title: '2019/04/22',
        subtitle: '2019.04.22 副業は本業になる',
        link: 'https://note.mu/yu_ki_camera/n/n4829aad5fd82'
      },
      { divider: true, inset: true },
      {
        avatar:
          'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11228379/rectangle_large_type_2_836b896b44381d17ddce3d9ac4631041.jpeg',
        title: '2019/04/23',
        subtitle: '海外ビジネスから副業まで、土台になるのは「個性」',
        link: 'https://comemo.nikkei.com/n/n5636cdc6011b'
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

<style scoped>
.outclip {
  font-size: 10px;
  width: 50px;
}
a {
  text-decoration: none;
}
.v-list__tile__content {
  /* width: 50px; */
}
.tile-parent {
  display: flex;
  justify-content: flex-start;
  min-width: 56px;
}
.tile {
  width: 50px;
  height: 50px;
}
.tile img {
  /* border-radius: 50%; */
  display: inline-flex;
  height: inherit;
  width: inherit;
}
.subheader {
  font-size: 20px;
}
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .list-items {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
