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
        path: 'content/vcards/*/content.md',
        typeName: 'VegetationCard',
        refs: {
          descriptionmd: 'VegetationCardDescription'
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/vcards/*/description.md',
        typeName: 'VegetationCardDescription',
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
  }
}
