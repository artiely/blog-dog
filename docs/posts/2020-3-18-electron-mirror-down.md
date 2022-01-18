---
primary: 2974d1
secondary: d68b2e
title: Electron 镜像下载慢的解决办法
tag: electron,javascrip
author: Artiely
date: 2020-3-18
cover: https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png
base64: 2e7bd7
category: electron
data: 2020-3-18
summary: Electron 镜像下载慢的解决办法因为 Electron 的源在国外，如果我们直接使用 npm 进行安装，由于众所周知的原因，如果你没有一个好的梯子，通常下载速度只有几 k 到十几 k的速度。如图：运气非常好时，可能能跑 ...
description: Electron 镜像下载慢的解决办法因为 Electron 的源在国外，如果我们直接使用 npm 进行安装，由于众所周知的原因，如果你没有一个好的梯子，通常下载速度只有几 k 到十几 k的速度。如图：运气非常好时，可能能跑 ...
readTime: 2 min read
words: 396
---
# Electron 镜像下载慢的解决办法
因为 Electron 的源在国外，如果我们直接使用 npm 进行安装，由于众所周知的原因，如果你没有一个好的梯子，通常下载速度只有几 k 到十几 k的速度。如图：
![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200318131627.png)
运气非常好时，可能能跑到100多k。而这个包有差不多 50MB，可想而知，如果是以几k的龟速，不知道要下载到猴年马月。

## 将npm包下载地址改为淘宝地址

### 全局设置下载源
```shell
npm config set registry https://npm.taobao.org/mirrors/node
```
### 下载node源码加速
```shell
npm config set disturl https://npm.taobao.org/mirrors/node
```

### 将electron的地址注册为淘宝地址
```shell
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/

```
以上个人亲测有效，最重要的是后面两步。