<template>
  <v-layout justify-center>
    <v-flex class="main">
      <subheader v-if="items.header" :text="items.header" />
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-for="card in items.data"
              :key="card.title"
              class="xs6 card-box"
            >
              <a :href="`${card.link}`">
                <v-card>
                  <card-Img :src="card.img" :title="card.title" />
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
import Subheader from '~/components/atoms/Subheader.vue'

export default {
  components: {
    CardText,
    CardImg,
    Subheader
  },
  mixins: [device],
  props: {
    items: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.card-box a:hover {
  text-decoration: underline;
  text-decoration-color: rgba(19, 75, 138, 0.7);
}
/* 枠線を消す */
.v-card {
  box-shadow: initial;
}
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .main {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
