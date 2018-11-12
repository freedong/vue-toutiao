<template>
	<header>
		<!-- 命名插槽 -->
		<!-- home页面插槽 -->
		<slot name="home"></slot>
		<!-- 新闻详情页插槽 -->
		<slot name="detail-header"></slot>
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
