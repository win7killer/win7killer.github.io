module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  plugins: [
      'vue'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    "indent": [2, 4], //缩进风格
    "semi": [2, 'always'],
    "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "ignore",
        "asyncArrow": "ignore"
    }],
    "comma-dangle": ["error", "only-multiline"],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
