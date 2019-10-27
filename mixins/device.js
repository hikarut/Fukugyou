export default {
  data: () => ({
    // 画面の横幅でデバイス判定する
    // TODO:universalモードでは使えないので対応する
    isMobile: process.client && window.innerWidth < 400,
    isDesktop: process.client && window.innerWidth >= 400
  })
}
