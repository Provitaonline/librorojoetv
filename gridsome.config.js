// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Libro Rojo ETV',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/vcards/**/*.md',
        typeName: 'VegetationCard',
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/home.md',
        typeName: 'HomeData'
      }
    }
  ],
  templates: {
    VegetationCard: '/vcards/:title'
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
