<template>
  <Layout>
    <div class="page-wrapper red-line">

      <PageBanner
        :banner="$page.riskCardsIndex.banner"
        :caption="$page.riskCardsIndex.bannerCaption"
        :lead="$page.riskCardsIndex.title"
        :title="$page.riskCardsIndex.mapTitle"
        />
      </PageBanner>

      <section class="section is-center-narrow">
        <InteractiveMap
          :legendItems="$page.riskCardsIndex.legendItems"
          :geoJsonResources="geoJsonResources"
          :mapTitle="$page.riskCardsIndex.mapTitle"
        >
      </InteractiveMap>
      </section>

      <section class="section is-center-narrow">
        <!-- <div class="section-header box is-size-3 is-size-4-mobile has-text-weight-bold">Lista alfabética de fichas</div> -->
        <div class="box">
          <h1>Lista alfabética de fichas</h1>
        </div>

        <div class="tile box is-ancestor is-size-6 is-size-7-mobile">
          <div class="tile is-parent" style="flex-wrap: wrap;">
            <div v-for="item in $page.vcards.edges" class="tile is-child is-6">
              <div class="vcard-frame">
                <div class="media">
                  <figure class="media-left is-hidden-mobile">
                    <g-link :to="'/fichas/' + makeLink(item.node.title)"><g-image :src="item.node.cardimage"></g-image></g-link>
                  </figure>
                  <div>
                    <div style="display: flex;">
                      <b-tooltip :label="$options.threatCategories[item.node.category].text" position="is-top" type="is-warning">
                        <div class="iconInTable">
                          <img :src="$options.threatCategories[item.node.category].img"></img>
                        </div>
                      </b-tooltip>
                      &nbsp;&nbsp;<g-link :to="'/fichas/' + makeLink(item.node.title)"><strong v-html="item.node.title"></strong></g-link>
                    </div>
                    <div is-size-7 style="margin-left: 38px;" v-if="item.node.areain2010">
                      {{item.node.areain1988 | number}} km<sup>2</sup> en 1988<br>
                      <hr class="skinny">
                      {{item.node.areain2010 | number}} km<sup>2</sup> en 2010<br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <References class="box" :references="$page.references.references">
        </References>

      </section>

    </div>
  </Layout>
</template>

<page-query>
  query Home {
    homeData: homeData (path: "/content/home") {
      title
      heroTitle
    }
    riskCardsIndex: riskCardsIndex (path: "/content/explore/vcards-index") {
      title
      mapTitle
      banner
      bannerCaption
    	legendItems {
        name
        group
        color
        legend
        cardPath
      }
    }
    vcards: allRiskCard (sortBy: "title", order: ASC) {
      edges {
        node {
          title
          formattedtitle
          category
          description
          cardimage (width: 100, height: 100, quality: 90)
          areain1988
          areain2010
        }
      }
    }

    references: references (id: "fichas") {
      references {
        referencekey
        reference
      }
    }
  }
</page-query>

<style lang="scss" scoped>

  .iconInTable {
    width: 30px;
    height: 30px;
  }

  .vcard-frame {
    height: calc(100% - 20px);
    margin: 10px;
    padding: 10px;
    border: 1px solid lightgray;
  }

  .skinny {
    margin-top: 0px;
    margin-bottom: 0px;
  }

</style>

<script>
  import slugify from 'slugify';
  import InteractiveMap from '~/components/InteractiveMap.vue'
  import PageBanner from '~/components/PageBanner.vue'
  import References from '~/components/References.vue'
  import {threatCategories} from '~/assets/js/siteConfig.js'

  slugify.extend({'/': '-'})

  export default {
    metaInfo: {
      title: 'Fichas'
    },
    threatCategories: threatCategories,
    data() {
      let self = this
      return {
        geoJsonResources: [
          {
            url: '/mapdata/FormacionesVegetales.topojson',
            legendTitleProperty: 'T_VE',
            isTopoJson: true,
            topoJsonObject: 'FormacionesVegetales'
          },
          {
            url: '/mapdata/VenezuelaAgua.topojson',
            isTopoJson: true,
            topoJsonObject: 'collection',
            geoJsonLayerOptions: {
              style: {
                weight: 0,
                opacity: 0,
                fillOpacity: 1,
                fillColor: '#BDE6E0',
                interactive: false
              }
            }
          },
          {
            url: '/mapdata/VenezuelaNoStates.topojson',
            isTopoJson: true,
            topoJsonObject: 'collection',
            geoJsonLayerOptions: {
              style: {
                weight: 1,
                color: '#504f54',
                dashArray: '2,3',
                opacity: 1,
                fillOpacity: 0,
                interactive: false
              }
            }
          },
          {
            url: '/mapdata/Saxicola.json',
            legendTitleProperty: 'name',
            makePointsToCircles: true,
          }
        ]
      }
    },
    components: {
      PageBanner,
      InteractiveMap,
      References
    },
    created() {

    },
    mounted () {

    },
    updated() {

    },
    computed: {
      pageTitle() {
        return this.$page.riskCardsIndex.title.replace(/<[^>]*>?/gm, ' ')
      },
      pageImage() {
        return this.$page.riskCardsIndex.banner.src
      }
    },
    methods: {
      makeLink(t) {
        return slugify(t, {lower: true})
      }
    },
    watch: {
    }
  }
</script>
