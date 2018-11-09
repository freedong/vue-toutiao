<template>
	<div id="home" class="clearfix">
		<!-- 头部组件 -->
		<headerBar>
			<div slot="home" class="home-header-bar">
				<!-- 图标  引用的是iview组件 -->
				<Icon type="ios-mail" size="30" color="#fff" class="fl homeEmail"></Icon>
				<span class="logo">
					今日头条
					<Icon type="ios-refresh" size="30"></Icon>
				</span>
				<!-- 搜索链接 -->
				<router-link to="/search" class="search fr">
					<Icon type="ios-search" size="30" color="#fff" class="homeSearch" />
				</router-link>
			</div>
		</headerBar>


		<!-- 顶部导航栏 -->
		<ul class="homeNav">
			<li v-for = "(item,index) in navbar" :key="index" class="navBarLi">
				<router-link :to="{path:item.url,query:{type:item.type}}">{{ item.text }}</router-link>
			</li>
		</ul>


		<!-- 加载数据动画 引用element-ui组件 -->
		<div v-show="loading" v-loading="loading" element-loading-text="拼命加载中" class="loading" style="width: 100%;"></div>
		<!-- 显示无数据时的文字 引用element-ui中的警告alert组件 -->
		<el-alert v-show="!ifReturnMsg" class="newsLoadError" title="暂无更新..." type="error" description="此频道暂无更新，请先休息一下！" show-icon></el-alert>

		<!-- 内容区 -->
		<!-- transition是vue的内置组件  过度效果 -->
		<transition enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">
			<!-- animated这个类是Animate.css的样式 -->
			<ul class="newsContent animated" v-show="!loading&&ifReturnMsg">
				你好
			</ul>
		</transition>
		<!-- 点击加载更多 -->
		<div></div>
		<!-- 返回顶部 -->
		<div></div>

		<!-- 底部导航栏 -->
		<bottom-nav></bottom-nav>
	</div>
</template>

<script>
	//引用时间插件
	import moment from 'moment'
	//引用组件
	import headerBar from '../components/header-bar.vue'
	import bottomNav from '../components/bottom-nav.vue'
	//引用状态state
	import {
		mapState,		//状态
		mapGetters,	//重新计算状态
		mapActions  //Action 提交的是 mutation，而不是直接变更状态 (方法)
	} from 'vuex'
	//注释：mapState和mapGetters放在组件的计算属性computed中映射,mapActions和mapMotations放在组件中方法methods中映射

	//引用mutatin-type
	import * as type from '../store/mutation-types.js'
	//引用数据请求axios
	import axios from 'axios'
	export default {
		computed:{
			...mapGetters([
				'loading',
				'ifReturnMsg',
				'list',
				'routerChange',
			]),
		},
		methods:{
			...mapActions([
				'getNews',
			])
		},
		mounted () {
			this.getNews({
				kind:this.first,
				flag:this.routerChange
			});
			console.log("mounted Home");
		},
		components:{
			headerBar,
			bottomNav
		},
		data () {
			return {
				navbar: [{
                    text: '推荐',
                    url: '/home/all',
                    type: '__all__'
                },
                {
                    text: '热点',
                    url: '/home/hot',
                    type: 'news_hot'
                },
                {
                    text: '社会',
                    url: '/home/society',
                    type: 'news_society'
                },
                {
                    text: '娱乐',
                    url: '/home/entertainment',
                    type: 'news_entertainment'
                },
                {
                    text: '科技',
                    url: '/home/tech',
                    type: 'news_tech'
                },
                {
                    text: '汽车',
                    url: '/home/car',
                    type: 'news_car'
                },
                {
                    text: '体育',
                    url: '/home/sports',
                    type: 'news_sports'
                },
                {
                    text: '财经',
                    url: '/home/finance',
                    type: 'news_finance'
                },
                {
                    text: '军事',
                    url: '/home/military',
                    type: 'news_military'
                },
                {
                    text: '国际',
                    url: '/home/world',
                    type: 'news_world'
                },
                {
                    text: '时尚',
                    url: '/home/fashion',
                    type: 'news_fashion'
                },
            ],
				first:window.location.search.substring(6),


			}
		},

	}
</script>

<style lang="less" scoped rel="styleheet/less">
	@import "../assets/css/transtion.less";
	@import "../assets/css/border.less";

.home-header-bar {
	& > i {
		margin-top: 0.2rem;
	}
	.logo {
		color: #fff;
		font-size: 18px;
		vertical-align: middle;
		i {
			vertical-align: middle;
		}
	}
	.homeEmail {
		margin-left: 0.22rem;
	}
	.search{
		display: inline-block;
		.homeSearch {
			margin-right: 0.22rem;
			margin-top: 0.2rem;
		}
	}
}


.homeNav {
	width: 100%;
	overflow: hidden;
	overflow-x: auto;
	text-align:center;
	position: fixed;
	left: 0;
	font-size: 0;
	top: 1.2rem;
	background: #f4f5f6;
	font-family: '微软雅黑';
	white-space: nowrap;
    z-index: 999;
    .navBarLi {
    	display: inline-block;
    	height: 1rem;
    	line-height: 1rem;
    	width: 1.4rem;
    	font-size: 16px;
    	a {
    		color: #000;
    	}
    	.router-link-active {
    		color: #d43d3d;
    		font-size: 17px;
    		font-weight:bold;
    	}
    }
}

::-webkit-scrollbar {
    display: none;
}

.loading{
	margin-top:3.4rem;
}

.newsLoadError {
    margin: 2.3rem auto;
    font-size: 25px;
    width: 90%;
}


.newsContent {
    margin-top: 2.3rem;
    width: 100%;
    .newsDetaile {
        width: 94%;
        display: block;
        position: relative;
        margin: 0 auto;
        padding-bottom: 0.15rem;
        .borderBottom(1px,#ccc);
        .title {
            font-size: 16px;
            font-weight: bold;
            color: #000;
            padding-top: 0.2rem;
            padding-bottom: 0.15rem;
        }
        img {
            width: 31.1%;
            margin-right: 0.21rem;
            height: 2.3rem;
        }
        .bottomInfo {
            font-size: 10px;
            margin-top: 0.15rem;
            .writer {
                color: #000;
            }
            .comment_count {
                color: #000;
            }
            .datetime {
                float: right;
                color: #000;
            }
            .avIcon {
                display: inline-block;
                height: 0.4rem;
                width: 0.9rem;
                text-align: center;
                line-height: 0.4rem;
                border-radius: 4px;
                border: 1px solid #39f;
                font-size: 10px;
                margin-right: 0.1rem;
            }
        }
    }
}

</style>
