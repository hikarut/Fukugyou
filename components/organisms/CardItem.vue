<template>
  <v-layout justify-center>
    <v-flex>
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-for="card in items.data"
              :key="card.title"
              class="xs6"
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

export default {
  components: {
    CardText,
    CardImg
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
/* 枠線を消す */
.v-card {
  box-shadow: initial;
}
</style>
