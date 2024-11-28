let count = 0
let counter
const startCounter = () => {
    // 每秒增加计数并发送消息
    counter=setInterval(() => {
        count++
        self.postMessage({ count })
    }, 1000)
}
const stopCounter = () => {
    clearInterval(counter)
}

// 接收主线程消息
self.onmessage = (e) => {
  if (e.data === 'start') {
    startCounter()
  }
  if (e.data === 'stop') {
    stopCounter()
  }
} 