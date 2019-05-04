<template>
  <v-layout column>
    <subheader v-if="items.header" :text="items.header"/>
    <template v-for="(item, index) in items.data">
      <v-flex :key="item.subtitle" class="main">
        <nuxt-link :to="item.link" >
          <v-card class="card-tile">
            <v-img
              :src="item.img"
              class="big-img"
            />

            <v-card-title primary-title>
              <div>
                <div >{{ item.date }}</div>
                <div class="title">{{ item.title }}</div>
                <div class="tag">{{ item.tag }}</div>
              </div>
            </v-card-title>

          </v-card>
        </nuxt-link>
        <v-divider v-if="index !== (items.data.length - 1)" :key="index" />
      </v-flex>
    </template>
  </v-layout>

</template>

<script>
import Subheader from '~/components/atoms/Subheader.vue'

export default {
  components: {
    Subheader
  },
  props: {
    items: {
      type: Object,
      default: null
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
.big-img {
  width: 100%;
  height: 200px;
  object-position: 50% 50%;
}
.title {
  font-size: 30px;
  /* font-weight: bold; */
}
.title,
.tag {
  padding-top: 10px;
}
</style>
