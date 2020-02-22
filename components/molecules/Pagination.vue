<template>
  <div class="text-xs-center">
    <div class="count">
      {{ start }}件 〜 {{ end }}件 / {{ total }}件
    </div>
    <div class="paging">
      <nuxt-link :to="`/posts/page/${page - 1}/`" :class="[page - 1 < 1 ? 'disabled' : '']">
        <v-icon :class="[page - 1 < 1 ? 'angle_disabled' : 'angle_normal']" class="angle">
          fas fa-angle-left
        </v-icon>
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
        <v-icon :class="[page + 1 > totalPage ? 'angle_disabled' : 'angle_normal']" class="angle">
          fas fa-angle-right
        </v-icon>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
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
    length: 2,
    postsPerPage: process.env.constant.postsPerPage
  }),
  computed: {
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

<style scoped>
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
  color: #55acee;
}
.angle_disabled {
  color: #bbb;
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
  background-color: #bbb;
  color: #fff;
  pointer-events: none;
}
.disabled {
  pointer-events: none;
}
.other {
  color: black;
}
</style>
