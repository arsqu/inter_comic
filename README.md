<!-- 🌱🌟🐞🔥 -->

## 🌱 漫画

[![vue](https://img.shields.io/badge/vue-2.5.2-46BD87.svg)](https://github.com/arsqu/inter_comic) [![mint-ui](https://img.shields.io/badge/mint--ui-2.2.13-27A2FF.svg)](https://github.com/arsqu/inter_comic) [![stylus](https://img.shields.io/badge/stylus-0.54.7-FF6347.svg)](https://github.com/arsqu/inter_comic)

#### 项目依赖

- [amfe-flexible](https://www.npmjs.com/package/amfe-flexible) + [px2rem-loader](https://www.npmjs.com/package/px2rem-loader) 实现移动端适配(竖屏)
- [vue-i18n](https://www.npmjs.com/package/vue-i18n)
- [vue-lazyload](https://www.npmjs.com/package/vue-lazyload) 延迟加载图片
- [autoprefixer](https://www.npmjs.com/package/autoprefixer) 补齐浏览器前缀
- [clipboard](https://www.npmjs.com/package/clipboard)

#### 目录结构

```
├─.vscode        # vscode 编辑器工作区配置
├─build          # webpack 配置
├─config         # 不同项目配置
├─dist           # 文件打包输出目录
├─src            # 项目目录
│  ├─assets      # 样式文件
│  ├─common
│  ├─components  # 通用组件
│  ├─i18n
│  ├─plugins     # 插件
│  ├─router
│  ├─util
│  │   ├─api        # 接口地址
│  │   ├─fetch
│  │   ├─instance
│  │   ├─mock
│  │   ├─phoneCode
│  │   ├─config     # 网站配置(显示规则)
│  │   ├─project    # 网站配置(差异配置)
│  │   └─util       # 通用方法
│  ├─views
│  ├─novel       # 小说 (www.storyind.com)
│  ├─pmanga      # 新漫画 (www.aimghub.com)
│  └─xulin       # 老版漫画 (www.xulinad.com)
└─static
```

#### 更新

🔥 将 Mangaline (印度推广) 代码去除,并将剩余项目拆分成多个模块,且模块各自独立运行、编译、打包
