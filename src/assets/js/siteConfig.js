'use strict'

export const threatCategories = {
  el: {
    text: 'Eliminado',
    color: '#AD322A',
    img: require('../svgs/el-icon.svg')
  },
  cr: {
    text: 'En Peligro Crítico',
    color: '#DE6124',
    img: require('../svgs/cr-icon.svg')
  },
  en: {
    text: 'En Peligro',
    color: '#F8941E',
    img: require('../svgs/en-icon.svg')
  },
  vu: {
    text: 'Vulnerable',
    color: '#FFD979',
    img: require('../svgs/vu-icon.svg')
  },
  nt: {
    text: 'Casi Amenazado',
    color: '#77C151',
    img: require('../svgs/nt-icon.svg')
  },
  lc: {
    text: 'Preocupación Menor',
    color: '#00B7B1',
    img: require('../svgs/lc-icon.svg')
  },
  dd: {
    text: 'Datos Insuficientes',
    color: '#00BAF1',
    img: require('../svgs/dd-icon.svg')
  },
  ne: {
    text: 'No Evaluado',
    color: '#0068B4',
    img: require('../svgs/ne-icon.svg')
  }
}
