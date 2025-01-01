# Docker

## 设置代理

打开代理工具 tun模式 即可代理docker软件

## Docker 容器会在主进程结束时停止。

## 容器退出时,捕获SIGTERM和SIGINT信号,优雅退出  

在启动脚本加上如下代码
```bash
# 捕获 SIGTERM 信号
trap 'echo "接收到 SIGTERM 信号,正在优雅退出..."; exit 0' SIGTERM

# 捕获 SIGINT 信号 
trap 'echo "接收到 SIGINT 信号,正在优雅退出..."; exit 0' SIGINT
```

## Dockerfile常用字段

```bash
# LABEL 设置镜像的元数据信息，如作者、版本等。
LABEL key=value key=value ...

# 该镜像是基于node:latest镜像构建的
FROM node:latest

# ADD <源路径> <目标路径> 命令用于将文件、目录或远程文件 URL 复制到 Docker 镜像中,还具有解压缩 tar 文件和从 URL 下载文件的功能。
# ADD 存在同名文件则覆盖,如果目标目录中有同名文件,则重命名源文件。
ADD . /

# COPY <源路径> <目标路径> 指令用于将文件从宿主机复制到 Docker 镜像中的指定目录。同名不覆盖目标文件
COPY . /

# WORKDIR: 设置容器中命令执行的工作目录，后续命令都会在该目录下执行。
WORKDIR /app

# RUN: 构建过程中在镜像内执行命令，比如安装软件包、运行脚本等。
RUN npm config set registry http://registry.npm.taobao.org

# 声明容器运行时将要监听的端口声明容器运行时将要监听的端口,仅仅是一个文档标记,声明后客户端界面可配置映射端口。
EXPOSE 666

# ENV 设置容器运行的环境变量。
ENV MYSQL_ROOT_PASSWORD 123456

# 最好明确确指定可执行文件,不要将.sh等脚本写在第一个参数
# CMD ["可执行文件", "参数1", "参数2", ...] 定义启动容器时执行的命令。
# 镜像构建过程中必须存在至少一个,子镜像覆盖父镜像CMD命令
CMD ["/bin/bash","start.sh"]
```

## 构建docker镜像

```bash
 docker build --no-cache -t node:v1.0 .
```
- `docker build`  这是 Docker 命令行工具用于构建 Docker 镜像的命令。
- `--no-cache` 这是一个选项参数，表示在构建镜像时不使用缓存。
- `-t node:v1.0` -t表示 tag 的意思，后面跟着镜像的名称和标签,格式为 <repository>:<tag>
- `.` 这是构建上下文的路径，指定了 Dockerfile 和其他构建所需的文件的位置。

## 基于镜像启动一个docker容器

```bash
docker run -d -p 678:88 --name node_server -e NAME=HYX -v "$(pwd)/app:/app" -w /app  node:v1.0
```

- `docker run` 基于镜像启动一个容器。
- `-d` 后台方式启动
- `-p` 端口映射  <主机端口>:<容器端口>
- `-w`  指定工作目录(WORKDIR)
- `--name`  指定容器名
- `-e` 设置容器环境变量
- `-v` 挂载目录或者文件, 可以重复声明挂载多个
	- bind mount 方式: <宿主机绝对路径>:<docker容器路径> 将宿主机目录挂载到容器
	- volume 方式:  <只需一个名字>:<docker容器路径>  由容器创建和管理，创建在宿主机，可挂到多个容器上
- `node:v1.0` 要启动的镜像名称及版本号.也可以使用镜像ID,如果本地不存在该镜像,则从远程仓库拉取

## docker镜像的导入和导出

### save 方式

save使用镜像名和标签保存时会保存镜像名和标签,使用镜像id不会保存像名和标签,
load加载时无法指定镜像名,可以使用docker tag为镜像重命名

- **作用对象**：镜像和标签
- **保存内容**：完整的镜像，包括文件系统层、元数据、历史记录等
- **输出格式**：通常保存为 tar 归档文件
- **用途**：用于将镜像保存为文件，以便在其他 Docker 主机上加载和使用

```bash
docker  save  -o  ./node.tar node:v1.0     # 这个命令将 node:v1.0 镜像保存为一个名为 node.tar 的 tar 文件。
docker  load  -i  ./node.tar           #  这个命令会从指定的 node.tar 文件加载一个 Docker 镜像。
```
- `docker save`  将一个或多个镜像保存为 tar 归档文件。
- `-o ./node.tar`  -o 选项表示将输出保存为指定的文件 ./node.tar 表示输出文件名和路径
- `node:v1.0` 这是要保存的镜像的名称和标签

- `docker load`  加载一个或多个使用 docker save 命令保存为 tar 归档文件的Docker镜像
- `-i ./node.tar`  -i 选项表示从指定的文件加载镜,  ./node.tar 表示输入文件名为

### export  方式

- 当你使用 docker export 导出一个容器时，它会变成一个镜像，只包含容器当前的文件系统状态,不会保留原始镜像的元数据（如 CMD、WORKDIR、ENTRYPOINT、ENV 变量等）。因此，你需要在运行导入的镜像时手	动指定这些参数。或者创建一个新的 Dockerfile 并基于导入的镜像重新构建一个新的镜像，添加 CMD 指令。
- docker export导出容器时不会导出挂载在宿主机的目录,运行时仍需挂载目录
- 启动export与import命令导出导入的镜像必须加/bin/bash或者其他/bin/sh,否则会报错。

- **作用对象**：运行中的容器
- **保存内容**：容器的文件系统层（不包括元数据和历史记录）
- **输出格式**：通常保存为 tar 归档文件
- **用途**：用于将容器的文件系统导出为一个文件，通常用于迁移或备份容器内的数据，但不包含容器的元数据信息，也无法重建容器

```bash
docker  export -o  node_container.tar   node_container
docker import node_container.tar node_container:v1.1

#运行导入的镜像时恢复状态,手动指定CMD,指定工作目录 等等
docker run -d -p 667:666 --name node_container -v C:\Users\HuangWeiSheng\Desktop\my-vue3\notes\docker\node\app:/app -w /app node:v1.0 ./start.sh

# 为了避免每次运行容器时都需要手动提供 CMD，创建一个新的 Dockerfile 并基于导入的镜像重新构建一个新的镜像，添加 CMD 指令。
FROM node_container:latest
WORKDIR /app
EXPOSE 666
CMD ["./start.sh"]
```

- `docker export` 导出一个容器的文件系统。
- `-o  ./node_container.tar node_container` -o 选项表示将输出保存为指定的文件, ./node_container 表示输出文件名和路径, node_container 要导出的容器

- `docker import node_container.tar` docker import:引入一个新的镜像,node_container.tar:要导入的 tar 归档文件的路径和名称
- `node_container:v1.1`  新创建镜像的名称和标签

## 查看当前 Docker 主机上的所有镜像

```bash
docker images
```

## 镜像重命名

```bash
docker tag 镜像id  node:v1.0
```

# Docker Compose 介绍

Docker Compose 是一个用于定义和运行多容器 Docker 应用的工具。通过 Docker Compose，用户可以使用一个单独的 `docker-compose.yml` 文件来配置应用所需的所有服务。然后，通过一个命令，就可以启动、停止和管理整个应用。

## 主要概念

### 服务（Service）
服务表示容器化应用的一个组成部分，例如一个数据库或 Web 服务器。每个服务可以定义自己独立的镜像、端口、环境变量、卷等配置。

### 项目（Project）
项目是由 Compose 文件定义的一组关联的服务。项目名默认是 Docker Compose 文件所在目录的名称，但可以使用 `-p` 选项自定义。

### 卷（Volumes）
卷用于持久化容器的数据，即使容器被删除，数据仍然存在。

### 网络（Networks）
Compose 会为每个项目创建默认网络，以便项目中的容器可以互相通信。

## 主要命令


- `docker-compose up`：构建并启动容器。
- `docker-compose ps`：列出项目的容器。
- `docker-compose down`：停止并删除容器、网络、卷和镜像。
- `docker-compose build`：构建或重新构建服务的镜像。
- `docker-compose start`：启动已存在的容器。
- `docker-compose stop`：停止运行中的容器。
- `docker-compose logs`：查看服务输出的日志。
- `docker-compose up -d <service_name>`  启动指定服务
- `docker-compose stop <service_name>`  停止指定服务
- `docker-compose restart <service_name>`  重启指定服务
- `docker-compose rm <service_name>`  删除指定服务的容器
- `docker-compose logs -f <service_name>`  查看指定服务的日志

## 启动命令

```bash
docker-compose -p docker_compose up --build -d
```
  - `--build` 无论镜像是否存在或是否有变化，都会强制重新构建镜像。
  - `-p` 设置项目名称,默认是当前目录名称。
  - `-d` 在后台运行容器。



## `docker-compose.yml` 文件结构

一个典型的 `docker-compose.yml` 文件包括以下部分：

- `version`：指定 Docker Compose 文件的版本。
- `services`：定义应用的服务，每个服务对应一个容器。
- `volumes`：定义卷，用于持久化数据。
- `networks`：定义网络，用于服务间通信。

### 示例 `docker-compose.yml` 文件

```yaml
version: '3.8'

services:

  # MySQL 服务
  mysql:
    image: mysql:8.0 # 使用 MySQL 官方镜像
    container_name: compose_mysql
    environment:
      MYSQL_ROOT_PASSWORD: "rootpassword" # 设置 MySQL root 用户密码
      MYSQL_DATABASE: "exampledb" # 设置默认数据库
      MYSQL_USER: "user" # 设置自定义用户
      MYSQL_PASSWORD: "userpassword" # 自定义用户的密码
    ports:
      - "3306:3306" # 映射 MySQL 的端口
    volumes:
      - mysql_data:/var/lib/mysql # 使用卷存储 MySQL 数据

  # Node.js 应用服务
  node_app:
    image: node:v1.0 # 指定 Node.js 镜像名称和标签              
    container_name: compose_node # 指定容器的名称       
    ports: # 将主机端口映射到容器端口
      - "678:88"                      
    volumes:
      - node/:/app/  # 挂载主机目录到容器目录              
    build: # 有 build 字段:根据 Dockerfile 构建新镜像;没有 build 字段:使用 image 字段指定的镜像
      context: node  # 使用node目录作为构建上下文
      dockerfile: Dockerfile # 指定 Dockerfile 路径,相对于context路径
     depends_on: # 设置服务依赖
      - mysql
      
# 定义卷
volumes:
  mysql_data: # 定义名为 mysql_data 的卷
```
