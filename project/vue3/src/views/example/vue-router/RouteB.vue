<script setup lang="ts">
</script>
<template>
	<div class="scrollbar-container">
		<p v-for="i in 10" :key="i" :id="'route-scroll-' + i">
			A{{ i }}
		</p>
	</div>
</template>
<style>
	.scrollbar-container > p {
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