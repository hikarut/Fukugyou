import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/loading.png',
  loading: '/loading.png',
  attempt: 1
})
