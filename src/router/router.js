import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue'	//首页
import Newsdetail from '../views/newsDetail.vue'	//新闻详情页


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
		}
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
