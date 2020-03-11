// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const {basename} = require('path')

module.exports = {
  siteName: 'Libro Rojo ETV',
  siteUrl: 'https://librorojoetv.netlify.com',
  siteDescription: 'El libro rojo de los ecosistemas terrestres de Venezuela evalúa el estado de conservación y los riesgos de colapso de los principales ecosistemas del país. El libro también describe las principales formaciones vegetales, asi como los estándares y métodos utilizados para las evaluaciónes efectuadas.',
  metadata: {
    twitterId: '@provita_ong',
    keywords: 'venezuela,conservation,ecology,ecosystems,red list,risk assessment,risk of collapse'
  },
  runtimeCompiler: true,
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/vcards/**/content.md',
        typeName: 'RiskCard',
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
          autolinkHeadings: false,
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
        typeName: 'RiskCardsIndex'
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
        typeName: 'UnitCardsIndex',
        remark:{
          autolinkHeadings: false,
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
        path: 'content/vegetation/**/content.md',
        typeName: 'VegetationCard',
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
    RiskCard: '/fichas/:title',
    UnitCard: '/unidades/:region',
    CaseCard: '/casos/:case',
    MethodCard: '/metodos/:id',
    VegetationCard: '/vegetacion/:id',
    References: '/bibliografia/:id'
  }
}
