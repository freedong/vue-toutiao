import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue'								//首页
import Newsdetail from '../views/newsDetail.vue'		//新闻详情页
import My from '../views/My.vue'										//我的页面
import Setup from '../views/Setup.vue'							//设置页面
import Collect from '../views/Collect.vue'					//收藏页面
import Care from '../views/Care.vue'								//关注页面
import Editprofile from '../views/Editprofile.vue'	//编辑资料页面
import Selfpage from '../views/Selfpage.vue'				//个人简介页面
import Search from '../views/Search.vue'						//搜索页面


Vue.use(Router);

const routes = [
	{
        path: '*',
        redirect: '/home/all?type=__all__'
    },
    {
        path: '',
        redirect: '/home/all?type=__all__'
    },
    {
				path:'/home/:type',
				name:'home',
				component:Home
		},
		{
				path:'/newsdetail/:id',
				name:'newsdetail',
				component:Newsdetail
		},
		{
				path:'/my',
				name:'my',
				component:My
		},
		{
				path:'/setup',
				name:'setup',
				component:Setup
		},
		{
				path:'/collect/:kind',
				name:'collect',
				component:Collect
		},
		{
				path:'/care',
				name:'care',
				component:Care
		},
		{
				path:'/editprofile',
				name:'editprofile',
				component:Editprofile
		},
		{
				path:'/selfpage',
				name:'selfpage',
				component:Selfpage
		},
		{
				path:'/search',
				name:'search',
				component:Search
		},
];

const scrollBehavior = (to,from,savedPosition) => {
	if(savedPosition){
		return savedPosition
	}else{
		return {x:0,y:0}
	}
}

const router = new Router({
	mode:'history',
	routes,
	scrollBehavior
})


export default router
