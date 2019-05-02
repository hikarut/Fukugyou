<template>
  <div class="top">
    <big-img-item :items="listData" />
    <div class="top-button">
      <nuxt-link to="/posts"><v-btn block outline color="#134b8a">もっと見る</v-btn></nuxt-link>
    </div>
    <card-item :items="cards"/>
    <list-item :items="fukugyouNews" />
    <list-item :items="techNews" />
  </div>
</template>

<script>
import { getEntries } from '~/plugins/contentful'
import { dateString } from '~/plugins/date'
import CardItem from '~/components/organisms/CardItem.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import BigImgItem from '~/components/organisms/BigImgItem.vue'

export default {
  components: {
    CardItem,
    ListItem,
    BigImgItem
  },
  // 投稿内容を取得
  asyncData() {
    return getEntries(1)
  },
  data: () => ({
    cards: {
      header: 'トップニュース',
      data: [
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11159283/rectangle_large_type_2_c96590fee6020171b12e3bf9e249a3be.png',
          date: '2019/04/19',
          title: '複業家は全員、Twitterとnoteを始めよう！ #複業の教科書',
          link: 'https://comemo.nikkei.com/n/nb743b765e2cb'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11185552/rectangle_large_type_2_3385631a2d0e3c6721e2e23a2e908188.png',
          date: '2019/04/21',
          title:
            '複業が忙しくて時間が足りない！生産性アップのコツは？ #複業の教科書',
          link: 'https://comemo.nikkei.com/n/nf908c86b9fcf'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11084749/rectangle_large_type_2_d8384321f34cef1d272ded75e995190c.jpeg',
          date: '2019/04/16',
          title: '複業を成功させる5か条 #複業の教科書',
          link: 'https://comemo.nikkei.com/n/n4885b2f48480'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11185694/rectangle_large_type_2_be50e9fd93a7da9da2ace171d8e05346.png',
          date: '2019/04/22',
          title: '確定申告などの手続きはどうすればいいのか？ #複業の教科書',
          link: 'https://comemo.nikkei.com/n/n666503646bc8'
        }
      ]
    },
    fukugyouNews: {
      header: '複業ニュース',
      data: [
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11159697/rectangle_large_type_2_8646061e83883fc66e9aba4745e8e09f.png',
          date: '2019/04/20',
          title: '自分の仕事に対する値段はどうつければいい？ #複業の教科書',
          link: 'https://comemo.nikkei.com/n/n510fa99d48f9'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/9333965/profile_bc3dc9b97f3569bd26dd537a3f9f68e8.jpeg',
          date: '2019/04/28',
          title: '夢追い人こそ効率のいい副業を',
          link: 'https://note.mu/okuyamatsundi/n/n9eb0de1c6c11'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/10847061/profile_6d2a40723adc1ecf6b5ce45be1d2fb94.jpeg',
          date: '2019/04/28',
          title:
            'クライミングをしながらブログで月数万の副業を達成した稼ぎ方と去年の収入を大公開！！',
          link: 'https://note.mu/allez/n/nb782fac11968'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/10750222/rectangle_large_type_2_f1e32382e95912ee8eeb953a07c029a9.png',
          date: '2019/04/27',
          title:
            '副業からはじめる「コーチングビジネス入門」オンラインプロブラム',
          link: 'https://note.mu/yuhito1010/n/n3e8621244812'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11213899/rectangle_large_type_2_17df249fec770eb129e6645b1669e23f.jpeg',
          date: '2019/04/22',
          title: '2019.04.22 副業は本業になる',
          link: 'https://note.mu/yu_ki_camera/n/n4829aad5fd82'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11239808/rectangle_large_type_2_b6c211dc4f3553b63c7029c382887db1.jpg',
          date: '2019/04/23',
          title: '【#副業は「やるかやらないか」だけの差】',
          link: 'https://note.mu/aito2214/n/nb4b258474e3c'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11228379/rectangle_large_type_2_836b896b44381d17ddce3d9ac4631041.jpeg',
          date: '2019/04/23',
          title: '海外ビジネスから副業まで、土台になるのは「個性」',
          link: 'https://comemo.nikkei.com/n/n5636cdc6011b'
        }
      ]
    },
    techNews: {
      header: 'エンジニア向けピックアップニュース',
      data: [
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11159697/rectangle_large_type_2_8646061e83883fc66e9aba4745e8e09f.png',
          date: '2019/04/20',
          title: '自分の仕事に対する値段はどうつければいい？ #複業の教科書',
          link: 'https://comemo.nikkei.com/n/n510fa99d48f9'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/9333965/profile_bc3dc9b97f3569bd26dd537a3f9f68e8.jpeg',
          date: '2019/04/28',
          title: '夢追い人こそ効率のいい副業を',
          link: 'https://note.mu/okuyamatsundi/n/n9eb0de1c6c11'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/10847061/profile_6d2a40723adc1ecf6b5ce45be1d2fb94.jpeg',
          date: '2019/04/28',
          title:
            'クライミングをしながらブログで月数万の副業を達成した稼ぎ方と去年の収入を大公開！！',
          link: 'https://note.mu/allez/n/nb782fac11968'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/10750222/rectangle_large_type_2_f1e32382e95912ee8eeb953a07c029a9.png',
          date: '2019/04/27',
          title:
            '副業からはじめる「コーチングビジネス入門」オンラインプロブラム',
          link: 'https://note.mu/yuhito1010/n/n3e8621244812'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11213899/rectangle_large_type_2_17df249fec770eb129e6645b1669e23f.jpeg',
          date: '2019/04/22',
          title: '2019.04.22 副業は本業になる',
          link: 'https://note.mu/yu_ki_camera/n/n4829aad5fd82'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11239808/rectangle_large_type_2_b6c211dc4f3553b63c7029c382887db1.jpg',
          date: '2019/04/23',
          title: '【#副業は「やるかやらないか」だけの差】',
          link: 'https://note.mu/aito2214/n/nb4b258474e3c'
        },
        {
          img:
            'https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/11228379/rectangle_large_type_2_836b896b44381d17ddce3d9ac4631041.jpeg',
          date: '2019/04/23',
          title: '海外ビジネスから副業まで、土台になるのは「個性」',
          link: 'https://comemo.nikkei.com/n/n5636cdc6011b'
        }
      ]
    }
  })
}
</script>

<style scoped>
.top-button {
  width: 90%;
  margin: 0 auto;
  padding-top: -10px;
}
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .top {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
