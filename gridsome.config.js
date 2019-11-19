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
        path: 'content/vcards-index.md',
        typeName: 'VegetationCardsIndex'
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
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/units/**/*.md',
        typeName: 'UnitCard',
        remark:{
          autolinkHeadings: false,
          lazyLoadImages: false,
          slug: false,
          plugins: [
            'remark-attr'
          ]
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/units-index.md',
        typeName: 'UnitCardsIndex'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/units-references.md',
        typeName: 'UnitCardReferences'
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
    VegetationCard: '/vcards/:title',
    UnitCard: '/units/:region'
  }
}
