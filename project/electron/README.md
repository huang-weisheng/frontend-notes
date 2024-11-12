# electron project 注意事项


# electron build 配置
files字段不声明则打包当前目录所有文件,
extraMetadata 允许打包时动态修改package.json中的字段,
打包要包含 package.json,根据package.josn指定启动项目入口文件及版本等信息。
