<template>
  <div>
    <ClientOnly>
      <section v-if="($browserDetect && $browserDetect.isIE)" class="red-line">
        <b-message :title="$page.labels.global.IENotSupportedTitle" type="is-warning" aria-close-label="Close message">
          {{$page.labels.global.IENotSupportedMessage}}
        </b-message>
      </section>
    </ClientOnly>

    <b-navbar :close-on-click="false" class="is-fixed-top" style="z-index: 1100;" :shadow="true">
      <template slot="brand">
        <b-navbar-item tag="a" href="/">
          <Logo />
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item class="custom-navbar-item" @click.native="searchClick">
          <font-awesome :icon="['fas', 'search']" />
          <div class="dropdown" v-bind:class="{ 'is-active': searchIsActive }">
            <div class="dropdown-menu search-box" role="menu">
              <div class="dropdown-content">
                <div class="control has-icons-left" v-bind:class="{ 'has-padding': searchResults.length }">
                  <input
                    class="input"
                    ref="search"
                    type="text"
                    v-model="searchTerm"
                    placeholder="Buscar...">
                  <span class="icon is-small is-left">
                    <font-awesome :icon="['fas', 'search']" />
                  </span>
                </div>
                <div @click="searchIsActive = false" v-for="item in searchResults" :key="item.key">
                  <g-link class="dropdown-item" style="white-space: normal;" :to="item.path">
                    <span>{{item.title}}</span>
                  </g-link>
                  <hr class="dropdown-divider">
                </div>
              </div>
            </div>
          </div>
        </b-navbar-item>
        <b-navbar-item tag="g-link" to="/acerca-de">
          ACERCA DE
        </b-navbar-item>
        <b-navbar-dropdown label="VEGETACIÓN">
          <b-navbar-item tag="g-link" to="/vegetacion/cartografia">
              Cartografía histórica
          </b-navbar-item>
          <b-navbar-item tag="g-link" to="/vegetacion/formaciones">
              Formaciones vegetales
          </b-navbar-item>
          <b-navbar-item tag="g-link" to="/unidades">
              Unidades de paisaje
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-dropdown label="MÉTODOS">
          <b-navbar-item tag="g-link" to="/metodos/librosrojos">
              Libros rojos
          </b-navbar-item>
          <b-navbar-item tag="g-link" to="/metodos/clasificacion">
              Clasificación del riesgo
          </b-navbar-item>
          <b-navbar-item tag="g-link" to="/metodos/evaluacion">
              Evaluación del riesgo
          </b-navbar-item>
          <b-navbar-item tag="g-link" to="/metodos/prioridades">
              Prioridades de conservación
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-dropdown label="RIESGO DE COLAPSO">
          <b-navbar-item tag="g-link" to="/fichas">
              Nacional (formaciones vegetales)
          </b-navbar-item>
          <b-navbar-item tag="g-link" to="/casos">
              Local (estudios de caso)
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item tag="g-link" to="/contacto">
          CONTACTO
        </b-navbar-item>
        <b-navbar-dropdown arrowless right ref="share">
          <template slot="label">
            <font-awesome :icon="['fas', 'share-alt']" />
          </template>
          <social-sharing
            :url="getCurrentUrl()"
            :title="$parent.pageTitle"
            :twitter-user="$static.metadata.twitterId"
            @open="openShare()"
            network-tag="a" inline-template>
            <div>
                <network class="navbar-item" network="facebook">
                  <font-awesome :icon="['fab', 'facebook']"/>&nbsp;Facebook
                </network>
                <network class="navbar-item" network="twitter">
                  <font-awesome :icon="['fab', 'twitter']"/>&nbsp;Twitter
                </network>
            </div>
          </social-sharing>
        </b-navbar-dropdown>
      </template>
    </b-navbar>

    <transition name="fade" appear>
      <main>
        <ClientOnly>
          <back-to-top bottom="25px" right="30px">
            <button class="button">
              <font-awesome :icon="['fas', 'angle-up']"/>
            </button>
          </back-to-top>
        </ClientOnly>
        <slot />
      </main>
    </transition>

    <section class="red-line">
      <footer class="footer">
        <div class="has-text-centered">
          <div>
            <div class="social">
              &nbsp;
              <g-link to="https://www.instagram.com/provita_ong/"><font-awesome size="lg" :icon="['fab', 'instagram']"/></g-link>&nbsp;&nbsp;
              <g-link to="https://www.facebook.com/ProvitaONG/"><font-awesome size="lg" :icon="['fab', 'facebook-f']"/></g-link>&nbsp;&nbsp;
              <g-link to="https://twitter.com/provita_ong"><font-awesome size="lg" :icon="['fab', 'twitter']"/></g-link>
              &nbsp;
            </div>
            <span> Derechos reservados, copyright © 2019 </span>
            <g-link :href="$static.homeData.contact.web" target="_blank">Provita</g-link>
            <span>, licencia </span>
            <g-link href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</g-link>
            <span>. | Versión {{version}}</span>
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>

<static-query>
  query {
    metadata {
      siteUrl
      twitterId
      keywords
    }
    homeData (id: "home") {
      contact {
        web
      }
    }
    labels (id: "labels") {
      global {
        IENotSupportedTitle
        IENotSupportedMessage
      }
    }
  }
</static-query>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  .footer {
    border-top: 2px solid #4a4a4a;
    padding: 2rem 1.5rem 2rem;
  }

  .search-box {
    transform: translateY(30px);
  }

  .has-padding {
    padding-bottom: 8px;
  }

  .search-box>.dropdown-content {
    margin-left:-18px;
    min-width: 500px;
    padding: 10px;
  }

  @media only screen and (max-width: 1023px) {
    .search-box>.dropdown-content {
      min-width: calc(100vw - 24px;);
    }
    .search-box {
      transform: translateY(24px);
    }
  }

  @media only screen and (min-width: 1024px) {
    .social {
      display: inline-block;
    }
  }

  /* This is a workaround for the MS Edge issue of not opening dropdowns */
  @media only screen and (min-width: 1024px) {
    ::v-deep .navbar-item.has-dropdown.is-active>.navbar-dropdown {
      display: block;
    }
  }

</style>

<script>

  import {version} from '../../package.json'
  import BackToTop from 'vue-backtotop'
  import SocialSharing from 'vue-social-sharing'
  import Logo from '~/components/Logo.vue'

  export default {
    metaInfo() {
      return {
        meta: [
          {
            property: 'og:title',
            content: this.$parent.pageTitle
          },
          {
            property: 'keywords',
            content: this.$static.metadata.keywords
          },
          {
            property: 'og:image',
            content: this.getPageImage
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image',
          },
          {
            name: 'twitter:site',
            content: this.$static.metadata.twitterId
          },
          {
            name: 'twitter:creator',
            content: this.$static.metadata.twitterId
          },
          {
            name: 'twitter:title',
            content: this.$parent.pageTitle
          },
          {
            name: 'twitter:image',
            content: this.getPageImage
          }
        ]
      }
    },
    data() {
      return {
        version: version,
        searchTerm: '',
        searchIsActive: false
      }
    },
    components: {
      BackToTop,
      SocialSharing,
      Logo
    },
    mounted() {
      document.addEventListener('click', this.clickHandler)
      document.addEventListener('keyup', this.keyHandler)
    },
    beforeDestroy() {
      document.removeEventListener('click', this.clickHandler)
      document.removeEventListener('keyup', this.keyHandler)
    },
    methods: {
      getCurrentUrl: function() {
        return (process.isClient) ? window.location.href : ''
      },
      searchClick: function(e) {
        if (e.target.classList.contains('custom-navbar-item') || !e.target.closest('.dropdown')) {
          this.searchIsActive = !this.searchIsActive
        }
        this.$nextTick(() => {
          this.$refs.search.focus()
        })
      },
      keyHandler: function(e) {
        if (e.keyCode === 27) {
          this.searchIsActive = false
          this.$refs.share.closeMenu()
        }
      },
      clickHandler: function(e) {
        if (!e.target.closest('.custom-navbar-item')) {
          this.searchIsActive = false
        }
      },
      openShare() {
        this.$refs.share.closeMenu()
      }
    },
    computed: {
      getPageImage() {
        return this.$parent.pageImage ? this.$static.metadata.siteUrl + this.$parent.pageImage : ''
      },
      searchResults () {
        const searchTerm = this.searchTerm
        if (searchTerm.length < 3) return []
        return this.$search.search({ query: searchTerm, limit: 10 }).map(a => {
          let o = {}
          o.key = a.key
          o.title = a.title.replace(/<[^>]*>?/gm, ' ')
          o.path = a.path
          return o
        })
      }
    }
  }
</script>
