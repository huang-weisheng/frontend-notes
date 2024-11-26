<template>
  <div class="error-component">
    <div class="error-icon">❌</div>
    <h3>{{ error?.message || '组件加载失败' }}</h3>
    <div class="error-details">
      <p>错误详情：{{ error?.stack }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  error: Error | null
}>()

</script>

<style scoped>
.error-component {
  padding: 20px;
  border-radius: 8px;
  background-color: #fff3f3;
  text-align: center;
}

.error-icon {
  font-size: 32px;
  margin-bottom: 16px;
}

.error-details {
  margin: 16px 0;
  padding: 12px;
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  text-align: left;
}

.button-group {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 16px;
}
</style> 