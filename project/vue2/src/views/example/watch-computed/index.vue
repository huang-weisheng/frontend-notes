<template>
    <fieldset>
        <legend>watch-computed</legend>
        <el-input v-model.number="num" style="width: 50px" type="text"></el-input>
        <el-button @click="numAdd">+</el-button>
        <el-input v-model.number="person.age" style="width: 50px"></el-input>
        <el-button @click="personAgeAdd">+</el-button>
        <el-button @click="watchMsg">点击监听</el-button>
        <el-input v-model="reverseMsg" style="width: 100px"></el-input>
    </fieldset>
</template>

<script>
    //watch:用于监听响应式数据的变化,只要数据发生了变化,就会触发回调函数
    //computed和watch的区别是什么?
    //1.计算属中一个函数可以有多个依赖值,并且计算属性结果是会缓存的
    //2.watch需要一个一个进行侦听,在编写逻辑的时候,会导致不停的编写一些重新的逻辑,造成代码冗余

    export default {
        data() {
            return {
                num: 0,
                person: {
                    age: 0,
                },
                codeShow: true,
                editor: null,
            };
        },
        computed: {
            reverseMsg() {
                return `${this.num}+${this.person.age}`;
            },
        },
        methods: {
            personAgeAdd() {
                this.person.age++;
            },
            numAdd() {
                this.num++;
            },
            watchMsg() { //通过api的方式来侦听属性的变化
                this.$watch('reverseMsg', (newVal, oldVal) => { //vm.$watch( 侦听的属性或者函数, 回调函数, {deep?,immediate?} )
                    this.$message.success({ message: `newVal= ${newVal} , oldVal = ${oldVal}`, duration: 1000 });
                }, { deep: true, immediate: false });
                alert('开始监听reverseMsg');
            },

        },
        watch: {
            // person ( newVal , oldVal ) {
            //   console.log ( "person===" + newVal )
            // } ,
            //开启深度监听 传入属性deep:true 数组也是复杂数据类型,但是不需要使用深度监听的方式

            // person : {
            //   handler ( newVal ) {//处理函数名字不能写成别的
            //     //开启深度监听对象,由于是复杂数据类型,newVal和oldVal指向的其实是同一个地址,同一块堆里面的数据,所以不需要old了,因为结果都一样
            //     console.log ( "person===" , newVal )
            //   } ,
            //   deep : true ,//开启深度监听
            //   // immediate : true //加入这个属性,会立即调用当前的函数
            // }

            //深深深深深度监听的方式(常用)
            // "person.age" ( newVal , oldVal ) {
            //   console.log ( "person===" + newVal + oldVal )
            // }
        },
        mounted() {

        },
    };
</script>
<style scoped>
   
</style>
