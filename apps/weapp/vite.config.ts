import uni from '@dcloudio/vite-plugin-uni'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite'
import { WeappTailwindcssDisabled } from './platform'
import postcssPlugins from './postcss.config'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://dev-study.metaobe.com:9443/api/dcy-system-study',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  // uvtw 一定要放在 uni 后面
  plugins: [
    UniLayouts(),
    uni(),
    uvtw({
      rem2rpx: true,
      disabled: WeappTailwindcssDisabled,
      cssPreflight: {
        'box-sizing': false,
      },
      // 使用新的 ast-grep 来处理 js 资源，速度是 babel 的2倍左右
      // 需要先安装 `@ast-grep/napi`, 安装完成后再启用下方配置
      // jsAstTool: 'ast-grep'
    }),
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  // 内联 postcss 注册 tailwindcss
  css: {
    postcss: {
      plugins: postcssPlugins,
    },
    // https://vitejs.dev/config/shared-options.html#css-preprocessoroptions
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'legacy-js-api', 'css-function-mixin', 'global-builtin'],
      },
    },
  },
})
