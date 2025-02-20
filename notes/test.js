const p1 = Promise.resolve(1);
async function p (){
    return p1
}
const p2 = p();
console.log(p2 === p1);
