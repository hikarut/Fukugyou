<template>
  <ul class="v-breadcrumbs theme--light">
    <li v-for="(item, i) in items" :key="i">
      <template v-if="!item.disabled">
        <nuxt-link :to="item.url" class="v-breadcrumbs__item">{{ item.text }}</nuxt-link>
      </template>
      <template v-else>
        {{ item.text }}
      </template>
      <template v-if="i !== (items.length - 1)" class="separate">&nbsp;&nbsp;&gt;&nbsp;&nbsp;</template>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.v-breadcrumbs li {
  list-style: none;
  display: inline;
  font-size: 14px;
}
.separate {
  padding-left: 10px;
}
.v-breadcrumbs {
  text-align: left;
}
</style>
