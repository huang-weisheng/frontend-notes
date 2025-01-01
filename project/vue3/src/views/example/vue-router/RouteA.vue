<script setup lang="ts">
	import {  onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
	onBeforeRouteLeave((to, from) => {
		console.log('RouteA onBeforeRouteLeave');
	});
	onBeforeRouteUpdate((to, from) => {
		console.log('RouteA onBeforeRouteUpdate');
	});
</script>
<template>
	<div class="scrollbar-container">
		<p v-for="i in 10" :key="i" :id="'route-scroll-' + i">
			A{{ i }}
		</p>
	</div>
</template>
<style scoped>
	.scrollbar-container > p  {
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
