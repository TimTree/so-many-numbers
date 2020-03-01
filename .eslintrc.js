module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  overrides: [
    {
      files: ["src/components/home/SoManyNumbersTitleLight.vue", "src/components/home/SoManyNumbersTitleDark.vue"],
      rules: {
        'max-len': 'off'
      }
    }
  ]
};
