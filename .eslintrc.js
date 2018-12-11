// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  // extends: ['plugin:vue/essential'],
  "extends": ['plugin:vue/recommended', 'eslint:recommended'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "indent": [ //强制使用tab缩进
      "error",
      2
    ],
    "linebreak-style": [ //不强制换行
      "off",
      "windows"
    ],
    "quotes": [ //强制使用单引号
      "error",
      "single"
    ],
    "semi": [ //强制最后不使用分号
      "error",
      "always"
    ],
    "no-extra-parens":[ //禁止冗余的括号
      "error",
      "all"
    ],
    "no-console":[2,{
      "allow":["warn","info","error"]
    }]
  }
}
