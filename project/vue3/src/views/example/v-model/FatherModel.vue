<script setup lang="ts">
    import { ref } from 'vue';
    import ExampleChild from './SonModel.vue';
    import { ElButton, ElTag } from 'element-plus';
    let color = ref('green');
    let text = ref('abc');

    function update() {
        color.value = `color${Math.ceil(Math.random() * 100)}`;
        text.value = `text${Math.ceil(Math.random() * 100)}`;
    }
</script>

<template>
    <fieldset>
        <el-tag type="danger">
            <h3>VModel</h3>
        </el-tag>
        <el-button type="primary" @click="update">父组件更新</el-button>
        <input v-model="color" placeholder="color" readonly>
        <input v-model="text" placeholder="text" readonly>
        <!-- text(指令参数):据此接收绑定,upperCase(修饰符):传递给组件;text(指令值):绑定的数据 -->
        <example-child v-model:textArg.upperCase="text" v-model="color"></example-child>
    </fieldset>

</template>

<style scoped>
    input {
        width: 100px;
    }
</style>
