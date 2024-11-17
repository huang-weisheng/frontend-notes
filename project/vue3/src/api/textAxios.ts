
import MyFetch from "./axios";
MyFetch<string>('bbbbbbbbbbbbbbbb',{
   responseType:"blob",
   method:"post",
})
MyFetch.post<string>('ddddddddddddddddd',123, { responseType: "blob" })
const myFetch = new MyFetch({
    baseURL:'_________'
 })
myFetch.interceptors.request.use(config => {
    console.log(config);
   config.method='post'
   return config;
})
myFetch<string>('eeeeeeeeeeeeeeee', {
   responseType: "json"
})
myFetch.post('ascasc',{

},{})
myFetch.get<string>('eeeeeeeeeeeeeeee', {
   responseType: "json"
}).then(r=>{})
// myFetch2.get<string>('ffffffffffffffff', {
//    responseType: "json"
// })
// myFetch.interceptors.request=123
// myFetch.get('aaaaaaaaaaa')
// myFetch('bbbbbbbbbbbb',{
//     body:'123',
//     method:"post"
// })
// myFetch.get('bbbbbbbbbbbbbbbb')
// MyFetch.get<number>('example',{
    
// }).then(res => {
//     console.log(res.data);
// })
// // myFetch('http://127.0.0.1:666/web/#/example')
// myFetch.get('/example').then((res)=>{
//     console.log(res.data);
// })

