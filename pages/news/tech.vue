<template>
  <div/>
</template>

<script>
export default {
  fetch({ redirect }) {
    redirect(301, '/posts/page/1/')
  }
}
</script>
