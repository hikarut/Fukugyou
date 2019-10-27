export default (context, inject) => {
  const isMobile = window.innerWidth < 400
  const isDesktop = window.innerWidth >= 400

  inject('isMobile', isMobile)
  inject('isDesktop', isDesktop)
}
