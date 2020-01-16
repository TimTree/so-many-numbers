module.exports = {
  pwa: {
    name: 'Numbers!',
    themeColor: '#066596',
    msTileColor: '',
    appleMobileWebAppCapable: 'yes',
    iconPaths: {
      favicon32: 'img/icons/favicon32.png',
      favicon16: 'img/icons/favicon16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      appleMobileWebAppStatusBarStyle: 'black',
      maskIcon: '',
      msTileImage: '',
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      exclude: ['_headers', '_redirects'],
    },
  },
};
