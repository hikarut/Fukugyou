export default {
  data: () => ({
    // 画面の横幅でデバイス判定する
    isMobile: window.innerWidth < 400,
    isDesktop: window.innerWidth >= 400
  })
}
