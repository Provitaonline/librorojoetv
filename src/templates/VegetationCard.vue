<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd has-text-centered">
            <h1 class="title is-uppercase">{{$page.vegetationCard.title}}</h1>
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
              <div class="tile is-child is-5 box">
                <p v-html="$page.vegetationCard.distribution" />
              </div>
              <div class="tile is-child is-7 box">
                <figure class="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/640x480.png">
                </figure>
              </div>
            </div>
            <div class="is-size-4 is-uppercase has-text-weight-semibold has-text-centered">Cambios en la distribución</div>
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
      description
      cardimage
      cardimagecaption
      distribution
    }
  }
</page-query>

<script>
  export default {

  }
</script>
