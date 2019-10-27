export default {
  data: () => ({
    // デフォルト
    isMobile: false,
    isDesktop: false
  }),
  mounted() {
    this.isMobile = this.$isMobile
    this.isDesktop = this.$isDesktop
  }
}
