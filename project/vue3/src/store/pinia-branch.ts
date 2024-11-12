import {defineStore} from 'pinia'

export const useBranchStore=defineStore('branch',{
	state: () => {
		return {
			url: 'https://api.vvhan.com/api/bing',
		}
	},
	getters: {
		urlAndHash: (state) => state.url+'#hash',
	},
	actions: {
		print0() {
			console.log(0)
		},
	},
})
