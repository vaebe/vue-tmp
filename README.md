
# 起步
> vite3 + vue3 作为示例项目 [掘金个人主义](https://juejin.cn/user/712139266339694/posts)。
+ 本文将从零到一介绍 `Eslint、Prettier、Stylelint、Commitlint、ls-lint` 的安装配置以及结合 `Husky`+`lint-staged` 做 `git commit` 时对代码进行一系列自动化的检查。

## 建个空仓库
![截屏2022-07-22 下午3.57.34.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5856888aa4b540cabc315094c5ac27eb~tplv-k3u1fbpfcp-watermark.image?)

# 使用 vite 创建项目
+ vite 已经发布vite3了好像有关系又好像没有关系，它是一个工具永远不会太复杂！
## 创建项目
+ [vite3官网](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)
+ 执行 `pnpm create vite` 名字与仓库名字保持一致，简单选择即可创建完成
  ![截屏2022-07-22 下午4.00.03.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1faf37f3a76f4b609dd8a13ffb93ca2c~tplv-k3u1fbpfcp-watermark.image?)
+ 执行 `pnpm i` 安装相关依赖

## 关联仓库
+ 执行 `git init` 初始化 `.git` 文件
+ 执行 `git remote add origin '你的仓库地址'`
+ 完成后将初始化的文件提交一下

# 安装 `eslint`
> ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。

## 安装 `eslint` 依赖
+ 执行 `pnpm i eslint -D` 安装 eslint
+ 执行 `npx eslint --init` 初始化eslint相关依赖配置
## 选择配置解读
+ How would you like to use ESLint? · `style`
    + 你希望用 ESLint 来干嘛？
    + `To check syntax, find problems, and enforce code style`
    + 检查语法，发现问题，并强制统一代码样式
+ What type of modules does your project use? · `esm`
    + 项目用的是什么模块系统
    + `JavaScript modules (import/export)`
    + esm
+ Which framework does your project use? · `vue`
    + 用的什么框架
    + vue
+ Does your project use TypeScript? · `Yes`
    + 是否使用ts
    + yes
+ Where does your code run? · `browser`
    + 代码运行环境
    + browser 浏览器
+ How would you like to define a style for your project? · `guide`
    + 代码风格
    + guide
    + 选择一个流行的代码风格
+ Which style guide do you want to follow? · `standard`
    + 使用那个代码风格
    + `standard`
    + 相比 `Airbnb` 较为宽松
+ What format do you want your config file to be in? · `JavaScript`
    + 配置文件的格式
    + `JavaScript`
    + 最后会生成一个 `.eslintrc.cjs` 可以改为 `.eslintrc.js`
+ Would you like to install them now? · Yes
    + 是否开始安装依赖
    + yes
+ Which package manager do you want to use? · `pnpm`
    + 使用那种包管理器
    + `pnpm`
## .eslintrc.js 配置及说明
+ env 运行环境
+ globals 全局变量
    + 有些全局变量是业务代码引入的第三方库所声明，就需要在`globals`配置中声明全局变量
     ```js
     // "writable"或者 true，表示变量可重写；
     // "readonly"或者 false，表示变量不可重写；
     // "off"，表示禁用该全局变量。
    module.exports = {
      "globals": {
        "$": false,
      }
    }
    ```
+ parser 解析器
+ extends 配置扩展
+ plugins 插件
+ rules 自定义规则 [eslint Rules 文档](https://cn.eslint.org/docs/rules/)
+ eslint-disable-next-line 禁用ESLint

## 创建 `.eslintignore`
+ 在根目录创建 `.eslintignore` 用于配置跳过文件或目录的 `eslint` 检查
+ 语法与 `.gitignore` 类似

## 在 Vite 中接入 ESLint
+ 用于在开发时进行错误提示
+ 执行 `pnpm i vite-plugin-eslint -D`
### 在 `vite.config.ts` 加入配置
+ 修改配置后重新运行项目打开页面如果有错误就会提示了！
```
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// 这里
import viteEslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteEslint()]
});
```
![截屏2022-07-22 下午5.14.36.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a0c1d696c7244f78891a822d7233e07~tplv-k3u1fbpfcp-watermark.image?)

# 安装 `prettier`
+ ESLint 的主要优势在于`代码的风格检查并给出提示`，代码格式化这一块 Prettier 更加的专业，因此我们将 ESLint 结合 Prettier 一起使用（强强联合）。

## 安装
+ 执行 `pnpm i prettier -D`
+ 创建 `.prettierrc.js` 写入如下内容
```
// .prettierrc.js
module.exports = {
  printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, // 一个 tab 代表几个空格数，默认为 2 个
  useTabs: false, //是否使用 tab 进行缩进，默认为false，表示用空格进行缩减
  singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号
  semi: true, // 行尾是否使用分号，默认为true
  trailingComma: "none", // 是否使用尾逗号
  bracketSpacing: true, // 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }
  arrowParens: "always",
  htmlWhitespaceSensitivity: "ignore",
  jsxSingleQuote: true
};
```

## 将`Prettier`集成到上边安装的`ESLint`
+ 执行 `pnpm i eslint-config-prettier eslint-plugin-prettier -D`

### 修改 `.eslintrc.js` 文件为
```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly'
  },
  extends: [
    'plugin:vue/vue3-essential', // 这里需要注意 vue2 是`plugin:vue/essential` 
    'standard',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
};
```

### 修改 `package.json`
+ 增加命令
    + `"lint:script": "eslint --ext .js,.jsx,.ts,.tsx,.vue --fix --quiet ./"`
+ 记得移除`package.json`中的 **"type": "module"**
+ 然后执行 `pnpm run lint:script` 会看到一些文件已经被修复了

## 使用项目的 Prettier 配置替换默认的格式化。
+ webstorm
  ![截屏2022-07-22 下午4.44.59.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/282d7ab38e4942e2b287f4d3d9c47000~tplv-k3u1fbpfcp-watermark.image?)
+ `VSCode`中安装`ESLint`和`Prettier`这两个插件，并且在设置区中开启`Format On Save`:

# 安装 `stylelint`
> Stylelint，一个强大的现代化样式 Lint 工具，用来帮助你避免语法错误和统一代码风格。

## 安装 Stylelint 以及相应的工具套件
+ 执行`pnpm i stylelint stylelint-prettier stylelint-config-prettier stylelint-config-recess-order stylelint-config-standard stylelint-config-standard-scss stylelint-config-recommended-vue postcss-html -D`

## 创建 `.stylelintrc.js`
+ 在根目录创建 `.stylelintrc.js`
```js
// .stylelintrc.js
module.exports = {
  // 注册 stylelint 的 prettier 插件
  plugins: ['stylelint-prettier'],
  // 继承一系列规则集合
  extends: [
    // standard 规则集合
    'stylelint-config-standard',
    // standard 规则集合的 scss 版本
    'stylelint-config-standard-scss',
    // 样式属性顺序规则
    'stylelint-config-recess-order',
    // 接入 Prettier 规则
    'stylelint-config-prettier',
    'stylelint-prettier/recommended',

    'stylelint-config-recommended-vue',
    'stylelint-config-recommended-vue/scss',
  ],
  customSyntax: 'postcss-html',
  ignoreFiles: [], // 忽略某些不想被检查的文件
  // 配置 rules
  rules: {
    // 开启 Prettier 自动格式化功能
    'prettier/prettier': true
  }
};
```

## 修改 `package.json` 中，增加如下的 `scripts`
```
"scripts": {
  "lint": "npm run lint:script && npm run lint:style",
  "lint:style": "stylelint --fix "src/**/*.{css,scss}"",
},
```
+ `pnpm run lint:style`即可完成样式代码的规范检查和自动格式化
+ 在 VSCode 中安装`Stylelint`插件，可以开发阶段即时感知到代码格式问题提前进行修复。

## 在 `vite` 中集成 `Stylelint`
+ 实现在项目开发阶段提前暴露出样式代码的规范问题。
+ 执行 `pnpm i @amatlash/vite-plugin-stylelint -D`
+ 在 `vite.config.ts` 中增加如下配置
```
// stylelint插件
import viteStylelint from '@amatlash/vite-plugin-stylelint';

export default defineConfig({
  plugins: [
      // ...
    viteStylelint({
      // 对某些文件排除检查
      exclude: /windicss|node_modules/
    })
  ]
});
```

# 安装 `husky`
+ 作用是拦截 `git commit` 命令，进行代码格式检查，只有确保通过格式检查才允许正常提交代码。
## 安装 `husky` 依赖
+ 执行 `pnpm i husky -D`
+ 执行 `npx husky install` 进行初始化
    + 输出 `husky - Git hooks installed` 即表示成功
    + 会在根目录看到 `.husky` 目录

## 修改  `package.json`
+ 将 `husky install`作为项目启动前脚本，增加 `package.json` 命令。
```
"scripts": {
  // ... 其他命令
  // 会在 pnpm 安装依赖后执行自动执行
  "postinstall": "husky install"
},
```
## 添加 `Husky` 钩子。
+ 执行 `npx husky add .husky/pre-commit "npm run lint"`
+ 完成后在项目根目录的`.husky`目录中看到名为`pre-commit`的文件，里面包含了 `git commit`前要执行的脚本。
+ 当执行 `git commit` 时，会先执行 `npm run lint`脚本，通过 Lint 检查后才会正式提交代码记录。

# 安装 `lint-staged`
+ Husky 中每次执行`npm run lint`都对仓库中的代码进行全量检查，随着代码越来越多会越来越慢。
+ lint-staged 可以实现只对存入`暂存区`的文件进行 Lint 检查。

## 安装 `lint-staged` 依赖
+ 执行 `pnpm i -D lint-staged`

## 修改  `package.json`
+ 注意配置的文件格式。
+ 比如 `"**/*.{js,jsx,tsx,ts,vue}"` 就是检查 `.js .jsx .tsx .ts .vue` 结尾的文件。
```json
{
    "lint-staged": {
      "**/*.{js,jsx,tsx,ts,vue}": [
        "npm run lint:script",
        "git add ."
      ],
      "**/*.{scss, css}": [
        "npm run lint:style",
        "git add ."
      ]
    }
}
```
## 将`lint-staged` 命令集成到 `Husky`
+ 修改 `.husky/pre-commit` 为
+ `npx` 也可以改为 `pnpx` 一样的。
```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- lint-staged
```

# 安装 `commitlint`
+ 用于提交时规范 `commit` 信息，规范和统一的 `commit` 信息能够方便团队协作和问题定位。

## 安装 `commitlint` 依赖
+ 执行 `pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D`

## 创建 `.commitlintrc.js`
+ 在根目录创建 `.commitlintrc.js`
+ 使用`@commitlint/config-conventional`规范集
    + `feat`: 增加新功能。
    + `fix`: 修复 Bug。
    + `chore`: 一些不影响功能的更改。
    + `docs`: 文档的修改。
    + `perf`: 性能方面的优化。
    + `refactor`: 代码重构。
    + `test`: 添加测试代码等等
    + `revert`：回滚某个更早之前的提交
    + `style`：样式、代码风格
    + `build`：修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
    + `ci`：修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交

```js
// .commitlintrc.js
module.exports = {
  extends: ["@commitlint/config-conventional"]
};
```
## 将`commitlint`的功能集成到 Husky 的钩子当中
+ 执行 `npx husky add .husky/commit-msg "npx --no-install commitlint -e"`
+ 会在 `.husky` 创建 `commit-msg` 文件。
+ 如果输入不合规则的 `commit` 信息，则会退出提交。
  ![截屏2022-07-23 下午2.51.46.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d13b18e472d4ffea880c4971ee47947~tplv-k3u1fbpfcp-watermark.image?)

# 安装 `ls-lint`
+ 用于规范仓库的文件命名，官网介绍 `一个非常快速的文件和目录名称 linter`
+ [官方文档 ](https://ls-lint.org/1.x/getting-started/installation.html#curl)

## 安装 `ls-lint` 依赖
+ 执行 `pnpm i @ls-lint/ls-lint -D`

## 创建 `.ls-lint.yml`
+ 在根目录创建 `.ls-lint.yml`
```yml
ls:
  src/*:
    .dir: kebab-case | regex:__[a-z0-9]+__
    .scss: kebab-case # 对所有 scss 文件使用 kebab-case 形式
    .vue: kebab-case | pascalcase  # vue 组件推荐 大写字母开头 额外配置 pascalcase
    .js: kebab-case
    .ts: kebab-case
    .tsx: kebab-case
    .route.ts: kebab-case
    .type.ts: kebab-case

# 一些需要忽略检查的文件
ignore:
  - /node_modules
```
+ 配置可以按照目录配置，不同的目录不同的检查规则 [详情查看官网](https://ls-lint.org/1.x/configuration/the-basics.html#different-rules-for-different-directories)
+ 执行 `npx @ls-lint/ls-lint` 如果有不合规则的文件命名就会在控制台显示
  ![截屏2022-07-23 下午6.02.54.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4da590a30a6a4afd9e112171c78d1dea~tplv-k3u1fbpfcp-watermark.image?)

## 将`ls-lint`的功能集成到 Husky 的钩子当中
+ 修改 `.husky/pre-commit` 为
```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx @ls-lint/ls-lint && npx --no -- lint-staged
```
+ 这样提交时就会校验文件命名是否合规！

# 如果代码提交时没有执行 `git hooks` 钩子
+ 可以尝试在根目录添加 `.npmrc` 写入如下内容
```
enable-pre-post-scripts=true
```
