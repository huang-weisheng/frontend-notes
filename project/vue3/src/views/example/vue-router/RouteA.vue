<script setup lang="ts">
	import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
	onBeforeRouteLeave((to, from) => {
		console.log('RouteA onBeforeRouteLeave');
	});
	onBeforeRouteUpdate((to, from) => {
		console.log('RouteA onBeforeRouteUpdate');
	});
</script>
<template>
	<div>
		<p
			v-for="item in 15"
			:key="item"
			:id="'route-scroll-' + item"
			class="scrollbar-demo-item">
			A{{ item }}
		</p>
	</div>
</template>
<style scoped>
	.scrollbar-demo-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		margin: 10px;
		text-align: center;
		border-radius: 4px;
		background: #00ff00;
		color: #000;
	}
</style>
