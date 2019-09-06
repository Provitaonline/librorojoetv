<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-medium is-black">
        <img class="hero-bg-img" src="/uploads/home-hero-image.png" srcset=""></img>
        <div class="hero-body">
          <div class="container is-fullhd">
            <h1 class="title has-text-white" v-html="$page.siteConfig.heroTitle" />
            <h2 class="subtitle has-text-white"v-html="$page.siteConfig.heroSubTitle" />
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<page-query>
  query SiteConfig {
    siteConfig: siteLevelData (path: "/content/site-config") {
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
</style>

<script>

</script>
