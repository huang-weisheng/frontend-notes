
# 该镜像是基于node:latest镜像构建的
FROM node

# RUN: 在镜像构建过程中执行命令，比如安装软件包、运行脚本等。
RUN npm config set registry http://registry.npm.taobao.org
RUN npm i -g typescript

# 声明容器运行时将要监听的端口声明容器运行时将要监听的端口,声明后客户端界面可配置映射端口。
EXPOSE 666

# WORKDIR: 指定工作目录，后续命令都会在该目录下执行。
WORKDIR /app

# CMD ["可执行文件", "参数1", "参数2", ...] 定义容器启动时的默认执行命令。
CMD ["./start.sh"]

# 构建docker镜像

# docker build -t node:v1.0 .

# 基于镜像启动一个docker容器

# docker run -d -p 667:666 --name node_container -v C:\Users\HuangWeiSheng\Desktop\my-vue3\notes\docker\node\app\:/app/ node:v1.0
