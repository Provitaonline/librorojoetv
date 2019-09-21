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
              <img :src="'/uploads/' + $page.vegetationCard.category + '-icon.svg'" height="40" width="40">
              <span style="display: block; font-size: x-small;"><b>{{siteConfig.criteria[$page.vegetationCard.category].toUpperCase()}}</b></span>
            </div>
          </div>
        </div>
      </section>
      <figure class="image is-4by3 is-fullwidth">
        <img :src="$page.vegetationCard.cardimage">
      </figure>
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
                  <img :src="$page.vegetationCard.distributionmap">
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
                    <VueCompareImage style="border-style: solid; border-color: black;" :leftImage="item.in2010" :rightImage="item.in1988" />
                  </div>
                </ClientOnly>
              </div>
              <div class="tile is-child is-6 box">
                <table align="center" class="statetable table is-size-6 is-size-7-mobile">
                  <thead>
                    <tr>
                      <th>Estado</th>
                      <th class="has-text-right">1988</th>
                      <th class="has-text-right">2010</th>
                      <th class="has-text-right">Diferencia</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in $page.vegetationCard.stateleveltable">
                      <td>{{item.state}}</td>
                      <td class="has-text-right">{{item.areain1988 | number}}</td>
                      <td class="has-text-right">{{item.areain2010 | number}}</td>
                      <td class="has-text-right">{{ (item.areain2010 - item.areain1988) | number}}</td>
                      <td :style="'color: ' + redOrGreen(item.areain1988 - item.areain2010) + ';'" class="has-text-right">{{ (item.areain1988 - item.areain2010) | upOrDown}}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
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
                <b>Riesgo de colapso a nivel nacional: </b>
                {{siteConfig.criteria[$page.vegetationCard.category].toUpperCase()}}
                <img :src="'/uploads/' + $page.vegetationCard.category + '-icon.svg'" height="30" width="30" style="margin-bottom: -5px;">
                <br><br>
                <b>Grado de amenaza 2010: </b>
                <div v-for="item in $page.vegetationCard.threatLevelMaps">
                  <br>
                  <img style="border-style: solid; border-color: black;" :src="item">
                </div>
              </div>
              <div v-if="$page.vegetationCard.riskofcolapsestatelevel.length" class="tile is-child is-6 box">
                <table align="center" class="table is-size-6 is-size-7-mobile">
                  <thead>
                    <tr>
                      <td></td>
                      <td class="has-text-centered" colspan="3"><b>Criterios</b></td>
                    </tr>
                    <tr>
                      <th>Estado</th>
                      <th>A3</th>
                      <th>A4</th>
                      <th>C2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in $page.vegetationCard.riskofcolapsestatelevel">
                      <td>{{item.state}}</td>
                      <td>
                        <b-tooltip :label="siteConfig.criteria[item.a3]" position="is-top" type="is-warning">
                          <div>
                            <img v-if="item.a3" :src="'/uploads/' + item.a3 + '-icon.svg'" height="30" width="30">
                          </div>
                        </b-tooltip>
                      </td>
                      <td>
                        <b-tooltip :label="siteConfig.criteria[item.a4]" position="is-top" type="is-warning">
                          <div>
                            <img v-if="item.a4" :src="'/uploads/' + item.a4 + '-icon.svg'" height="30" width="30">
                          </div>
                        </b-tooltip>
                      </td>
                      <td>
                        <b-tooltip :label="siteConfig.criteria[item.c2]" position="is-top" type="is-warning">
                          <div>
                            <img v-if="item.c2" :src="'/uploads/' + item.c2 + '-icon.svg'" height="30" width="30">
                          </div>
                        </b-tooltip>
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
      stateleveltable {
        state
        areain1988
        areain2010
      }
      mapcompare {
        in2010
        in1988
      }
      threatLevelMaps
      riskofcolapsestatelevel {
        state
        a3
        a4
        c2
      }
    }
  }
</page-query>

<style lang="scss" scoped>

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
