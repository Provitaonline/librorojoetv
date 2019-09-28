<template>
  <div>
    <nav
      class="navbar header"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <g-link class="navbar-item" to="/"><img src="/images/librorojo.png" alt="logo" /></g-link>
        <div class="navbar-burger" :class="{ 'is-active': showNav }" @click="showNav = !showNav">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': showNav }">
        <div class="navbar-end">
          <g-link class="navbar-item" to="/about">ACERCA DE</g-link>

          <a class="navbar-item">
            MÉTODOS
          </a>

          <a class="navbar-item">
            MAS INFORMACIÓN
          </a>

          <g-link class="navbar-item" to="/contact">CONTACTO</g-link>
        </div>
      </div>
    </nav>
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
  .navbar {
    border-bottom: 6px solid #BE1421;
  }

  a.navbar-item {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }

  .navbar-item img {
    max-height: 3rem;
  }

  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-enter {
    opacity: 0;
  }

</style>

<script>
export default {
  data () {
    return {
      showNav: false
    }
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
