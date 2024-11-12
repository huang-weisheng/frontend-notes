console.log('b.js加载');
import bus from './bus.js';
export let count=0;
export const obj={count: 0};

bus.$on('b',(e) => {console.log(e);});
