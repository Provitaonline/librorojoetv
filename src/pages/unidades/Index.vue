<template>
  <Layout>
    <div class="page-wrapper red-line">

      <PageBanner
        :banner="$page.unitCardsIndex.banner"
        :caption="$page.unitCardsIndex.bannerCaption"
        :lead="$page.unitCardsIndex.title"
        :title="$page.unitCardsIndex.mapTitle"
        />
      </PageBanner>

      <section class="section is-center-narrow">
        <InteractiveMap
          :legendItems="$page.unitCardsIndex.legendItems"
          :geoJsonResources="geoJsonResources"
          :mapTitle="$page.unitCardsIndex.mapTitle"
        >
      </InteractiveMap>
      </section>

      <section class="section">
        <br>
        <div class="container is-size-4 has-text-centered">
          <hr>
          <g-link to="/bibliografia/unidades"><p>Bibliografía <small><font-awesome size="xs" :icon="['fas', 'link']"/></small></p></g-link>
        </div>

      </section>

    </div>
  </Layout>
</template>

<page-query>
  query Home {
    unitCardsIndex: unitCardsIndex (path: "/content/explore/units-index") {
      title
      mapTitle
      banner
      bannerCaption
    	legendItems {
        name
        isHeading
        isIndented
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
      title: 'Unidades'
    },
    threatCategories: threatCategories,
    data() {
      let self = this
      return {
        geoJsonResources: [
          {
            url: '/mapdata/UnidadesDePaisaje.topojson',
            legendTitleProperty: 'Sector_Leg',
            isLegendLookUp: true,
            isTopoJson: true,
            topoJsonObject: 'Unidades_de_paisaje_2010'
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
