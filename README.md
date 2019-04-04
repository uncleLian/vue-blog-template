# vue-blog-template

[![image](https://img.shields.io/badge/vue-2.6.8-brightgreen.svg)](https://github.com/vuejs/vue)
[![image](https://img.shields.io/badge/vue--router-3.0.2-brightgreen.svg)](https://github.com/vuejs/vue-router)
[![image](https://img.shields.io/badge/vuex-3.1.0-brightgreen.svg)](https://github.com/vuejs/vuex)
[![image](https://img.shields.io/badge/vue--cli-3.x-brightgreen.svg)](https://cli.vuejs.org/zh/)
[![image](https://img.shields.io/badge/element--ui-2.7.0-9cf.svg)](https://github.com/ElemeFE/element)
[![GitHub release](https://img.shields.io/github/release/uncleLian/vue-blog-template.svg)](https://github.com/uncleLian/vue-blog/releases)

##### 注：master分支基于 vue-cli-3.x，vue-cli-2.x请移步到v1.0分支

> 这是一个极简的管理后台模板，它只包含了搭建管理后台的一些必要功能

- [在线演示](http://template.liansixin.win)
- [使用文档](https://unclelian.github.io/vue-blog-docs/)

<img src="http://poci6sbqi.bkt.clouddn.com/vue-blog-template.png" width="900px" style="max-width: 100%;"/>

## 功能
功能持续迭代中，欢迎 [pr](https://github.com/uncleLian/vue-blog/pulls) 和 [issue](https://github.com/uncleLian/vue-blog/issues)

``` 
- 登录/注销
- 权限验证
    - 页面级权限
    - 按钮级权限
- 多环境
    - dev
    - prod
    - stage
- 动态侧边栏
- 动态面包屑
- 错误处理
    - 401
    - 404
    - 错误日志
- 其他处理
    - axios封装
    - cache封装
    - 页面平滑过渡
    - css预处理器全局变量
    - 包体积优化
- svg icon / iconfont
- mock
- 进度条
```

## 开发
```bash
# 克隆项目
git clone https://github.com/uncleLian/vue-blog-template.git

# 安装依赖
npm install

# 启动服务：localhost:8003
npm run dev
```

## 发布
```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build

# 查看构建报告
npm run build:report
```

## 版本日志
[发行说明](https://github.com/uncleLian/vue-blog-template/releases)中记录了每个版本的详细更改。

## Browsers support
| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## 捐赠
如果觉得这个项目帮助到了你，你可以请作者喝杯饮料表示支持 :green_heart:

![image](http://poci6sbqi.bkt.clouddn.com/donate.jpg)

## 交流
欢迎热爱学习、忠于分享的朋友一起来交流
- Vue交流群：338241465

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present，uncleLian
