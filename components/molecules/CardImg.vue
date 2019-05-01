<template>
  <v-img :src="src" height="200px">
    <v-container fill-height fluid pa-2>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <span class="black--text" v-text="title"/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script>
import OutClip from '~/components/atoms/OutClip.vue'

export default {
  components: {
    OutClip
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
