import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//element 配置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
//引入公共样式
import './assets/css/global.css'
//请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
// axios.interceptors.request.use(config => {
//     console.log(1111);

//     //为请求头对象，添加token验证的Authorization字段
//     config.headers.Authorization = window.sessionStorage.getItem("token")
//     return config
// })
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)

}).$mount('#app')
Vue.prototype.$http = axios








