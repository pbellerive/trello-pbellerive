module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: [],
  },

  transpileDependencies: [
    'vuetify',
    'feathers-vuex',
  ],

  devServer: {
    disableHostCheck: true
  }
};
