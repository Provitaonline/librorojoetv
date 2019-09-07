<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-medium is-black">
        <img class="hero-bg-img" src="/uploads/home-hero-image.png" srcset=""></img>
        <div class="hero-body">
          <div class="container is-fullhd">
            <h1 class="title has-text-white" v-html="$page.homeData.heroTitle" />
            <h2 class="subtitle has-text-white"v-html="$page.homeData.heroSubTitle" />
          </div>
          <a class="button explore is-primary is-inverted is-outlined"><font-awesome size="lg" :icon="['fas', 'angle-double-down']"/></a>
        </div>
      </section>
    </div>
  </Layout>
</template>

<page-query>
  query Home {
    homeData: homeData (path: "/content/home") {
      title
      heroTitle
      heroSubTitle
    	content
    }
  }
</page-query>

<style lang="scss" scoped>

  .hero {
    background-size: cover !important;
    background-position: center;
    text-align: center;
    overflow: hidden;
    position: relative;
  }
  .hero-bg-img {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 0.35;
  }

  .explore {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
  }
</style>

<script>

</script>
