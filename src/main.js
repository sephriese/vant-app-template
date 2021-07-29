import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './style/index.less'
import settings from '@/settings'

// 开启vconsole
if (process.env.NODE_ENV === 'development' && settings.vconsole) {
  const VConsole = require('vconsole')
  new VConsole()
}

// mock
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
