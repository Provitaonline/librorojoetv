// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const {basename} = require('path')

module.exports = {
  siteName: 'Libro Rojo ETV',
  runtimeCompiler: true,
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/vcards/**/*.md',
        typeName: 'VegetationCard',
        remark:{
          autolinkHeadings: false,
          lazyLoadImages: false
        }
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
    },
    {
      use: 'gridsome-plugin-svg',
      options: {
      // default options below
        goesBothWays: true,
        svgo: [
          {
            removeTitle: false
          },
          {
            prefixIds: {
              prefix: (_, {path}) => basename(path, '.svg'),
              delim: '-'
            }
          },
          {
            removeDesc: false
          },
          {
            removeViewBox: false
          },
          {
            sortAttrs: true
          }
        ]
      }
    }
  ],
  templates: {
    VegetationCard: '/vcards/:title'
  }
}
