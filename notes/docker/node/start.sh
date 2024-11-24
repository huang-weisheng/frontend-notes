#!/bin/bash

# 处理容器退出
# 捕获 SIGTERM 信号
trap 'echo "接收到 SIGTERM 信号,正在优雅退出..."; exit 0' SIGTERM

# 捕获 SIGINT 信号 
trap 'echo "接收到 SIGINT 信号,正在优雅退出..."; exit 0' SIGINT

# 运行编译后的 JavaScript 文件,表示作为后台进程运行
node ./server/serve.mjs 