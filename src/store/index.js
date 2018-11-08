import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'


Vue.use(Vuex);


const state = {
	loading:true,			//新闻列表切换时loading图片的展示
	ifReturnMsg: '',		//是否有数据返回
}


export default new Vuex.Store({
	state,
	getters,
})