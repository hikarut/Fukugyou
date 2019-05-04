export default {
  data: () => ({
    // 画面の横幅でデバイス判定する
    // TODO:universalモードでは使えないので対応する
    isMobile: window.innerWidth < 400,
    isDesktop: window.innerWidth >= 400
  })
}
