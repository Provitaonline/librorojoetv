// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Libro Rojo ETV',
  runtimeCompiler: true,
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
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/vcards-references.md',
        typeName: 'VegetationCardReferences'
      }
    }
  ],
  templates: {
    VegetationCard: '/vcards/:title'
  }
}
