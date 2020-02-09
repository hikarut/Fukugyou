export default {
  methods: {
    go(url) {
      // 同じサイトないでパス指定の場合(httpが入ってない場合)は通常の画面遷移にする
      if (!url.match(/http/)) {
        this.$router.push(url)
      } else if (url.match(/fukugyou\.dev/)) {
        location.href = url
      } else {
        // 別サイトの場合は別ウィンドウにする
        open(url, '_blank')
      }
    }
  }
}
