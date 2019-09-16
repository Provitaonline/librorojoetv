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
              <div class="tile is-child is-5 box">
                <b>Superficie en 1988 (km<sup>2</sup>): </b>{{$page.vegetationCard.areain1988 | number}}<br>
                <b>Superficie en 2010 (km<sup>2</sup>): </b>{{$page.vegetationCard.areain2010 | number}}<br><br>
                <figure class="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/640x480.png">
                </figure>
                <br>
                <figure class="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/640x480.png">
                </figure>
              </div>
              <div class="tile is-child is-7 box">
                <table align="center" class="statetable table is-narrow is-size-6 is-size-7-mobile">
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
                      <td class="has-text-right">{{ ((item.areain1988 - item.areain2010) < 0) ? '↑' : '↓' }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Total</th>
                      <th class="has-text-right">PRONTO</th>
                      <th class="has-text-right">PRONTO</th>
                      <th class="has-text-right">PRONTO</th>
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
    }
  }
</page-query>

<style lang="scss" scoped>

  @media only screen and (max-width: 400px) {
    .statetable {
      font-family: "Helvetica Narrow","Arial Narrow",Tahoma,Arial,Helvetica,sans-serif;
    }
  }

</style>

<script>
  export default {
    filters: {
      number: function(value) {
        if (!value) return ''
        console.log(value, parseInt(value).toLocaleString('de', {style: 'decimal'}))
        return parseInt(value).toLocaleString('de', {style: 'decimal'})
      }
    }

  }
</script>
