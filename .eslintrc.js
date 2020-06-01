module.exports = {
  root: true,
  globals: {
    $: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  settings: {
    react: {
      version: 'detect' // 自动检查已安装的版本
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
