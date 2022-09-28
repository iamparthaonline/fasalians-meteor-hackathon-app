module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'airbnb-base', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'vue/require-default-prop': 'off',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-indent': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    indent: 'off',
    'object-curly-spacing': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
  },
  globals: {
    Meteor: 'readonly',
    Tracker: 'readonly',
    Mongo: 'readonly',
    ServiceConfiguration: 'readonly',
    DateTime: 'writable',
    cordova: 'readonly',
  },
};
