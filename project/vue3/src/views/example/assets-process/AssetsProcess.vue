<script setup lang="ts">
import { ElMessage,ElButton,ElTag } from 'element-plus'
//引入静态资源目录public中的资源,引入一个静态资源会返回解析后的公共路径
import url from '/example/1.jpg'
//显示内联引入为base64,no-inline 表示不内联
import base64 from './assets/猫.jpg?inline'
//将资源作为文本引入
import text from './assets/hello.md?raw'
//导入脚本作为 Worker
import Worker from './assets/counter.worker.js?worker'
const worker = new Worker()
worker.onmessage = (e) => {
    ElMessage.success('从 Worker 收到消息:' + e.data.count)
}
// 显示作为url导入 Paint Worklet
import workletUrl from './assets/wave.worklet.js?url'
declare global {
  interface CSS {
    paintWorklet: {
      addModule(moduleURL: string): Promise<void>;
    }
  }
}
// 注册 Paint Worklet
(CSS as any).paintWorklet.addModule(workletUrl)   
</script>
<template>
    <fieldset style="display: flex;align-items: center;">
        <el-tag type="danger">
            <h3>资源引入</h3>
        </el-tag>
        <el-button @click="worker.postMessage('start')" type="primary">
            开始计数
        </el-button>
        <el-button @click="worker.postMessage('stop')" type="primary">
            停止计数
        </el-button>
        <el-button type="primary" @click="ElMessage.success(url)">url</el-button>
        <el-button type="primary" @click="ElMessage.success(base64)">base64</el-button>
        <el-button type="primary" @click="ElMessage.success(text)">文本</el-button>
        <div class="wave-demo">Houdini Paint Worklet</div>
    </fieldset>
</template> 
<style>

    body {
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .wave-demo {
        padding: 5px;
        background-image: paint(wave-pattern);
        --wave-color:red;
        --wave-amplitude: 10;
        --wave-frequency: 10;
        border: 1px solid #f60000;
        border-radius: 4px;
    }
</style>