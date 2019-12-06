<template>
  <Layout>
    <SideBar>
      <template v-slot:title>
        <p class="is-size-4 has-text-weight-bold has-text-centered" style="padding: 20px;">Regiones</p>
      </template>
      <template v-slot:sidebar>
        <div class="box">
          <div v-for="item, index in $page.unitCardsIndex.legendItems">
            <div v-if="item.isHeading">
              <div class="side-panel-item-box side-panel-item">
                <!-- <g-link v-if="getTargetSlug(item) != currentSlug" :to="pathParent + '/' + getTargetSlug(item)">{{item.name}}</g-link> -->
                <g-link v-if="item.cardPath != $route.path.replace(/\/$/, '').match(/\/[^\/]+$/)[0].substring(1)" :to="'/units/' + item.cardPath">{{item.label}}</g-link>
                <span v-else><b><i>{{item.label}}</i></b></span>
                <br><br>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:content>
        <section class="hero is-small is-white">
          <div class="hero-body">
            <div class="container is-fullhd has-text-centered">
              <g-link to="/units" class="is-uppercase is-size-6">Unidades de paisaje</g-link>
              <p class="title is-uppercase is-size-4-mobile">{{$page.unitCard.title}}</p>
            </div>
          </div>
        </section>
        <div class="has-text-centered">
          <g-image v-if="$page.unitCard.cardimage" :src="$page.unitCard.cardimage" fit="inside" />
        </div>
        <figcaption class="has-text-centered"><div class="is-size-6 is-size-7-mobile" v-html="$page.unitCard.cardimagecaption"></div></figcaption>
        <section class="section">
          <div class="tile is-ancestor">
            <div class="tile is-vertical is-parent">
              <div class="tile is-parent">
                <!-- <div class="d-content tile is-child is-size-5" v-html="$page.vegetationCard.content"></div> -->
                <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
                  :text="$page.unitCard.content"
                  :refs="$page.references.references"
                  :photos="$page.unitCard.photos"
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
  query UnitCard ($path: String!) {
    unitCard: unitCard (path: $path) {
      title
      cardimage
      cardimagecaption
      photos {
        photokey
        photourl
        photocaption
      }
      content
    }
    references: references (id: "units") {
      references {
        referencekey
        reference
      }
    }
    unitCardsIndex: unitCardsIndex (path: "/content/units-index") {
      title
      mapTitle
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
</style>

<script>
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'
  import SideBar from '~/components/SideBar.vue'

  export default {

    mounted () {
    },
    components: {
      TextWithRefsAndPhotos,
      SideBar
    }
  }

</script>
