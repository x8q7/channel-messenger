# channel-messenger
channel-messenger server 

## 1. 开始
```bash
项目基于：
node:   18.12.1
mysql:  8.0.31
docker: 20.10.21
```
### 1.1 快速开始

```bash
git clone https://github.com/x8q7/channel-messenger.git
```
```bash
npm i
```
```bash
npm run build
```
```bash
npm run start
```
### 1.2 Docker

您也可以使用docker进行启动。
```bash
docker push x8q7/channel_message_api:1.0.0
```
```bash
docker run -d -p 14000:14000 x8q7/channel_message_api:1.0.0
```

## 2. 环境
1. 项目配置在本地env文件中，不应随项目一起提交。
2. mysql为个人服务器内的数据库实例，不应对外网暴露，而且密码设置过于简单。

以上问题在生产环境严禁出现。

## 3. 数据库
数据库采用mysql，表结构在sql目录下。

## 4. 模块
项目分为：日志模块，路由模块，服务模块，测试模块，工具模块；

服务模块为业务功能的抽象，如后期需要rpc调用，可直接进行调用；

## 5. 测试
```bash
npm run test
```
