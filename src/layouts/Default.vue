<template>
  <div>
    <b-navbar :close-on-click="false">

      <template slot="brand">
        <b-navbar-item tag="a" href="/">
          <g-image width="140" src="~/assets/images/librorojo.png" />
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="a" href="/about">
          ACERCA DE
        </b-navbar-item>
        <b-navbar-item>
          MÉTODOS
        </b-navbar-item>
        <b-navbar-dropdown :arrowless="true" label="MAS INFORMACIÓN">
            <b-navbar-item>
                Unidades de paisaje
            </b-navbar-item>
            <b-navbar-item>
                Casos de estudio
            </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item tag="a" href="/contact">
          CONTACTO
        </b-navbar-item>
        <b-navbar-dropdown :arrowless="true" label="COMPARTIR">
            <b-navbar-item>
              <font-awesome :icon="['fab', 'facebook']"/>&nbsp;Facebook
            </b-navbar-item>
            <b-navbar-item>
              <font-awesome :icon="['fab', 'twitter']"/>&nbsp;Twitter
            </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
    <transition v-if="isNotHomePage()" name="fade" appear>
      <main>
        <slot />
      </main>
    </transition>
    <main v-else>
      <slot />
    </main>

    <section>
      <footer class="footer">
        <div class="content has-text-centered">
          <g-link to="https://www.facebook.com/ProvitaONG/"><g-image src="~/assets/svgs/facebook.svg" /></g-link>&nbsp;
          <g-link to="https://www.instagram.com/provita_ong/"><g-image src="~/assets/svgs/instagram.svg" /></g-link>&nbsp;
          <g-link to="https://twitter.com/provita_ong"><g-image src="~/assets/svgs/twitter.svg" /></g-link>
          <p>Este sitio es un prototipo en desarrollo</p>
          <p>
            Derechos reservados, copyright © 2019 Provita, licencia <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>.
          </p>
        </div>
      </footer>
    </section>
  </div>
</template>

<style lang="scss" scoped>

  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-enter {
    opacity: 0;
  }

</style>

<script>

  // import FacebookLogo from '~/assets/svgs/facebook.svg'
  // import InstagramLogo from '~/assets/svgs/instagram.svg'
  // import TwitterLogo from '~/assets/svgs/twitter.svg'

  export default {
    components: {
      // FacebookLogo,
      // InstagramLogo,
      // TwitterLogo
    },
    mounted () {

    },
    methods: {
      isNotHomePage() {
        if (this.$page && this.$page.homeData) {
          return false
        } else {
          return true
        }
      }
    }
  }
</script>
