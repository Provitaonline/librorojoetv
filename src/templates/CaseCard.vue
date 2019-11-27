<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd has-text-centered">
            <g-link to="/cases" class="is-uppercase is-size-6">Casos de estudio</g-link>
          </div>
        </div>
      </section>
      <div>
        <g-image v-if="$page.caseCard.cardimage" :src="$page.caseCard.cardimage" fit="inside" />
      </div>
      <figcaption style="padding-left: 12px;"><div class="is-size-6 is-size-7-mobile" v-html="$page.caseCard.cardimagecaption"></div></figcaption>
      <div class="columns" style="margin-bottom: -48px;">
        <div class="column section">
          <p class="title is-uppercase is-size-4-mobile">{{$page.caseCard.title}}</p>
          <p>Carlos Portillo-Quintero, Pablo Lacabana, Fabián Carrasquel</p>
        </div>
        <div class="column is-two-fifths">
          <div class="card summary-box">
            <header class="card-header">
              <p class="card-header-title">
                WHATEVER
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="section">
        <div class="tile is-vertical is-parent">
          <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
            :text="$page.caseCard.content"
            :isContent="true" />
          </TextWithRefsAndPhotos>
        </div>
      </section>
    </div>
  </Layout>
</template>

<page-query>
  query CaseCard ($path: String!) {
    caseCard: caseCard (path: $path) {
      title
      content
      cardimage
      cardimagecaption
    }
  }
</page-query>

<style lang="scss" scoped>
  .card-header-title {
    background-color: #f8e7e8;
  }

  @media only screen and (min-width: 769px) {
    .summary-box {
      margin-top: -10rem;
    }
  }
</style>

<script>
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'

  export default {

    mounted () {
    },
    components: {
      TextWithRefsAndPhotos
    }
  }

</script>
