<template>
  <div class="text-xs-center">
    <div>
      {{ start }}/{{ total }}件
    </div>
    <div class="paging">
      <template v-for="n of length">
        <nuxt-link :key="n" :class="[page === n + start ? 'number_checked' : 'number']" :to="`/posts/page/${n + start}`" >
          {{ n + start }}
        </nuxt-link>
      </template>
    </div>
  </div>
</template>

<script>
const constant = require('~/config/constant.json')

export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    length: 3
  }),
  computed: {
    totalPage() {
      return Math.ceil(this.total / constant.postsPerPage)
    },
    start() {
      console.log('computed start')
      console.log(`total:${this.total}`)
      console.log(`page:${this.page}`)
      console.log(`totalPage:${this.totalPage}`)

      if (this.page <= 2) {
        return 0
      } else if (this.page === this.totalPage) {
        return this.page - this.length
      } else {
        return this.page - this.length + 1
      }
    }
  }
}
</script>

<style scoped>
.paging {
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}
.number_checked {
  font-size: 15px;
  height: 40px;
  width: 40px;
  background-color: #bbb;
  color: #fff;
  border-radius: 50%;
  margin-left: 30px;
  display: inline-flex;
  justify-content: center;
  pointer-events: none;
}
.number {
  font-size: 15px;
  height: 40px;
  width: 40px;
  color: black;
  border-radius: 50%;
  margin-left: 30px;
  display: inline-flex;
  justify-content: center;
}
</style>
