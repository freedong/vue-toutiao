import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js' //路由
import store from './store/index.js'  //状态


// 引用css动画库
import animate from 'animate.css'
// 这个不需要Vue.use();


// iView 是一套基于 Vue.js 的开源 UI 组件库，主要服务于 PC 界面的中后台产品。
import iView from 'iview';// 引用iview组件
import 'iview/dist/styles/iview.css'; //引用iview样式


// Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库
// Element UI 是一套采用 Vue 2.0 作为基础框架实现的组件库，它面向企业级的后台应用，能够帮助你快速地搭建网站，极大地减少研发的人力与时间成本。
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


//JavaScript 日期处理类库
import moment from 'moment'

//VUE图片懒加载-vue lazyload插件
import VueLazyload from 'vue-lazyload'

// vue使用VueLazyload 插件  全局
Vue.use(VueLazyload,{
  error: '/src/assets/imgs/imgerror.jpg',
  loading: '/src/assets/imgs/imgloading.gif',
  preLoad: 1,
  attempt: 1
});



// vue使用iview组件  全局注册
Vue.use(iView);
// vue使用element-ui组件  全局注册
Vue.use(ElementUI);
// vue使用moment插件  全局注册
Vue.use(moment);


new Vue({
	el:'#app',
	router,
	store,
	render:h => h(App)
})
