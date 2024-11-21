<script setup lang="ts">
</script>
<template>
	<div>
		<p
			v-for="item in 15"
			:key="item"
			:id="'route-scroll-' + item"
			class="scrollbar-demo-item">
			B{{ item }}
		</p>
	</div>
</template>
<style>
	.scrollbar-demo-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		margin: 10px;
		text-align: center;
		border-radius: 4px;
		background: #f0f000;
		color: #000;
	}
</style>