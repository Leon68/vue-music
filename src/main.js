/* eslint-disable no-new */
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import VueLazyload from 'vue-lazyload'

import fastclick from 'fastclick'

import 'common/stylus/index.styl'

Vue.use(VueLazyload, {
  loading: require('common/image/default.png'),
  error: require('common/image/error.jpeg')
})
fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  // template: '<App/>',
  // components: {App}
  // render: h => h(App)
  render(createElement) {
    return createElement(App)
  }
})
