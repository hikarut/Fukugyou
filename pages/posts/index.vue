<template>
  <div/>
</template>

<script>
export default {
  fetch({ redirect }) {
    redirect(301, process.env.constant.sitePathPosts)
  }
}
</script>
