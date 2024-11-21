<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ElButton } from 'element-plus';
const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，您访问的页面不存在</div>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.content {
  text-align: center;
}

h1 {
  font-size: 120px;
  color: #409eff;
  margin: 0;
  text-shadow: 4px 4px 0 #e0e0e0;
  animation: float 3s ease-in-out infinite;
}

.desc {
  font-size: 24px;
  color: #606266;
  margin: 20px 0 30px;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
