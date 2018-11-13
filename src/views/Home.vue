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
				<router-link v-for="(val,index) in listCon" :to="{ name:'newsdetail',params:
						{   id:val.tag_id,
								title:val.title,
								media_info:val.media_info,
								media_name:val.media_name,
								datetime:val.datetime,
								abstract:val.abstract,
								image_list:val.image_list,
								repin_count:val.repin_count,
								comment_count:val.comment_count,
								keywords:val.keywords
						}}" :key="index" class="newsDetaile">
					<p class="title">{{val.title}}</p>
					<div class="">
						<img alt="加载出错" v-for="(img,index) in val.image_list" :key="index" v-lazy="img.url">
						<div class="bottomInfo clearfix">
							<Icon type="ios-thumbs-up" size="10" color="#d43d3d" v-show="val.hot===1"></Icon>
							<span class="avIcon" v-show="val.label==='广告'">广告</span>
							<span class="writer">{{val.media_name}}</span>&nbsp;&nbsp;
							<span class="comment_count">评论&nbsp;{{val.comment_count}}</span>
							<span class="datetime">{{val.datetime|date}}</span>
						</div>
					</div>
				</router-link>
			</ul>
		</transition>
		<!-- 点击加载更多 -->
		<div class="pulldownload" v-show="downLoadMore" @click="pulldownloadmore({kind:first || $router.query.type,flag:downLoadMore})">
			点击加载更多
		</div>
		<!-- 返回顶部 -->
		<transition name="bounce" enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
			<to-top class="animated bounce" v-show="top">
				<!-- <div class="top">
					<Icon type="android-arrow-up"></Icon>
				</div> -->
			</to-top>
		</transition>

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
	import toTop from '../components/To-top.vue'
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
				'downLoadMore',
				'routerChange'
			]),
			listCon:function(){
				if(this.$route.query.type){
					return this.list[this.$route.query.type]
				}else {
					return this.list[this.first]
				}
			}
		},
		// beforeRouteUpdate(2.2 新增)  在当前路由改变，但是该组件被复用时调用
		beforeRouteUpdate(to,from,next){
			this.$store.commit(type.PULLDOWNBTN,false);
			next();
		},
		methods:{
			...mapActions([
				'getNews',
				'pulldownloadmore'
			]),
			handleScroll(){
				this.top = window.document.documentElement.scrollTop > 10;
				// this.top = window.document.body.scrollTop > 400;
				console.log("scroll");
				console.log(this.top);
				// console.log(window.document.body.scrollTop);
				console.log(window.document.documentElement.scrollTop);
			},
		},
		watch:{
			'$route':function(){
				this.getNews({
					kind:this.$route.query.type,
					flag:this.routerChange
				});
				if(this.routerChange){
					this.$store.commit(type.CHANGE_LOADING_STATE,true)
				}else{
					this.$store.commit(type.CHANGE_LOADING_STATE,false)
				}
				this.first = window.location.search.substring(6);
				this.$store.commit(type.ROUTERCHANGE,true);
				// this.$store.commit(type.COLLECTED,false);
			},
		},
		mounted () {
			this.getNews({
				kind:this.first,
				flag:this.routerChange
			});
			console.log("mounted Home");
			window.addEventListener('scroll',this.handleScroll);
		},
		components:{
			headerBar,
			bottomNav,
			toTop
		},

		filters:{
			date:function(input){
				if(!input){
					return ''
				}
				var time = moment(input).startOf('minute').fromNow();
				return time;
			}
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
				top:false,

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

.pulldownload {
    margin-bottom: 1.3rem;
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    color: #000;
    font-size: 18px;
    text-align: center;
}

</style>
