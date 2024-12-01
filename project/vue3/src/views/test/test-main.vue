<script setup lang="ts">
	import { ref } from 'vue';
	type User = {
		id: number;
		name: string;
		age: number;
	};
	import { IndexDBUtil } from '@/utils/indexDB';
	// 创建实例
	const db = new IndexDBUtil('myDatabase', 1);

	// 初始化数据库和存储库
	await db.init({
		users: 'id',  // storeName: keyPath
		products: 'productId'
	});

	// 添加数据
	await db.add('users', {
		id: 1,
		name: '张三',
		age: 25
	});

	// 查询数据
	const user = await db.get<User>('users', 1);

	// 更新数据
	await db.update('users', {
		id: 1,
		name: '张三',
		age: 26
	});

	// 查询所有数据
	const allUsers = await db.getAll<User>('users');

	// 删除数据
	await db.delete('users', 1);

	// 清空存储库
	await db.clear('users');

	// 使用完毕后关闭连接
	db.close();
</script>
<template>
	<div>
		<h1>测试页面</h1>
	</div>
</template>
