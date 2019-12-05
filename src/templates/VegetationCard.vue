<template>
  <Layout>
    <SideBar>
      <template v-slot:title>
        <p class="is-size-4 has-text-weight-bold has-text-centered" style="padding: 20px;">Formaciones vegetales</p>
      </template>
      <template v-slot:sidebar>
        <div class="box">
          <div v-for="item, index in $page.vegetationCardsIndex.legendItems">
            <div>
              <p class="side-panel-item-title" v-if="isTitle(index)">
                <b>{{item.plantformation}}</b>
              </p>
              <div class="side-panel-item-box side-panel-item">
                <span v-if="item.plantformation">&nbsp;&nbsp;&nbsp;</span>
                <g-link v-if="getTargetSlug(item) != currentSlug" :to="pathParent + '/' + getTargetSlug(item)">{{item.name}}</g-link>
                <span v-else><b><i>{{item.name}}</i></b></span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <section class="hero is-small is-white">
          <div class="hero-body">
            <div class="container is-fullhd has-text-centered">
              <div class="container" style="width: 78%;">
                <g-link to="/vcards" class="is-uppercase is-size-6">Riesgo de colapso</g-link>
                <p v-if="$page.vegetationCard.plantformation" style="margin-bottom: 0;" class="title is-uppercase is-size-4-mobile">{{$page.vegetationCard.plantformation}}</p>
                <p v-else class="title is-uppercase is-size-4-mobile">
                  <span v-if="$page.vegetationCard.formattedtitle" v-html="$page.vegetationCard.formattedtitle"></span>
                  <span v-else v-html="$page.vegetationCard.title"></span>
                </p>
                <p style="margin-bottom: 0px;" class="is-size-3 is-size-4-mobile" v-if="$page.vegetationCard.plantformation">
                  (<span v-if="$page.vegetationCard.formattedtitle" v-html="$page.vegetationCard.formattedtitle"></span>
                  <span v-else v-html="$page.vegetationCard.title"></span>)
                </p>
              </div>
              <div class="categoryicon">
                <img :src="threatCategories[$page.vegetationCard.category].img" height="50" width="50" />
                <p style="display: block; font-size: small;"><b>{{threatCategories[$page.vegetationCard.category].text.toUpperCase()}}</b></p>
              </div>
            </div>
          </div>
        </section>
        <div class="has-text-centered">
          <g-image v-if="$page.vegetationCard.cardimage" :src="$page.vegetationCard.cardimage" fit="inside" />
        </div>
        <figcaption class="has-text-centered"><div class="is-size-6 is-size-7-mobile" v-html="$page.vegetationCard.cardimagecaption"></div></figcaption>
        <section class="section">
          <div class="tile is-ancestor">
            <div class="tile is-vertical is-parent">
              <div class="section-header box is-size-3 is-size-4-mobile has-text-weight-bold has-text-centered">Descripción</div>
              <div class="tile is-parent">
                <div class="tile is-child box is-size-5 is-size-6-mobile">
                  <TextWithRefsAndPhotos
                    :text="$page.vegetationCard.description"
                    :refs="$page.references.references"
                    :photos="$page.vegetationCard.photos">
                  </TextWithRefsAndPhotos>
                </div>
              </div>
              <div class="section-header box is-size-3 is-size-4-mobile has-text-weight-bold has-text-centered">Distribución</div>
              <div class="tile is-parent">
                <div class="tile is-child box is-size-5 is-size-6-mobile">
                  <div>
                    <div class="distribution-map">
                      <p class="is-size-7 has-text-centered has-text-weight-bold">{{$page.vegetationCard.title}}<br>Distribución en 2010</p>
                      <g-image v-if="$page.vegetationCard.distributionmap" :src="$page.vegetationCard.distributionmap" />
                      <p class="is-size-7 has-text-right"><i>Huber y Oliveira-Miranda (2010)</i></p>
                    </div>
                    <TextWithRefsAndPhotos
                      :text="$page.vegetationCard.distribution"
                      :refs="$page.references.references"
                      :photos="$page.vegetationCard.photos">
                    </TextWithRefsAndPhotos>
                  </div>
                </div>
              </div>
              <br>
              <div v-if="$page.vegetationCard.areain2010" class="section-header box is-size-3 is-size-4-mobile has-text-weight-bold has-text-centered">Cambios en la distribución</div>
              <div v-if="$page.vegetationCard.areain2010" class="tile is-parent">
                <div class="tile is-child is-5 box is-size-6 has-text-centered">
                  <b>Superficie en 1988 (km<sup>2</sup>): </b>{{$page.vegetationCard.areain1988 | number}}<br>
                  <b>Superficie en 2010 (km<sup>2</sup>): </b>{{$page.vegetationCard.areain2010 | number}}<br>
                  <span class="is-size-7"><b>(Figuras 1a y 1b)</b></span>
                  <ClientOnly>
                    <div v-for="item in $page.vegetationCard.mapcompare">
                      <br>
                      <div class="has-text-centered is-size-7 has-text-weight-bold" >{{item.caption}}</div>
                      <VueCompareImage v-if="item.in2010" style="border-style: solid; border-color: dimgrey;" :leftImage="item.in1988.src" leftLabel="1988" :rightImage="item.in2010.src" rightLabel="2010" />
                      <div style="padding-top: 8px;">
                        <div v-for="il in item.interventionlegend" style="float: left;" class="has-text-left is-size-7">
                          <span class="intervention-legend-item" :style="'background-image: url(' + il.image.src + ');'"></span>
                          <span style="padding-left: 4px; padding-right: 4px;">{{il.text}}</span>
                        </div>
                        <br>
                      </div>
                    </div>
                  </ClientOnly>
                </div>
                <div v-if="$page.vegetationCard.stateleveltable.length" class="tile is-child is-7 box">
                  <div class="has-text-centered is-size-6 has-text-weight-bold">Superficie estimada (km<sup>2</sup>) por estado:<br>
                    <span class="is-size-7"><b>(Tabla 1)</b></span>
                    <br><br>
                  </div>
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
                        <td v-if="$page.vegetationCard.formationColumn"><b>{{item.formation}}</b></td>
                        <td>{{item.state}}</td>
                        <td class="has-text-right">{{item.areain1988 | number}}</td>
                        <td class="has-text-right">{{item.areain2010 | number}}</td>
                        <td class="has-text-right">{{ (difference(item.areain2010,item.areain1988)) | number}}</td>
                        <td :style="'color: ' + redOrGreen(item.areain1988 - item.areain2010) + ';'" class="has-text-right">{{ (item.areain1988 - item.areain2010) | upOrDown}}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td v-if="$page.vegetationCard.formationColumn"></td>
                        <th>Total</th>
                        <th class="has-text-right">{{($page.vegetationCard.stateleveltable.reduce((a, b) => +a + +numbernobrackets(b.areain1988), 0)) | number}}</th>
                        <th class="has-text-right">{{($page.vegetationCard.stateleveltable.reduce((a, b) => +a + +numbernobrackets(b.areain2010), 0)) | number}}</th>
                        <th class="has-text-right">{{($page.vegetationCard.stateleveltable.reduce((a, b) => +a + +numbernobrackets(b.areain2010), 0)) - ($page.vegetationCard.stateleveltable.reduce((a, b) => +a + +numbernobrackets(b.areain1988), 0)) | number}}</th>
                        <th></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div class="section-header box is-size-3 is-size-4-mobile has-text-weight-bold has-text-centered">Situación a 2010</div>
              <div class="tile is-parent">
                <div class="tile is-child is-5 box has-text-centered">
                  <b>Riesgo de colapso a nivel nacional: </b>
                  {{threatCategories[$page.vegetationCard.category].text.toUpperCase()}}
                  <img :src="threatCategories[$page.vegetationCard.category].img" height="30" width="30" style="margin-bottom: -5px;">
                  <br><br>
                  <b>Grado de amenaza 2010: </b><br>
                  <span class="is-size-7"><b>(Figura 1c)</b></span>
                  <div v-for="item in $page.vegetationCard.threatlevelmaps">
                    <br>
                    <div class="has-text-centered is-size-7 has-text-weight-bold" >{{item.caption}}</div>
                    <g-image v-if="item" style="border-style: solid; border-color: dimgrey;" :src="item.map"></g-image>
                    <div>
                      <div v-for="tl in item.threatcategories" style="float: left;" class="has-text-left is-size-7">
                        <span class="legend-item" :style="'background:' + threatCategories[tl].color"></span>
                        <span style="padding-left: 4px; padding-right: 4px;"> {{threatCategories[tl].text}}</span>
                      </div>
                      <br>
                    </div>
                  </div>
                </div>
                <div v-if="$page.vegetationCard.riskofcolapsestatelevel.length" class="tile is-child is-7 box">
                  <div class="has-text-centered"><b>Riesgo de colapso por {{($page.vegetationCard.zonelabel).toLowerCase()}}:</b><br>
                    <span class="is-size-7"><b>(Tabla 2)</b></span>
                    <br><br>
                  </div>
                  <table align="center" class="risktable table is-size-6 is-size-7-mobile">
                    <thead>
                      <tr>
                        <th v-if="$page.vegetationCard.formationColumn"></th>
                        <th></th>
                        <th align="center" :colspan="$page.vegetationCard.criteriaused.length - 1">
                          <!-- <b-tooltip position="is-top" type="is-warning" label="Versión v1.0, 2010"> -->
                            <b>Criterios</b>
                          <!-- </b-tooltip> -->
                        </th>
                        <th></th>
                      </tr>
                      <tr>
                        <th v-if="$page.vegetationCard.formationColumn">Formación</th>
                        <th>{{$page.vegetationCard.zonelabel}}</th>
                        <th v-for="value in $page.vegetationCard.criteriaused" align="center">
                          <b-dropdown v-if="criteria[value]" class="criteria-box" position="is-bottom-left">
                            <a slot="trigger">
                              <span v-html="value"></span>&nbsp;<font-awesome size="xs" :icon="['fas', 'angle-down']"/>
                            </a>
                            <b-dropdown-item class="has-text-weight-normal has-text-left" custom>
                              <div class="has-text-weight-bold has-text-centered">Criterio {{value}}<br><br></div>
                              <span class="has-text-weight-medium">{{criteria[value.charAt(0)]}}</span>
                              <span v-if="value.length>1"><br><br>{{criteria[value]}}</span>
                              <small><br><br>Versión:v 1.0</small>
                            </b-dropdown-item>
                          </b-dropdown>
                          <span v-else v-html="value"></span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in $page.vegetationCard.riskofcolapsestatelevel">
                        <td v-if="$page.vegetationCard.formationColumn"><b>{{item.formation}}</b></td>
                        <td>{{item.zone}}</td>
                        <td v-if="item.area" class="has-text-right">{{item.area | decimal(1)}}</td>
                        <td align="center" v-for="value in item.threatcategories">
                          <b-tooltip v-if="threatCategories[value]" :label="threatCategories[value] ? threatCategories[value].text : ''" position="is-top" type="is-warning">
                            <div class="iconInTable">
                              <img :src="threatCategories[value].img">
                            </div>
                          </b-tooltip>
                          <div v-else>{{value}}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div v-if="$page.vegetationCard.content != '\n'" v-show="!showMore" class="container is-size-5 has-text-centered">
                <a @click="showMore = true"><p>LEER MÁS...<font-awesome :icon="['fas', 'angle-down']"/></p></a>
              </div>
              <div v-show="showMore" class="tile is-parent">
                <!-- <div class="d-content tile is-child is-size-5" v-html="$page.vegetationCard.content"></div> -->
                <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
                  :text="$page.vegetationCard.content"
                  :refs="$page.references.references"
                  :photos="$page.vegetationCard.photos"
                  :isContent="true" />
                </TextWithRefsAndPhotos>
              </div>
            </div>
          </div>
        </section>
      </template>
    </SideBar>
  </Layout>
</template>

<page-query>
  query VegetationCard ($path: String!) {
    vegetationCard: vegetationCard (path: $path) {
      title
      formattedtitle
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
        caption
        interventionlegend {
          image
          text
        }
      }
      threatlevelmaps {
        map
        caption
        threatcategories
      }
      zonelabel
      criteriaused
      riskofcolapsestatelevel {
        formation
        zone
        area
        threatcategories
      }
      photos {
        photokey
        photourl
        photocaption
      }
      content
    }
    references: references (id: "vcards") {
      references {
        referencekey
        reference
      }
    }
    vegetationCardsIndex: vegetationCardsIndex (path: "/content/vcards-index") {
    	legendItems {
        name
        group
        color
        legend
        cardPath
        plantformation
      }
    }
  }
</page-query>

<style lang="scss" scoped>

  @import "~/assets/style/_variables";

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
      margin-top: -15px;
    }
  }

  .iconInTable {
    width: 30px;
    height: 30px;
  }

  .risktable {
    border: solid $primary 2px;
    border-collapse: separate;
  }

  .intervention-legend-item {
    height: 12px;
    width: 14px;
    display: inline-block;
  }

  @media only screen and (min-width: 769px) {
    .distribution-map {
      width: 50%;
      float: right;
    }
  }

  .legend-item {
    margin-bottom: -1.5px;
    height: 12px;
    width: 20px;
    display: inline-block;
  }

  ::v-deep .handle {
    border: 2px solid gray !important;
  }

  ::v-deep .right-arrow {
    border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) gray !important;
  }

  ::v-deep .left-arrow {
    border-color: rgba(0, 0, 0, 0) gray rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) !important;
  }

  ::v-deep .line {
    background: gray !important;
  }

  ::v-deep .left-label, ::v-deep .right-label {
    font-weight: bold;
  }

  .page-wrapper {
    display: flex;
    /*padding-left: 0px;
    padding-right: 0px;*/
  }

  .side-panel-item, .side-panel-item-title {
    padding: 8px;
  }

  .side-panel-item:hover {
    background-color: #fafafa;
  }

  .side-panel-item-box {
    display: flex;
    box-sizing: border-box;
  }

  ::v-deep .criteria-box>.dropdown-menu {
    min-width: 30em;
  }

</style>

<script>

  import {threatCategories, criteria} from '~/assets/js/siteConfig.js'
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'
  import SideBar from '~/components/SideBar.vue'
  import slugify from 'slugify'

  slugify.extend({'/': '-'})

  export default {
    created() {

    },
    data() {
      return {
        threatCategories: threatCategories,
        criteria: criteria,
        showMore: false,
        currentSlug: null,
        pathParent: null
      }
    },
    mounted () {
      this.pathParent = this.$route.path.replace(/\/$/, '').replace(/\/[^\/]+$/,'')
    },
    beforeRouteUpdate (to, from, next) {
      this.currentSlug = to.path.replace(/\/$/, '').match(/\/[^\/]+$/)[0].substring(1)
      next()
    },
    updated() {
      console.log('hola')
      this.currentSlug = this.$route.path.replace(/\/$/, '').match(/\/[^\/]+$/)[0].substring(1)
    },
    filters: {
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
      VueCompareImage: () => import ('vue-compare-image').then(m => m),
      TextWithRefsAndPhotos,
      SideBar
    },
    methods: {
      redOrGreen: function(value) {
        if (!value) return ''
        return (value < 0) ? 'green' : 'red'
      },
      difference: function (a, b) {
        a = (a === null ? '' : a)
        b = (b === null ? '' : b)
        return a.replace(/[\<\>]/g, '') - b.replace(/[\<\>]/g, '')
      },
      numbernobrackets: function (a) {
        a = (a === null ? '' : a)
        return Number(a.replace(/[\<\>]/g, ''))
      },
      slugify: function(t) {
        return slugify(t, {lower: true})
      },
      getTargetSlug: function(t) {
        return t.cardPath ? slugify(t.cardPath, {lower: true}) : slugify(t.name, {lower: true})
      },
      isTitle: function(i) {
        let pf = this.$page.vegetationCardsIndex.legendItems[i].plantformation
        if (pf) {
          if (i > 0) {
            return (pf === this.$page.vegetationCardsIndex.legendItems[i-1].plantformation) ? false : true
          } else {
            return true
          }
        }
        return false
      }
    }
  }
</script>
