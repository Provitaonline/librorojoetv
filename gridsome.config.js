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
        path: 'content/vcards/**/content.md',
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
        path: 'content/**/references.md',
        typeName: 'References'
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
        path: 'content/units/**/content.md',
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
        path: 'content/cases/**/content.md',
        typeName: 'CaseCard',
        remark:{
          autolinkHeadings: false,
          lazyLoadImages: false
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/cases-index.md',
        typeName: 'CasesIndex'
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
    UnitCard: '/units/:region',
    CaseCard: '/cases/:case',
    References: '/references/:id'
  }
}
