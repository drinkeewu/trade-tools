module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    ],

  rules: {
    camelcase: "off",
    "vue/valid-v-for": "off",
    "vue/no-multiple-template-root": "off"
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
