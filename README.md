<br>

<p align="center">
<img src="https://api.iconify.design/fluent-emoji:dog-face.svg" style="width:100px;" />
</p>

<h1 align="center">x-dev-uni</h1>

## ✨ 特性

- 📦 基于 pnpm workspace 的 monorepo 工程方案
- 🎯 uni-app 开发框架
- 🚀 集成日志、工具、UI组件等多个功能包
- 💪 使用 TypeScript 构建，提供完整的类型定义
- 📖 包含完整的文档和使用示例
- 📦 [App打包](https://doc.crmeb.com/single/crmeb_v4/6830)
- 🛠️ 技术栈与生态
  - 🎨 UI 框架：[wot-design-uni](https://wot-design-uni.cn) - 基于 Vue3 的 uni-app 组件库
  - 📱 [z-paging](https://z-paging.zxlee.cn/) - 下拉刷新、上拉加载
  - 🚦 [weapp-tailwindcss](https://tw.icebreaker.top/) - 即时原子化 CSS 引擎
  - 📊 状态管理：[pinia](https://pinia.vuejs.org/) - Vue 官方状态管理方案
  - 🔄 请求库：[alova](https://alova.js.org/zh-CN/) - 下一代请求工具
  - 🔐 认证授权： [详情](./apps/weapp/README.md) - 基于 pinia store persist 的认证方案
  - ⚡️ 分包优化： [@uni-ku/bundle-optimizer](https://github.com/uni-ku/bundle-optimizer) - Uniapp Vue3 版本的分包优化实现

## 📦 项目结构

```bash
.
├── apps                # 应用目录
│   ├── h5             # H5 应用
│   └── weapp          # 微信小程序
├── docs               # 文档站点
├── examples           # 示例项目
└── packages           # 工具包
    ├── logger         # 日志包
    ├── preset         # 预设样式包
    ├── ui             # UI组件包
    └── utils          # 工具包
```

## 🔧 环境要求

- Node.js: >= 22.13.0
- pnpm: >= 9.8.0

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 开发
pnpm dev  # 微信小程序

# 打开微信开发工具
pnpm open:dev  # 微信小程序
```
