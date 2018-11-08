<template lang="html">
	<ul class="nav">
		<router-link to="/home/" class="navItems">
			<div class="bottom_nav_icon icon_1"></div>
			<div class="bottom_nav_text">首页</div>
		</router-link>
		<router-link to="/collect/my" class="navItems">
			<div class="bottom_nav_icon icon_2"></div>
			<div class="bottom_nav_text">收藏</div>
		</router-link>
		<router-link to="/care" class="navItems">
			<div class="bottom_nav_icon icon_3"></div>
			<div class="bottom_nav_text">关注</div>
		</router-link>
		<router-link to="/my" class="navItems">
			<div class="bottom_nav_icon icon_4"></div>
			<div class="bottom_nav_text">我的</div>
		</router-link>
	</ul>
</template>
<script>
	export default {}
</script>


<style lang="less">
@import '../assets/css/border.less';
.nav {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    font-size: 10px;
    overflow: hidden;
    z-index: 1000;
    opacity: 1;
    background: #fff;
    box-shadow: 0 0 5px #ccc;
    height: 1.2rem;
    .navItems {
        display: block;
        float: left;
        width: 25%;
        height: 100%;
        color: #999;
        padding-top: 5px;
        .bottom_nav_icon{
          height: 57%;
          margin: 0 auto;
        }
        .icon_1{
          background: url(../assets/imgs/bottom_nav/home_dark_icon.png) no-repeat center center;
          background-size: contain;
        }
        .icon_2{
          background: url(../assets/imgs/bottom_nav/collect_dark_icon.png) no-repeat center center;
          background-size: contain;
        }
        .icon_3{
          background: url(../assets/imgs/bottom_nav/heart_dark_icon.png) no-repeat center center;
          background-size: contain;
        }
        .icon_4{
          background: url(../assets/imgs/bottom_nav/head_dark_icon.png) no-repeat center center;
          background-size: contain;
        }
        .bottom_nav_text{
          height: 43%;
        }
    }
    .router-link-active {
        color: #d43d3d;
        .icon_1{
          background: url(../assets/imgs/bottom_nav/home_icon.png) no-repeat center center;
          background-size: contain;
        }
        .icon_2{
          background: url(../assets/imgs/bottom_nav/collect_icon.png) no-repeat center center;
          background-size: contain;
        }
        .icon_3{
          background: url(../assets/imgs/bottom_nav/heart_icon.png) no-repeat center center;
          background-size: contain;
        }
        .icon_4{
          background: url(../assets/imgs/bottom_nav/head_icon.png) no-repeat center center;
          background-size: contain;
        }
    }
}
</style>
