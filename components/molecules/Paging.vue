<template>
  <v-layout align-center row justify-space-around class="paging">
    <nuxt-link :to="(beforeLink === '') ? '' : `${sitePathNews}${beforeLink}/`">
      <v-btn :disabled="(beforeLink === '') ? true : false" outline class="button-line">
        {{ beforeText }}<br>の{{ newsText }}
      </v-btn>
    </nuxt-link>
    <nuxt-link :to="(nextLink === '') ? '' : `${sitePathNews}${nextLink}/`">
      <v-btn :disabled="(nextLink === '') ? true : false" outline class="button-line">
        {{ nextText }}<br>の{{ newsText }}
      </v-btn>
    </nuxt-link>
  </v-layout>
</template>

<script>
import {
  getNextDate,
  getBeforeDate,
  getDateLink,
  addDateString
} from '~/lib/date'

export default {
  components: {},
  props: {
    date: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    sitePathNews: process.env.constant.sitePathNews
  }),
  computed: {
    nextDate() {
      return getNextDate(this.date)
    },
    nextLink() {
      return getDateLink(this.nextDate)
    },
    nextText() {
      return addDateString(this.nextDate)
    },
    beforeDate() {
      return getBeforeDate(this.date)
    },
    beforeLink() {
      return getDateLink(this.beforeDate)
    },
    beforeText() {
      return addDateString(this.beforeDate)
    },
    newsText() {
      return process.env.constant.newsList
    }
  }
}
</script>

<style lang="scss" scoped>
.button-line {
  color: $mainColor;
}
.paging {
  padding-top: 30px;
  padding-bottom: 15px;
}
.v-btn {
  width: 150px;
  height: 60px;
}
</style>
