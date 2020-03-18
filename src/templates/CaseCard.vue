<template>
  <Layout>
    <SideBar>
      <template v-slot:title>
        Estudios de caso
      </template>
      <template v-slot:sidebar>
        <div class="box">
          <CollapsibleList :list="collapsibleList" />
        </div>
      </template>
      <template v-slot:content>
        <div class="red-line">
          <PageBanner
            :banner="$page.caseCard.cardimage"
            bannerHeight="500px"
            :caption="$page.caseCard.cardimagecaption"
            lead="Estudios de caso"
            link="/casos"
            :title="$page.caseCard.title"
            :authors="$page.caseCard.authors"
            :citationPre="$page.caseCard.citationPre"
            :citationPost="$page.caseCard.citationPost"
            heroPaddingBottom="72px"
            />
          </PageBanner>

          <div class="section is-size-6 is-size-7-mobile" style="margin-bottom: -96px;">
            <div class="is-center-narrow summary-box-container">
              <div class="card summary-box">
                <header>
                  <p class="card-header-title has-text-centered is-inline-block">
                    <b>Paisaje vegetal:</b>&nbsp;<span v-html="$page.caseCard.landscapeunits"></span>
                  </p>
                </header>
                <div class="card-content">
                  <div class="content has-text-centered">
                    <div class="columns" style="margin-left: 0; margin-right: 0;">
                      <div class="column card-info-column">
                        <div class="card-info-title">
                          <b>Localidad:</b>
                        </div>
                        <div class="card-info-content" v-html="$page.caseCard.locality"></div>
                      </div>
                      <div class="column card-info-column">
                        <div class="card-info-title">
                          <b>Estados:</b>
                        </div>
                        <div class="card-info-content">{{$page.caseCard.states}}</div>
                      </div>
                      <div class="column card-info-column">
                        <div class="card-info-title">
                          <b>Área aprox.:</b>
                        </div>
                        <div class="card-info-content" v-if="$page.caseCard.areatext" v-html="$page.caseCard.areatext"><br></div>
                        <div class="card-info-content" v-else>{{$page.caseCard.area | number}} km<sup>2</sup><br></div>
                      </div>
                    </div>
                  </div>
                  <div :class='$page.caseCard.enableTableScroll ? "table-container" : ""' class="summary-box-table">
                    <table class="table is-size-6 is-size-7-mobile">
                      <thead>
                        <tr>
                          <th v-for="value in $page.caseCard.cardtablecolumns" v-bind:class="{'has-text-centered' : value === 'Categoría'}" style="border: none;">{{value}}</th>
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
          <section class="section is-center-narrow">
            <div class="tile is-vertical is-parent">
              <TextWithRefsAndPhotos style="padding-bottom: 0px; margin-bottom: 0px !important;" class="tile is-child box is-size-5 is-size-6-mobile"
                :text="$page.caseCard.content"
                :refs="$page.caseCard.case.references"
                :photos="$page.caseCard.photos"
                :isContent="true">
              </TextWithRefsAndPhotos>
              <References class="box" :references="$page.caseCard.case.references">
              </References>
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
      citationPre
      citationPost
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
        isCentered
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
    font-weight: normal;
    width: 100%;
    background-color: $table-header-background-color;
  }

  .card-info-title {
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: $table-subheader-background-color;
  }

  .card-info-column {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
  }

  .card-info-content {
    padding: 12px;
  }

  .card-content {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }

  @media only screen and (min-width: 769px) {
    .summary-box {
      margin-top: -96px;
      /* max-width: 450px; */
    }
    .summary-box-container {
      padding-left: 56px;
      padding-right: 56px;
    }
    .summary-box-table {
      padding-left: 40px;
      padding-right: 40px;
    }
  }

  .summary-box {
    box-shadow: 0 3px 10px 4px rgba(0, 0, 0, 0.12) !important;
    border: none !important;
  }

  ::v-deep .table-container {
    -ms-overflow-style: none;  /* Edge  */
    scrollbar-width: none;  /* Firefox */
  }

  ::v-deep .table-container::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }

</style>

<script>
  import {threatCategories} from '~/assets/js/siteConfig.js'
  import PageBanner from '~/components/PageBanner.vue'
  import CollapsibleList from '~/components/CollapsibleList.vue'
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'
  import SideBar from '~/components/SideBar.vue'
  import References from '~/components/References.vue'

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
      PageBanner,
      CollapsibleList,
      TextWithRefsAndPhotos,
      SideBar,
      References
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
    },
    computed: {
      collapsibleList: function() {
        let cl = []
        this.$page.casesIndex.legendItems.forEach((item) => {
          cl.push({
            parentLabel: item.label,
            parentLink: '/casos/c' + item.name
          })
        })
        return cl
      },
      pageTitle() {
        return this.$page.caseCard.title
      },
      pageImage() {
        return this.$page.caseCard.cardimage.src
      }
    }
  }

</script>
