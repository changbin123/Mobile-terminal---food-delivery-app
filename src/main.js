import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Icon,Rate} from 'vant'
import 'vant/lib/index.css'
Vue.config.productionTip = false

Vue.use(Icon)
Vue.use(Rate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Rate