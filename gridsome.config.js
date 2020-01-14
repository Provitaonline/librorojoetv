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
        path: 'content/references/*.md',
        typeName: 'References'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/home/content.md',
        typeName: 'HomeData',
        remark:{
          lazyLoadImages: false,
          plugins: [
            'remark-attr'
          ]
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/explore/vcards-index.md',
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
        path: 'content/explore/units-index.md',
        typeName: 'UnitCardsIndex'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/cases/**/content.md',
        typeName: 'CaseCard',
        refs: {
          case: 'References'
        },
        remark:{
          autolinkHeadings: false,
          lazyLoadImages: false,
          plugins: [
            'remark-attr',
            'remark-grid-tables'
          ]
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/methods/**/content.md',
        typeName: 'MethodCard',
        refs: {
          method: 'References'
        },
        remark:{
          autolinkHeadings: false,
          lazyLoadImages: false,
          slug: false,
          plugins: [
            'remark-attr',
            'remark-grid-tables'
          ]
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/explore/cases-index.md',
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
    UnitCard: '/unidades/:region',
    CaseCard: '/casos/:case',
    MethodCard: '/methods/:method',
    References: '/bibliografia/:id'
  }
}
