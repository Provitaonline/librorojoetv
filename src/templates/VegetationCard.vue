<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd has-text-centered">
            <h1 class="title is-uppercase">{{$page.vegetationCard.title}}
                <img :src="$page.vegetationCard.categoryicon" height="40" width="40" align="right">
            </h1>
            <h2 class="subtitle is-uppercase" v-if="$page.vegetationCard.plantformation">
              ({{$page.vegetationCard.plantformation}})
            </h2>
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
                <div v-for="item in $page.vegetationCard.mapcompare">
                  <br>
                  <VueCompareImage style="border-style: solid; border-color: black;" :leftImage="item.in2010" :rightImage="item.in1988" />
                </div>
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
                <figure class="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/640x480.png">
                </figure>
              </div>
              <div class="tile is-child is-6 box">
                <figure class="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/640x480.png">
                </figure>
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
      categoryicon
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
    }
  }
</page-query>

<style lang="scss" scoped>

  @media only screen and (max-width: 1024px) {
    .statetable {
      font-family: "Helvetica Narrow","Arial Narrow",Tahoma,Arial,Helvetica,sans-serif;
    }
  }
</style>

<div data-v-c6a22f46="" class="right-arrow" style="border-width: 6px; border-style: inset inset inset solid; border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) white; border-image: initial; margin-right: -10px;"></div>

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

  import VueCompareImage from 'vue-compare-image';

  export default {
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
        VueCompareImage
    },
    methods: {
      redOrGreen: function(value) {
        if (!value) return ''
        return (value < 0) ? 'green' : 'red'
      }
    }
  }
</script>
