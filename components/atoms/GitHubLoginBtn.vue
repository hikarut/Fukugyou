<template>
  <v-btn block outline class="button-github">
    <img class="github-icon" alt="github" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg" >
    GitHubでログイン
  </v-btn>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.github-icon {
  width: 20px;
  margin-right: 20px;
}
.button-github {
  background-color: $githubColor !important;
  border-color: $githubColor;
  color: $white;
  text-transform: none;
}
</style>
