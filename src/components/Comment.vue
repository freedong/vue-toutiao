<template lang="html">
  <div id="comment">
    <!-- 输入框 -->
    <el-input class="editComment" placeholder="写评论..." icon="md-create"></el-input>
    <!-- 分享 -->
    <Icon type="md-share-alt" color="#d43d3d" size="30" class="commentInco fr" @click.native="showSharebox"></Icon>
    <!-- 收藏状态的转换 -->
    <Icon type="ios-cloud-outline" @click.native="t" v-show="!collected" size="30" class="commentInco fr"></Icon>
    <Icon type="ios-cloud" @click.native="t" v-show="collected" size="30" color="#d43d3d" class="commentInco fr"></Icon>
    <!-- 评论数量图标 -->
    <Icon type="ios-chatbubbles-outline" size="30" class="commentInco fr showcomment" @click.native="tocomment">
		</Icon>
    <!-- 评论数量 -->
    <span class="commentNum" @click.native="tocomment">{{commentNum}}</span>
  </div>
</template>

<script>
export default {
  props:['comment'],
  data(){
    return {
      commentNum:this.comment>0?this.comment:'0',
    }
  },
}
</script>


<style lang="less">
#comment{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 1.3rem;
	z-index: 100;
	background: #fff;
    .editComment{
    	display: inline-block;
    	width: 54%;
    	margin-left: .2rem;
    	margin-top: .1rem;
    }
    .commentInco{
    	margin-top: .2rem;
    	margin-right: .55rem;
    }
    .showcomment{
    	position: relative;
    }
    .commentNum{
    	position: absolute;
    	padding: .05rem;
    	border-radius: 80%;
    	min-width: .55rem;
    	text-align: center;
    	line-height: .45rem;
    	background: #d43d3d;
    	right: 28%;
    	top: .06rem;
    	color: #fff;
    	font-size: 10px;
    }
}
</style>
