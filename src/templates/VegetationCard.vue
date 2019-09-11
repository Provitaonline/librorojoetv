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
      <section class="section">
        <h1>{{$page.vegetationCard.description}}</h1>
      </section>
    </div>
  </Layout>
</template>

<page-query>
  query VegetationCard ($path: String!) {
    vegetationCard: vegetationCard (path: $path) {
      title
      description
    }
  }
</page-query>

<script>
  export default {

  }
</script>
