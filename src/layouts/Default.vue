<template>
  <div>
    <b-navbar>

      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="/images/librorojo.png" alt="logo" />
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item>
          <g-link to="/about">ACERCA DE</g-link>
        </b-navbar-item>
        <b-navbar-item>
          MÉTODOS
        </b-navbar-item>
        <b-navbar-dropdown label="MAS INFORMACIÓN">
            <b-navbar-item>
                Unidades de paisaje
            </b-navbar-item>
            <b-navbar-item>
                Casos de estudio
            </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item>
          <g-link to="/contact">CONTACTO</g-link>
        </b-navbar-item>
        <b-navbar-dropdown label="COMPARTIR">
            <b-navbar-item>
                Facebook
            </b-navbar-item>
            <b-navbar-item>
                Twitter
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
  export default {
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
