// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addContentType }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api
    store.addMetaData('siteUrl', api.config.siteUrl)
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  })
}

function useProcessedImages (api, options) {
  const fs = require('fs-extra')
  const { info } = require('gridsome/lib/utils/log')
  api.afterBuild(() => {
    info(`After build... copy ${api.config.imagesDir} to  ./${options.processedImagesDir}`)
    fs.copySync(api.config.imagesDir, './' + options.processedImagesDir)
  })
  api.beforeBuild(() => {
    info(`Before build... move ./${options.processedImagesDir} to: ${api.config.imageCacheDir}`)
    fs.moveSync('./' + options.processedImagesDir, api.config.imageCacheDir, { overwrite: true })
  })
}

useProcessedImages.defaultOptions = () => ({
  processedImagesDir: 'pimages' // Relative to project root
})

module.exports = useProcessedImages
