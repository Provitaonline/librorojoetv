<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd has-text-centered">
            <h1 class="title is-uppercase">{{$page.vegetationCard.title}}
            </h1>
            <h2 style="margin-bottom: 0px;" class="subtitle is-uppercase" v-if="$page.vegetationCard.plantformation">
              ({{$page.vegetationCard.plantformation}})
            </h2>
            <div class="categoryicon">
              <img :src="criteriaIcons[$page.vegetationCard.category]" height="50" width="50" />
              <span style="display: block; font-size: small;"><b>{{siteConfig.criteria[$page.vegetationCard.category].toUpperCase()}}</b></span>
            </div>
          </div>
        </div>
      </section>
      <div class="has-text-centered">
        <g-image v-if="$page.vegetationCard.cardimage" :src="$page.vegetationCard.cardimage" fit="inside" />
      </div>
      <figcaption class="has-text-centered"><div class="is-size-6" v-html="$page.vegetationCard.cardimagecaption"></div></figcaption>
      <section class="section">
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-parent">
            <div class="section-header box is-size-3 has-text-weight-bold has-text-centered">Descripción</div>
            <div class="tile is-parent">
              <div class="tile is-child box is-size-5">
                <p v-html="$page.vegetationCard.description" />
              </div>
            </div>
            <div class="section-header box is-size-3 has-text-weight-bold has-text-centered">Distribución</div>
            <div class="tile is-parent">
              <div class="tile is-child box is-size-5">
                <div>
                  <g-image style="float: right;" v-if="$page.vegetationCard.distributionmap" :src="$page.vegetationCard.distributionmap" />
                  <p style="margin: 0;" v-html="$page.vegetationCard.distribution"></p>
                </div>
              </div>
            </div>
            <br>
            <div class="section-header box is-size-3 has-text-weight-bold has-text-centered">Cambios en la distribución</div>
            <div class="tile is-parent">
              <div class="tile is-child is-6 box">
                <b>Superficie en 1988 (km<sup>2</sup>): </b>{{$page.vegetationCard.areain1988 | number}}<br>
                <b>Superficie en 2010 (km<sup>2</sup>): </b>{{$page.vegetationCard.areain2010 | number}}<br>
                <ClientOnly>
                  <div v-for="item in $page.vegetationCard.mapcompare">
                    <br>
                    <VueCompareImage v-if="item.in2010" style="border-style: solid; border-color: dimgrey;" :leftImage="item.in2010.src" :rightImage="item.in1988.src" />
                  </div>
                </ClientOnly>
                <div v-if="$page.vegetationCard.interventionlegendimage"><br><span class="intervention-legend-item" :style="'background-image: url(' + $page.vegetationCard.interventionlegendimage.src + ');'"></span> Áreas intervenidas</div>
              </div>
              <div class="tile is-child is-6 box">
                <table align="center" class="statetable table is-size-6 is-size-7-mobile">
                  <thead>
                    <tr>
                      <th v-if="$page.vegetationCard.formationColumn">Formación</th>
                      <th>Estado</th>
                      <th class="has-text-right">1988</th>
                      <th class="has-text-right">2010</th>
                      <th class="has-text-right">Diferencia</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in $page.vegetationCard.stateleveltable">
                      <td v-if="$page.vegetationCard.formationColumn">{{item.formation}}</td>
                      <td>{{item.state}}</td>
                      <td class="has-text-right">{{item.areain1988 | number}}</td>
                      <td class="has-text-right">{{item.areain2010 | number}}</td>
                      <td class="has-text-right">{{ (item.areain2010 - item.areain1988) | number}}</td>
                      <td :style="'color: ' + redOrGreen(item.areain1988 - item.areain2010) + ';'" class="has-text-right">{{ (item.areain1988 - item.areain2010) | upOrDown}}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td v-if="$page.vegetationCard.formationColumn"></td>
                      <th>Total</th>
                      <th class="has-text-right">{{($page.vegetationCard.stateleveltable.reduce((a, b) => +a + +b.areain1988, 0)) | number}}</th>
                      <th class="has-text-right">{{($page.vegetationCard.stateleveltable.reduce((a, b) => +a + +b.areain2010, 0)) | number}}</th>
                      <th class="has-text-right">{{($page.vegetationCard.stateleveltable.reduce((a, b) => +a + +b.areain2010, 0)) - ($page.vegetationCard.stateleveltable.reduce((a, b) => +a + +b.areain1988, 0)) | number}}</th>
                      <th></th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div class="section-header box is-size-3 has-text-weight-bold has-text-centered">Situación a 2010</div>
            <div class="tile is-parent">
              <div class="tile is-child is-6 box">
                <b>Riesgo de colapso a nivel nacional: </b>
                {{siteConfig.criteria[$page.vegetationCard.category].toUpperCase()}}
                <img :src="criteriaIcons[$page.vegetationCard.category]" height="30" width="30" style="margin-bottom: -5px;">
                <br><br>
                <b>Grado de amenaza 2010: </b>
                <div v-for="item in $page.vegetationCard.threatLevelMaps">
                  <br>
                  <img v-if="item" style="border-style: solid; border-color: dimgrey;" :src="item.src">
                </div>
              </div>
              <div v-if="$page.vegetationCard.riskofcolapsestatelevel.length" class="tile is-child is-6 box">
                <div class="has-text-centered"><b>Riesgo de colapso por {{($page.vegetationCard.zonelabel).toLowerCase()}}:</b><br><br></div>
                <table align="center" class="risktable table is-size-6 is-size-7-mobile">
                  <thead>
                    <tr>
                      <th v-if="$page.vegetationCard.formationColumn"></th>
                      <th></th>
                      <th align="center" :colspan="$page.vegetationCard.criteriaused.length - 1"><b>Criterios</b></th>
                      <th></th>
                    </tr>
                    <tr>
                      <th v-if="$page.vegetationCard.formationColumn">Formación</th>
                      <th>{{$page.vegetationCard.zonelabel}}</th>
                      <th v-for="value in $page.vegetationCard.criteriaused" align="center">{{value}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in $page.vegetationCard.riskofcolapsestatelevel">
                      <td v-if="$page.vegetationCard.formationColumn">{{item.formation}}</td>
                      <td>{{item.zone}}</td>
                      <td v-if="item.area" class="has-text-right">{{item.area | decimal(1)}}</td>
                      <td align="center" v-for="value in item.criteria">
                        <b-tooltip v-if="value != '-' && value != '(*)'" :label="siteConfig.criteria[value]" position="is-top" type="is-warning">
                          <div class="iconInTable">
                            <img :src="criteriaIcons[value]">
                          </div>
                        </b-tooltip>
                        <div v-else>{{value}}</div>
                      </td>

                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<page-query>
  query VegetationCard ($path: String!) {
    vegetationCard: vegetationCard (path: $path) {
      title
      plantformation
      category
      description
      cardimage
      cardimagecaption
      distribution
      distributionmap
      areain1988
      areain2010
      formationColumn
      stateleveltable {
        formation
        state
        areain1988
        areain2010
      }
      mapcompare {
        in2010
        in1988
      }
      interventionlegendimage
      threatLevelMaps
      zonelabel
      criteriaused
      riskofcolapsestatelevel {
        formation
        zone
        area
        criteria
      }
    }
  }
</page-query>

<style lang="scss" scoped>

  $primary: #BE1421; /* Remove this after figuring out how to global scss vars */

  @media only screen and (max-width: 1024px) {
    .statetable {
      font-size: 0.8em !important;
    }
  }

  @media only screen and (max-width: 400px) {
    .statetable, .risktable  {
      font-size: 0.5em !important;
    }
    .statetable td, th {
      padding: 1px;
    }

    .iconInTable {
      width: 18px !important;
      height: 18px !important;
    }
  }

  @media only screen and (min-width: 800px) {
    .categoryicon {
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }

  .iconInTable {
    width: 30px;
    height: 30px;
  }

  .risktable tbody > tr > td:nth-last-child(2), .risktable thead > tr > th:nth-last-child(2) {
    border-right: solid $primary 2px;
  }

  .risktable tbody > tr > td:first-child, .risktable thead > tr > th:first-child {
    border-left: solid $primary 2px;
  }

  .risktable tbody > tr:last-child > td {
    border-bottom: solid $primary 2px;
  }

  .risktable thead > tr:first-child > th {
    border-top: solid $primary 2px;
  }

  .risktable tbody > tr:last-child > td:last-child {
    border-bottom: 0;
  }

  .risktable thead > tr:first-child > th:last-child {
    border-top: 0;
  }

  .intervention-legend-item {
    height: 12px;
    width: 14px;
    display: inline-block;
  }

  .section-header {
    background-color: #f8e7e8;
  }

</style>

<style lang="scss">
  .handle {
    border: 2px solid gray !important;
  }

  .right-arrow {
    border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) gray !important;
  }

  .left-arrow {
    border-color: rgba(0, 0, 0, 0) gray rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) !important;
  }

  .line {
    background: gray !important;
  }

</style>


<script>

  import siteConfig from '~/data/siteConfig.json'

  let criteriaIcons = {}
  for (let key in siteConfig.criteria) {
    criteriaIcons[key] = require('~/assets/svgs/' + key + '-icon.svg')
  }

  export default {
    data() {
      return {
        siteConfig: siteConfig,
        criteriaIcons: criteriaIcons
      }
    },
    mounted () {

    },
    filters: {
      number: function(value) {
        if (!value) return ''
        return parseInt(value).toLocaleString('de-DE', {style: 'decimal', localeMatcher: 'best fit'})
      },
      decimal: function(value, decimals) {
        if (!value) return ''
        return Number(value).toLocaleString('de-DE', {style: 'decimal', minimumFractionDigits: decimals})
        //return parseFloat(value).toFixed(decimals).toLocaleString('es-VE', {style: 'decimal'})
      },
      upOrDown: function(value) {
        if (!value) return ''
        if (value === 0) return ''
        return (value < 0) ? '▲' : '▼'
      }
    },
    components: {
        VueCompareImage: () => import ('vue-compare-image').then(m => m)
        //vuIcon
    },
    methods: {
      redOrGreen: function(value) {
        if (!value) return ''
        return (value < 0) ? 'green' : 'red'
      }
    }
  }
</script>
