// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const fs = require('fs-extra')

module.exports = function (api) {
  api.loadSource(({ addContentType }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  })

  api.afterBuild(() => {
    console.log('After build... copy to: ', api.config.imagesDir)
    fs.copySync(api.config.imagesDir, './pimages')
  })
  api.beforeBuild(() => {
    console.log('Before build... move to: ', api.config.imageCacheDir)
    fs.moveSync('./pimages', api.config.imageCacheDir, { overwrite: true })
  })
}
