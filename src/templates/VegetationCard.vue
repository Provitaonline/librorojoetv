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
              <img :src="'/images/' + $page.vegetationCard.category + '-icon.svg'" height="40" width="40">
              <span style="display: block; font-size: x-small;"><b>{{siteConfig.criteria[$page.vegetationCard.category].toUpperCase()}}</b></span>
            </div>
          </div>
        </div>
      </section>
      <div class="has-text-centered">
        <g-image v-if="$page.vegetationCard.cardimage" :src="$page.vegetationCard.cardimage" fit="inside" />
      </div>
      <figcaption class="has-text-centered"><small>{{$page.vegetationCard.cardimagecaption}}</small></figcaption>
      <section class="section">
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-parent">
            <div class="is-size-4 is-uppercase has-text-weight-semibold has-text-centered">Descripción</div>
            <div class="tile is-parent">
              <div class="tile is-child box">
                <p v-html="$page.vegetationCard.description" />
              </div>
            </div>
            <div class="is-size-4 is-uppercase has-text-weight-semibold has-text-centered">Distribución</div>
            <div class="tile is-parent">
              <div class="tile is-child is-7 box">
                <p v-html="$page.vegetationCard.distribution" />
              </div>
              <div class="tile is-child is-5 box">
                <figure class="image is-4by3">
                  <img :src="$page.vegetationCard.distributionmap.src">
                </figure>
              </div>
            </div>
            <div class="is-size-4 is-uppercase has-text-weight-semibold has-text-centered">Cambios en la distribución</div>
            <div class="tile is-parent">
              <div class="tile is-child is-6 box">
                <b>Superficie en 1988 (km<sup>2</sup>): </b>{{$page.vegetationCard.areain1988 | number}}<br>
                <b>Superficie en 2010 (km<sup>2</sup>): </b>{{$page.vegetationCard.areain2010 | number}}<br>
                <ClientOnly>
                  <div v-for="item in $page.vegetationCard.mapcompare">
                    <br>
                    <VueCompareImage style="border-style: solid; border-color: dimgrey;" :leftImage="item.in2010.src" :rightImage="item.in1988.src" />
                  </div>
                </ClientOnly>
                <br><span class="intervention-legend-item" :style="'background-image: url(' + $page.vegetationCard.interventionlegendimage.src + ');'"></span> Areas intervenidas
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
            <div class="is-size-4 is-uppercase has-text-weight-semibold has-text-centered">Situación a 2010</div>
            <div class="tile is-parent">
              <div class="tile is-child is-6 box">
                <b >Riesgo de colapso a nivel nacional: </b>
                {{siteConfig.criteria[$page.vegetationCard.category].toUpperCase()}}
                <img :src="'/images/' + $page.vegetationCard.category + '-icon.svg'" height="30" width="30" style="margin-bottom: -5px;">
                <br><br>
                <b>Grado de amenaza 2010: </b>
                <div v-for="item in $page.vegetationCard.threatLevelMaps">
                  <br>
                  <img style="border-style: solid; border-color: dimgrey;" :src="item.src">
                </div>
              </div>
              <div v-if="$page.vegetationCard.riskofcolapsestatelevel.length" class="tile is-child is-6 box">
                <div class="has-text-centered"><b>Riesgo de colapso por estado:</b><br><br></div>
                <table align="center" class=" risktable table is-size-6 is-size-7-mobile">
                  <thead>
                    <tr>
                      <th v-if="$page.vegetationCard.formationColumn"></th>
                      <th></th>
                      <th align="center" :colspan="$page.vegetationCard.criteriaused.length - 1"><b>Criterios</b></th>
                      <th></th>
                    </tr>
                    <tr>
                      <th v-if="$page.vegetationCard.formationColumn">Formación</th>
                      <th>Estado</th>
                      <th v-for="value in $page.vegetationCard.criteriaused" align="center">{{value}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in $page.vegetationCard.riskofcolapsestatelevel">
                      <td v-if="$page.vegetationCard.formationColumn">{{item.formation}}</td>
                      <td>{{item.state}}</td>

                      <td align="center" v-for="value in item.criteria">
                        <b-tooltip v-if="value != '-'" :label="siteConfig.criteria[value]" position="is-top" type="is-warning">
                          <div>
                            <img :src="'/images/' + value + '-icon.svg'" height="30" width="30">
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
      criteriaused
      riskofcolapsestatelevel {
        formation
        state
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
    .statetable {
      font-size: 0.6em !important;
    }
    .statetable td, th {
      padding: 2px;
    }
  }

  @media only screen and (min-width: 800px) {
    .categoryicon {
      position: absolute;
      right: 0px;
      top: 0px;
    }
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

  export default {
    data() {
      return {
        siteConfig: siteConfig
      }
    },
    filters: {
      number: function(value) {
        if (!value) return ''
        return parseInt(value).toLocaleString('de', {style: 'decimal'})
      },
      upOrDown: function(value) {
        if (!value) return ''
        if (value === 0) return ''
        return (value < 0) ? '▲' : '▼'
      }
    },
    components: {
        VueCompareImage: () => import ('vue-compare-image').then(m => m)
    },
    methods: {
      redOrGreen: function(value) {
        if (!value) return ''
        return (value < 0) ? 'green' : 'red'
      }
    }
  }
</script>
