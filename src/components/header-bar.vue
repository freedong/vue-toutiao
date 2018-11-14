<template>
	<header>
		<!-- 命名插槽 -->
		<!-- home页面插槽 -->
		<slot name="home"></slot>
		<!-- 新闻详情页插槽 -->
		<slot name="detail-header"></slot>
		<!-- 设置页面插槽 -->
		<slot name="setup-header"></slot>
		<!-- 收藏页面插槽 -->
		<slot name="collect"></slot>
		<!-- 关注页面插槽 -->
		<slot name="care"></slot>
		<!-- 编辑资料页面插槽 -->
		<slot name="editprofile-header"></slot>
		<!-- 我的主页插槽 -->
		<slot name="selfpage"></slot>
		<!-- 搜索页面 -->
		<slot name="search"></slot>
	</header>
</template>

<script>
	export default {}
</script>

<style lang="less">
	header {
		width: 100%;
		height: 1.2rem;
		line-height: 1.2rem;
		background: #d43d3d;
		text-align:center;
		position: fixed;
		left: 0;
		top: 0;
		z-index:999;
	}
</style>
