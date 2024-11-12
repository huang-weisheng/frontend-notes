
# 该镜像是基于nginx:latest镜像构建的
FROM nginx:latest

RUN apt-get update && apt-get install -y nodejs && apt-get install -y npm

# 从宿主机的映射目录中拿配置文件覆盖容器内nginx配置文件
CMD ["/bin/bash", "-c", "cp -f /nginx/default.conf /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

# 构建docker镜像
# docker build  -t nginx:v1.0 .

# 基于镜像启动一个docker容器
# docker run -d -p 668:80 --name nginx_container -v C:\Users\HuangWeiSheng\Desktop\my-vue3\notes\docker\nginx\:/nginx/ nginx:v1.0
