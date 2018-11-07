import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js' //路由
// import store from './store/index.js'  //状态

new Vue({
	el:'#app',
	router,
	render:h => h(App)
})
