<template>
  <div>
    <bread-list :items="breadItems"/>
    ニュース詳細
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BreadList from '~/components/organisms/BreadList.vue'

export default {
  components: { BreadList },
  data: () => ({}),
  computed: {
    breadItems() {
      return [
        {
          text: 'ホーム',
          disabled: false,
          url: process.env.constant.sitePathHome
        },
        {
          text: process.env.constant.postList,
          disabled: false,
          url: process.env.constant.sitePathPosts
        },
        {
          // text: this.post.fields.title.trim(),
          text: 'aaa',
          disabled: true,
          url: process.env.constant.sitePathHome
        }
      ]
    },
    ...mapGetters('newsV2', ['newsDetail'])
  },
  async beforeMount() {
    console.log('beforeMount')
    // await this.$store.dispatch('newsV2/getNewsById', this.$route.params.id)
  },
  methods: {
    ...mapActions('newsV2', ['getNewsById'])
  },
  async asyncData({ store, params }) {
    console.log('asyncData')
    // await store.dispatch('newsV2/getNewsById', params.id)
  }
}
</script>

<style scoped>
</style>
