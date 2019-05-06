<template>
  <div class="tile-parent">
    <div>
      <v-img :src="img" class="tile" lazy-src="/loading.png">
        <template v-slot:placeholder>
          <v-layout
            fill-height
            align-center
            justify-center
          >
            <v-progress-circular :size="20" :width="2" indeterminate color="grey lighten-5"/>
          </v-layout>
        </template>
      </v-img>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.tile-parent {
  display: flex;
  justify-content: flex-start;
  min-width: 56px;
}
.tile {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.tile img {
  /* border-radius: 50%; */
  display: inline-flex;
  height: inherit;
  width: inherit;
}
</style>
