<script setup lang="ts">
    import { ref } from 'vue';
    import ExampleChild from './SonModel.vue';
    import { ElButton, ElTag } from 'element-plus';
    let numberValue = ref(123);
    let textValue = ref('abc');

    function update() {
        numberValue.value = Math.ceil(Math.random() * 100);
        textValue.value = `text${Math.ceil(Math.random() * 100)}`;
    }
</script>
<template>
    <fieldset>
        <el-tag type="danger">
            <h3>VModel</h3>
        </el-tag>
        <el-button type="primary" @click="update">父组件更新</el-button>
        <input v-model="numberValue" placeholder="color" readonly>
        <input v-model="textValue" placeholder="text" readonly>
        <!-- textArg (指令参数):据此接收绑定,默认为: modelValue -->
        <!-- upperCase(修饰符):传递给组件 -->
        <!-- textValue (指令值):绑定的数据  -->
        <!-- 绑定的事件为 update:<指令参数>  -->
        <example-child v-model:textArg.upperCase="textValue" v-model="numberValue"></example-child>
    </fieldset>

</template>

<style scoped>
    input {
        width: 100px;
    }
</style>
