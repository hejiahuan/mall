import Vue from 'vue'
import App from './App.vue'

import router from "./router"

// 用vue实例来做事件总线
Vue.prototype.$bus=new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
