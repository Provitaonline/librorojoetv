# Libro Rojo de los Ecosistemas Terrestres de Venezuela

This project is the source for the online version of the Red book of Venezuelan terrestrial ecosystems (Libro rojo de los ecosistemas terrestres de Venezuela).

The current version is in Spanish only.

## Development environment

The site is based on the [Gridsome](https://gridsome.org/) [Vue.js](https://vuejs.org/) framework.

## Development/deployment instructions

* Clone the repository
* ```npm install```
* Develop: ```npm run develop```; runs a development server; to access the application, point your browser to: ```http://localhost:8080```
* Build: ```npm run build```; the result is in the ```"dist"``` folder

## Directory structure

```
content - Site content files (markdown, images)

pimages - Preprocessed images

src - Source code (Gridsome application)

static - Static content copied directly onto "dist"
   admin - CMS configuration
   files - Downloadable files
   images - Placeholder for uploadable images
   mapdata - Geojson and topojson map data
```

## Licenses

The code is under [MIT license](https://opensource.org/licenses/MIT). The content (files in content, pimages, and static folders) is under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/).
