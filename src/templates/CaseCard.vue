<template>
  <Layout>
    <SideBar>
      <template v-slot:title>
        <p class="is-size-4 has-text-weight-bold" style="padding: 20px;">Estudios de caso</p>
      </template>
      <template v-slot:sidebar>
        <div class="box">
          <div v-for="item, index in $page.casesIndex.legendItems">
            <div>
              <div class="side-panel-item-box side-panel-item">
                <g-link v-if="item.cardPath != $route.path.replace(/\/$/, '').match(/\/[^\/]+$/)[0].substring(1)" :to="'/casos/' + item.cardPath">{{item.label}}</g-link>
                <span v-else><b><i>{{item.label}}</i></b></span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <div class="red-line">
          <section class="hero is-small is-white">
            <div class="hero-body">
              <div class="container is-fullhd has-text-centered">
                <g-link to="/casos" class="is-uppercase is-size-6">Estudios de caso</g-link>
              </div>
            </div>
          </section>
          <div>
            <g-image v-if="$page.caseCard.cardimage" :src="$page.caseCard.cardimage" fit="inside" />
          </div>
          <figcaption style="padding-left: 12px;"><div class="is-size-6 is-size-7-mobile" v-html="$page.caseCard.cardimagecaption"></div></figcaption>
          <div class="columns section is-size-6 is-size-7-mobile" style="margin-bottom: -96px;">
            <div class="column card-title">
              <p class="title is-uppercase is-size-4-mobile">{{$page.caseCard.title}}</p>
              <p>{{$page.caseCard.authors}}</p>
            </div>
            <div class="column is-narrow">
              <div class="card summary-box" style="box-shadow: none; border-style: solid;">
                <header class="card-header">
                  <p class="card-header-title">
                    Paisaje vegetal:&nbsp;<span v-html="$page.caseCard.landscapeunits"></span>
                  </p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <b>Localidad:</b>&nbsp;<span v-html="$page.caseCard.locality"></span><br>
                    <b>Estados:</b> {{$page.caseCard.states}}<br>
                    <b>Área aprox.: </b>
                      <span v-if="$page.caseCard.areatext" v-html="$page.caseCard.areatext"><br></span>
                      <span v-else>{{$page.caseCard.area | number}} km<sup>2</sup><br></span>
                  </div>
                  <div :class='$page.caseCard.enableTableScroll ? "table-container" : ""'>
                    <table align="center" class="table is-size-6 is-size-7-mobile">
                      <thead>
                        <tr>
                          <th v-for="value in $page.caseCard.cardtablecolumns" style="border: none;">{{value}}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="value in $page.caseCard.cardtablerows">
                          <td v-for="item in value.split('|')">
                            <div v-if="xtractedIcon(item)" style="display: flex;">
                              <div :style='$page.caseCard.leftJustifyIcons ? "" : "margin: auto;"'>
                                <b-tooltip :label="xtractedIcon(item).text" position="is-top" type="is-warning">
                                  <div class="iconInTable" style="display: inline-block">
                                    <img :src="xtractedIcon(item).img">
                                  </div>
                                </b-tooltip>
                              </div>
                              <div style="margin-top: auto; margin-bottom: auto;">
                                <span>&nbsp;{{iconText(item)}}</span>
                              </div>
                            </div>
                            <div v-else v-html="item"></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section class="section">
            <div class="tile is-vertical is-parent">
              <TextWithRefsAndPhotos style="padding-bottom: 0px; margin-bottom: 0px !important;" class="tile is-child box is-size-5 is-size-6-mobile"
                :text="$page.caseCard.content"
                :refs="$page.caseCard.case.references"
                :photos="$page.caseCard.photos"
                :isContent="true">
              </TextWithRefsAndPhotos>
              <div class="container is-size-5 has-text-centered">
                <a @click="showMore = !showMore">
                  <p v-if="!showMore">VER BIBLIOGRAFÍA...<font-awesome :icon="['fas', 'angle-down']"/></p>
                  <p v-else>OCULTAR BIBLIOGRAFÍA...<font-awesome :icon="['fas', 'angle-up']"/></p>
                  <br>
                </a>
              </div>
              <transition name="fade" appear>
                <div v-if="showMore" style="padding-top: 0px;" class="tile is-child box is-size-6 is-size-7-mobile">
                  <h1 style="margin-top: 0px;">Bibliografía</h1>
                  <table class="table">
                    <tbody>
                      <tr v-for="value in sortedReferences">
                        <td>{{value.reference}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </transition>
            </div>
          </section>
        </div>
      </template>
    </SideBar>
  </Layout>
</template>

<page-query>
  query CaseCard ($path: String!) {
    caseCard: caseCard (path: $path) {
      title
      authors
      content
      cardimage
      landscapeunits
      locality
      states
      area
      areatext
      cardtablecolumns
      cardtablerows
      leftJustifyIcons
      enableTableScroll
      case {
        references {
          referencekey
          reference
        }
      }
      photos {
        photokey
        photourl
        photocaption
      }
    }
    casesIndex: casesIndex (path: "/content/explore/cases-index") {
      title
      mapTitle
      legendItems {
        name
        label
        group
        color
        legend
        cardPath
      }
    }
  }
</page-query>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  .iconInTable {
    width: 30px;
    height: 30px;
  }

  .card-header-title {
    padding-left: 24px;
    padding-rigth: 24px;
    background-color: #f8e7e8;
  }

  @media only screen and (min-width: 769px) {
    .summary-box {
      margin-top: -12rem;
      max-width: 450px;
    }
  }

  @media only screen and (max-width: 768px) {
    .card-title {
      text-align: center;
    }
  }

  .summary-box {
    box-shadow: none;
    border: solid $primary 2px;
  }

  ::v-deep thead {
    background-color: #f8e7e8;
  }

  ::v-deep .table-in-content {
    border: solid 2px $primary;
    border-collapse: separate;
  }
</style>

<script>
  import {threatCategories} from '~/assets/js/siteConfig.js'
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'
  import SideBar from '~/components/SideBar.vue'

  export default {
    metaInfo: {
      title: 'Caso'
    },
    data() {
      return {
        threatCategories: threatCategories,
        categoryIcon: null,
        showMore: false
      }
    },
    mounted () {
    },
    beforeRouteUpdate (to, from, next) {
      this.showMore = false
      next()
    },
    components: {
      TextWithRefsAndPhotos,
      SideBar
    },
    computed: {
      sortedReferences: function() {
        return this.$page.caseCard.case.references.sort((a, b) => a.reference.localeCompare(b.reference))
      }
    },
    methods: {
      xtractedIcon: function(item) {
        let iconKey = item
        item.replace(/\{.*?\}/, function (match) {
          iconKey = match.replace(/[{\{\}}]/g, '')
        })
        return threatCategories[iconKey]
      },
      iconText: function(item) {
        return threatCategories[item] ? '' : item.replace(/\{.*?\}/, '')
      }
    }
  }

</script>
