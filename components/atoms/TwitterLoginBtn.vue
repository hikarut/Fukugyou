<template>
  <v-btn block outline class="button-twitter">
    <img class="twitter-icon" alt="twitter" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg" >
    Twitterでログイン
  </v-btn>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.twitter-icon {
  width: 20px;
  margin-right: 20px;
}
.button-twitter {
  background-color: $twitterColor !important;
  border-color: $twitterColor;
  color: $white;
  text-transform: none;
}
</style>
