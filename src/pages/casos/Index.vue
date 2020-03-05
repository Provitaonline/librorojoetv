<template>
  <Layout>
    <div class="page-wrapper red-line">

      <PageBanner
        :banner="$page.casesIndex.banner"
        :caption="$page.casesIndex.bannerCaption"
        :lead="$page.casesIndex.title"
        :title="$page.casesIndex.mapTitle"
        />
      </PageBanner>

      <section class="section is-center-narrow">
        <InteractiveMap
          :legendItems="$page.casesIndex.legendItems"
          :geoJsonResources="geoJsonResources"
          :mapTitle="$page.casesIndex.mapTitle"
          :initialLayerTransparency="40"
          :initialTileProvider="1"
        >
        </InteractiveMap>
      </section>

    </div>
  </Layout>
</template>

<page-query>
  query Home {
    casesIndex: casesIndex (path: "/content/explore/cases-index") {
      title
      mapTitle
      banner
      bannerCaption
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


</style>

<script>
  import slugify from 'slugify';
  import InteractiveMap from '~/components/InteractiveMap.vue'
  import PageBanner from '~/components/PageBanner.vue'
  import {threatCategories} from '~/assets/js/siteConfig.js'

  slugify.extend({'/': '-'})

  export default {
    metaInfo: {
      title: 'Casos'
    },
    threatCategories: threatCategories,
    data() {
      let self = this
      return {
        geoJsonResources: [
          {
            url: '/mapdata/Cases.topojson',
            legendTitleProperty: 'case',
            isLegendLookUp: true,
            isTopoJson: true,
            topoJsonObject: 'cases',
            showOutline: true
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
          }
        ]
      }
    },
    components: {
      PageBanner,
      InteractiveMap
    },
    created() {

    },
    mounted () {

    },
    updated() {

    },
    computed: {
      pageTitle() {
        return this.$page.casesIndex.title
      },
      pageImage() {
        return this.$page.casesIndex.banner.src
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
