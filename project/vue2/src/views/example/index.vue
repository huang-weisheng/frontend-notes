<template>
    <div>
        <vue-x></vue-x>
        <watch-computed></watch-computed>
    </div>
</template>
<script>
import VueX from './vue-x/index.vue'
import WatchComputed from './watch-computed/index.vue'
export default{
    components:{
        VueX,
        WatchComputed
    }
}
</script>