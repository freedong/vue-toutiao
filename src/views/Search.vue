<template lang="html">
  <div id="search">
    <!-- 头部栏 -->
    <header-bar>
      <div class="search_header" slot="search">
        <Icon type="ios-arrow-back" size="28" color="#fff" class="fl back" @click.native="goBack">
        </Icon>
        搜索
      </div>
    </header-bar>
    <div class="searchBar">
      <!-- 搜索功能 -->
      <el-input v-model="input" placeholder="请输入内容" @keyup.native.enter="search(input)" class="searchInput fl"></el-input>
      <!-- 点击显示 历史记录弹出框 -->
      <span class="toutiaoIcon" v-popover:popover4 >历史记录</span>
      <!-- 历史记录弹出框 -->
      <el-popover ref="popover4" placement="bottom" trigger="click" id="popover">
        <ul class="searchList" v-show="test.length != 0">
          <li class="searchListItems" v-for="(item,index) in test">
            <span @click="historySearch(item)">
              <Icon type="ios-search" size="18"></Icon>
              {{item}}
            </span>
            <i class="el-icon-delete fr" @click.prevent="clearThisHistory(index)"></i>
          </li>
          <div class="clearHistory" @click="clearHistory">
            清空历史记录
          </div>
        </ul>
        <!-- 暂无历史搜索记录的显示 -->
        <ul class="noHistory" v-show="test.length == 0">
          暂无历史搜索记录
        </ul>
      </el-popover>
    </div>
    <!-- 搜索内容 -->
    <!-- 没数据时的加载动画 -->
    <div v-show="loading" class="loading" element-loading-text="拼命加载中" style="width: 100%" v-loading="loading">
    </div>
    <!-- 数据展示 -->
    <div class="searchNews">
      <router-link v-for="(val,index) in con" v-show="val.media_creator_id&&val.title" :to="{ name: 'newsdetail', params: {
        id:val.tag_id,
            title:val.title,
            media_info:val.media_info,
            media_name:val.media_name,
            datetime:val.datetime,
            abstract:val.abstract,
            image_list:val.image_list,
            repin_count:val.repin_count,
            comment_count:val.comment_count,
            keywords:val.keywords
      } }" :key="index" class="searchNewsItem">
        <p class="title" v-html="replace(val.title,input)"></p>
        <div class="">
          <img alt="加载出错" v-for="(img,index) in val.image_list" :key="index" v-lazy="img.url">
          <div class="bottomInfo clearfix">
            <Icon type="fireball" size="10" color="#d43d3d" v-show="val.hot===1"></Icon>
            <span class="avIcon" v-show="val.label==='广告'">广告</span>
            <span class="writer">{{val.media_name}}</span> &nbsp;&nbsp;
            <span class="comment_count">评论&nbsp;{{val.comment_count}}</span>
            <span class="datetime">{{val.datetime}}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import jsonp from 'jsonp'
import headerBar from '../components/header-bar.vue'
export default {
  data(){
    return{
      test:[],
      con:[],
      input:"",
      loading:false,
      flag:true,
      searchCon:''
    }
  },
  components:{
    headerBar
  },
  // 在路由离开后清空搜索内容和关键词
  beforeRouteLeave(to,from,next){
    if(to.name == 'home'){
      this.con = [];
      this.input = '';
      document.getElementsByClassName('el-popover')[0].style.display = 'none';
      next();
    }
    next();
  },

  methods:{
    goBack(){
      this.$router.go(-1);
    },
    // 历史记录搜索
    historySearch(item){
      this.input = item;
      this.flag = false;
      this.search(item);
      this.con = [];
      // 历史记录弹出框隐藏
      this.$nextTick(function(){
        document.getElementsByClassName('el-popover')[0].style.display = 'none';
      })
    },
    // 清空所有记录
    clearHistory(){
      this.$confirm('确认清空历史记录?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.test = [];
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch((err)=>{
        console.log(err);
      })
    },
    // 清除一条记录
    clearThisHistory(index){
      this.$confirm('确认删除此条历史记录?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.test.splice(index,1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch((err)=>{
        console.log(err);
      })
    },
    // 搜索
    search(input){
      const _this = this;
      // 输入框中的搜索词去除空格
      input = input.trim();
      if(input){
        //如果重复搜索这个关键词  则返回空
        if(this.searchCon == input){
          if(this.flag){
            return ;
          }
        }
        _this.loading = true;
        let searchurl = 'http://www.toutiao.com/search_content/?offset=0&format=json&keyword=' +input+'&autoload=true&count=20&cur_tab=1'
        jsonp(searchurl,function(err,res){
          _this.con = res.data;
          _this.loading = false;
        })
        this.test.unshift(input);
        this.searchCon = input;
        this.flag = true;
      }else{
        this.searchCon = '';
        this.con = [];
      }
    },
    //标题中含有关键词的字样标注为红色
    replace(title,input){
      const reg = new RegExp(''+input+'','gim');
      if(title){
        return title.replace(reg,'<font class="red">'+input+'</font>')
      }else{
        return title;
      }
    },
  }
}
</script>


<style lang="less">
@import '../assets/css/border.less';
.red{
	color: red;
}
#search{
	.search_header{
		font-size: 20px;
		font-weight: bold;
		color: #fff;
		.back{
			line-height: 1.2rem;
	        margin-left: 0.3rem;
		}
	}
	.searchBar{
		margin-top: 1.3rem;
		width: 100%;
		.toutiaoIcon{
			display: inline-block;
			padding: 0 .05rem;
			font-size: 13px;
			text-align: center;
			width: 10%;
		}
		.searchInput{
			width: 90%;
		}
	}
	.loading{
		margin-top: 1rem;
	}
	.searchNews{
		.searchNewsItem {
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
}
.el-popover{
	width: 97%;
	.searchListItems{
		display: block;
		position: relative;
		height: .9rem;
		line-height: .9rem;
		.borderBottom(1px,#ccc);
		font-size: 16px;
		i{
			padding: 0 .2rem;
			line-height: .9rem;
		}
	}
	.clearHistory{
		font-size: 14px;
		height: .7rem;
		line-height: 1rem;
		text-align: center;
	}
	.noHistory{
		font-size: 14px;
	}
}
</style>
