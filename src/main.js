import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//使用懒加载的插件
// Vue.use(VueLazyLoad)
Vue.use(VueLazyLoad, {
  loading: require('assets/images/common/placeholder.png')//占位
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
