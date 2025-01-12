<template >
	<fieldset>
		<legend>vuex</legend>
		<el-input v-model="mainNumber" disabled style="width: 50px"></el-input>
		<el-input v-model="carNumber" disabled style="width: 50px"></el-input>
		<el-input v-model="mainGetterNumber" disabled style="width: 100px"></el-input>
		<el-button @click="mainNumberAdd"> main++</el-button>
		<el-button @click="carNumberAdd"> car++</el-button>
	</fieldset>
</template >

<script >
	import { mapActions , mapGetters , mapMutations , mapState , } from 'vuex'
	
	export default {
		data () {
			return {
				
			}
		} ,
		computed : {
			... mapState ( [ 'mainNumber' ] ) ,
			... mapState ( 'car/smallCar' , [ 'smallCarNumber' ] ) ,//直接映射状态名到this
			// ... mapState ( 'car/smallCar' , {
			//smallCarNumber : state => state.smallCarNumber
			// } ) ,
			carNumber () {
				return this.$store.state.car.carNumber
			} ,
			... mapGetters ( [ 'mainGetterNumber' , 'car/carGetterNumber' ] ) ,//映射完整路径到this
			... mapGetters ( 'car' , [ 'carGetterNumber' ] ) ,//直接映射状态名到this
			// ... mapGetters ( { carGetterNumber : 'car/carGetterNumber' } ) ,//获取模块中getter
			// carGetterNumber () {
			//return this.$store.getters[ 'car/carGetterNumber' ]
			// } ,
			
		} ,
		methods : {
			// mainNumberAdd () {
			// this.$store.commit ( "ADD" , "payload" )
			// } ,
			// carNumberAdd () {
			// this.$store.commit ( "car/ADD" , 2 )
			// } ,
			... mapMutations ( [ 'ADD' , 'car/ADD' ] ) ,//把vuex方法映射到this
			mainNumberAdd () {
				return this.ADD ()
			} ,
			carNumberAdd () {
				this[ 'car/ADD' ] ()
			} ,
			... mapActions ( [ 'car/smallCar/SMALL_CAR_NUMBER_ADD' ] ) ,//映射完整路径到this方法
			... mapActions ( 'car/smallCar' , [ 'SMALL_CAR_NUMBER_ADD' ] ) ,//映射方法名称到this方法
		} ,
		mounted () {
			// console.log ( this[ 'car/carGetterNumber' ] )
			// this.ADD ()
			// this[ 'SMALL_CAR_NUMBER_ADD' ] ()
			// this[ 'car/smallCar/SMALL_CAR_NUMBER_ADD' ] ()
			this.$store.commit ( 'car/smallCar/SMALL_CAR_ALERT' , null )
			// this.$store.dispatch ( "car/smallCar/SMALL_CAR_NUMBER_ADD" , null )
		} ,
	}
</script >
<style  scoped >
	fieldset{
		width: calc(100% - 40px);
	}
</style >
