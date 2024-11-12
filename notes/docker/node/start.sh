#!/bin/bash

# 编译 TypeScript
tsc --outDir dist

# 运行编译后的 JavaScript 文件, & 符号用于将命令放入后台执行
node ./dist/serve.mjs &

# 获取 Node.js 进程的 PID
NODE_PID=$!

# 定义一个函数来处理退出信号
function graceful_shutdown {
  echo "Received SIGTERM, shutting down gracefully..."
  kill -SIGTERM "$NODE_PID"
  wait "$NODE_PID"
  echo "Node.js process has exited."
  exit 0
}

# 捕捉 SIGTERM 和 SIGINT 信号，并调用 graceful_shutdown
trap graceful_shutdown SIGTERM SIGINT

# 等待 Node.js 进程结束
wait "$NODE_PID"
