
# 该镜像是基于node:latest镜像构建的
FROM node

# RUN: 在镜像构建过程中执行命令，比如安装软件包、运行脚本等。
RUN npm config set registry http://registry.npm.taobao.org

# 声明容器运行时将要监听的端口,声明后客户端界面可配置映射端口。
EXPOSE 88

# WORKDIR: 指定工作目录，后续命令都会在该目录下执行。
WORKDIR /home/app

# CMD ["可执行文件", "参数1", "参数2", ...] 定义启动容器时执行的命令。
# 最好明确确指定可执行文件,否则可能会有意外情况
CMD ["/bin/bash", "start.sh"]

# 构建docker镜像

# docker build -t node:v1.0 .

# 基于镜像启动一个docker容器

# docker run -d -p 678:88 --name node_server -v "$(pwd):/home/app/" node:v1.0
