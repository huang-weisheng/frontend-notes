import Vue from 'vue'
import Vuex from 'vuex'
import {Message} from 'element-ui'
import car from './modules/car'

Vue.use ( Vuex )

export default new Vuex.Store ( {
	state : {
		userName : '758520' ,
		passWord : '123456' ,
		mainNumber : 0 ,
		app_key : 'DF7C8E0981A8BB52E8815AACA844496C' ,
		OKAYAPI_APP_SECRECT : 'bsTxzCckmC0nyNmSwHsDFYOx8mEAhksG9oh8hbGkLZfyYDuVeg5TG2CMqEdFAIaQ5l' ,
	} ,
	getters : {
		mainGetterNumber ( state , getters ) {
			return `${ state.mainNumber }+${ state.car.carNumber }`
		} ,
	} ,
	mutations : {
		ADD ( state , payload ) {
			state.mainNumber += 1
		} ,
		SMALL_CAR_ALERT ( state , payload ) {
			alert ( 'root调用' )
		} ,
	} ,
	actions : {} ,
	modules : {
		car ,
	} ,
} )
