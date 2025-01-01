<script setup lang="ts">
    import { ElMessage, ElButton, ElTag } from 'element-plus';
    // 显示作为 url 引入
    import url from './assets/wave.worklet.js?url';
    //静态资源显式声明内联引入为base64
    import base64 from './assets/猫.jpg?inline';
    //静态资源显示声明不内联引入base64,而是引入路径
    import nobase64 from './assets/猫.jpg?no-inline';
    //将资源作为文本引入
    import text from './assets/hello.md?raw';
    //导入脚本作为 Worker
    import Worker from './assets/counter.worker.js?worker';
    const worker = new Worker();
    worker.onmessage = (e) => {
        ElMessage.success('从 Worker 收到消息:' + e.data.count);
    };
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
        <el-button type="primary" @click="ElMessage.success(nobase64)">nobase64</el-button>
        <el-button type="primary" @click="ElMessage.success(text)">文本</el-button>
    </fieldset>
</template>
<style>
    body {
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
</style>