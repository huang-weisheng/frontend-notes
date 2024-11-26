<template>
  <div class="async-component">
    <h2>这是一个异步加载的组件</h2>
    <div class="info">
      <p>组件加载时间: {{ loadTime }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'

const loadTime = ref('')

onMounted(() => {
  loadTime.value = new Date().toLocaleTimeString()
  ElMessage.success('组件加载成功')
})
// 卸载
onBeforeUnmount(() => {
  ElMessage.info('组件卸载成功')
})
</script>

<style scoped>
.async-component {
  padding: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
}
.info {
  font-size: 14px;
  color: #666;
}
</style> 