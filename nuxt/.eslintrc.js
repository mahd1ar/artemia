module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  // parserOptions: {
  //   parser: '@typescript-eslint/parser'
  // },
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript'
    // 'plugin:prettier/recommended',
    // 'airbnb-base',
    // 'airbnb-typescript/base'
  ],
  plugins: [],
  rules: {
    'vue/no-multiple-template-root': 'off',
  
    '@typescript-eslint/no-unused-vars': 'warn'

  }
}
