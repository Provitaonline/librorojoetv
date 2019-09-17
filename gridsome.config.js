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
        route: 'vcards/:title'
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
      use: 'gridsome-plugin-purgecss',
      options: {
  	     content: [
           './src/**/*.vue',
           './src/**/*.js',
           './src/**/*.jsx',
           './src/**/*.pug',
           './src/**/*.md'
        ],
	       defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      }
    }
  ]
}
