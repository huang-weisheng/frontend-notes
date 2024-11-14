<script setup lang="ts">
    import { ref } from 'vue';
    import ExampleChild from './SonModel.vue';
    import { ElButton, ElTag } from 'element-plus';
    let color = ref('color');
    let count = ref('count');
    let text = ref('text');

    function update() {
        color.value = `color${Math.ceil(Math.random() * 100)}`;
        count.value = `count${Math.ceil(Math.random() * 100)}`;
        text.value = `text${Math.ceil(Math.random() * 100)}`;
    }
</script>

<template>
    <fieldset>
        <el-tag type="danger">
            <h3>VModel</h3>
        </el-tag>
        <el-button type="primary" @click="update">父组件更新</el-button>
        <input v-model="color" placeholder="color">
        <input v-model="count" placeholder="count">
        <input v-model="text" placeholder="text">
        <!-- text(指令参数):据此接收绑定,capitalize(修饰符):传递给组件;str(指令值):绑定的数据 -->
        <example-child v-model="color" v-model:count="count" v-model:text.capitalize="text"></example-child>
    </fieldset>

</template>

<style scoped>
    input {
        width: 100px;
    }
</style>
