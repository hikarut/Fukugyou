<template>
  <div class="text-xs-center">
    <div class="count">
      {{ start }}件 〜 {{ end }}件 / {{ total }}件
    </div>
    <div class="paging">
      <nuxt-link :to="`/posts/page/${page - 1}/`" :class="[page - 1 < 1 ? 'disabled' : '']">
        <fa :icon="faAngleLeft" :class="[page - 1 < 1 ? 'angle_disabled' : 'angle_normal']" class="angle" />
      </nuxt-link>
      <template v-for="n of length">
        <nuxt-link
          :key="n"
          :class="[page === n + add ? 'checked' : 'other']"
          :to="`/posts/page/${n + add}/`"
          class="number" >
          {{ n + add }}
        </nuxt-link>
      </template>
      <nuxt-link :to="`/posts/page/${page + 1}/`" :class="[page + 1 > totalPage ? 'disabled' : '']">
        <fa :icon="faAngleRight" :class="[page + 1 > totalPage ? 'angle_disabled' : 'angle_normal']" class="angle" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

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
    length: 3,
    postsPerPage: process.env.constant.postsPerPage
  }),
  computed: {
    faAngleLeft() {
      return faAngleLeft
    },
    faAngleRight() {
      return faAngleRight
    },
    totalPage() {
      return Math.ceil(this.total / process.env.constant.postsPerPage)
    },
    add() {
      if (this.page <= 2) {
        return 0
      } else if (this.page === this.totalPage) {
        return this.page - this.length
      } else {
        return this.page - this.length + 1
      }
    },
    start() {
      return this.page === 1
        ? this.page
        : (this.page - 1) * process.env.constant.postsPerPage + 1
    },
    end() {
      return this.page * process.env.constant.postsPerPage >= this.total
        ? this.total
        : this.page * process.env.constant.postsPerPage
    }
  }
}
</script>

<style lang="scss" scoped>
.paging {
  height: 40px;
  line-height: 40px;
  margin-bottom: 30px;
  margin-right: 20px;
}
.count {
  margin-bottom: 15px;
}
.angle {
  display: inline-flex;
  height: 15px;
  margin-left: 20px;
}
.angle_normal {
  color: $mainColor;
}
.angle_disabled {
  color: $whiteGray;
}
.number {
  font-size: 15px;
  height: 40px;
  width: 40px;
  margin-left: 30px;
  display: inline-flex;
  justify-content: center;
  border-radius: 50%;
}
.checked {
  background-color: $whiteGray;
  color: $white;
  pointer-events: none;
}
.disabled {
  pointer-events: none;
}
.other {
  color: black;
}
</style>
