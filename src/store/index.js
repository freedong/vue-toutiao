import Vue from 'vue'
import Vuex from 'vuex'

import state from './state.js'      //状态信息文件
import getters from './getters.js'  //Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
import mutations from './mutations.js'  //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
import actions from './actions.js'      //Action 提交的是 mutation，而不是直接变更状态

Vue.use(Vuex);




const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});


export default store;
